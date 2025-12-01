const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

mongoose.connect('mongodb://localhost:27017/movieDB', {})
    .then(function (db) {
        console.log("db connected");
    });

app.listen(3001, function () {
    console.log("backend server started at 3001");
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

//eventName,eventType,posterIMG
//speakerNames,speakerInfos,speakerCreds
//targetTracks
//semester,startTime,endTime
//inPerson,location
//involvedClubs,capacity,overview,attendance

//subdocument schema to handle multiple speakers
const speakerSchema ={
    speakerName:{
        type:String,
        required:[true, 'Speaker Name is required'],
        minLength:[4, 'Speaker Name must be at least 4 characters'],
    },
    speakerInfo:{
        type:String,
    },
    speakerCred:{
        type:String,
    }
}

//subdocument schema to handle date info
const dateSchema ={
    semester:{
        type:String,
        required:[true, 'Semester is required'],
    },
    start:{
        type:Date,
        required:[true, 'Start Time is required'],
        min:['2023-01-01T00:00:00', 'Event must be since 2023'],
    },
    end:{
        type:Date,
        required:[true, 'End Time is required'],
        min:['2023-01-01T00:00:00', 'Event must be since 2023'],
    }
}

//subdocument schema to handle location info, 0=virtual, 1=in person
const locationSchema ={
    held:{
        type:Number,
        required:[true, 'in person clarification is required'],
    },
    location:{
        type:String,
        required:[true, 'Location is required'],
    },
}

function minLength(val) {
    return val.length > 0;
}

function minTimeframe(date) {
    return date.start < date.end;
}

const eventSchema={
    eventName:{
        type:String,
        required:[true, 'Event Title is required'],
        minLength:[10, 'Event Title must be at least 10 characters'],
    },
    //possible events: talk, workshop, info session, mixer
    eventType:{
        type:String,
        required:[true, 'Event type is required'],
    },
    posterIMG:{
        type:String,
    },
    //defines this as an array of speakers with minLength of 1
    speakers: {
        type: [{
            type: speakerSchema,
        }],
        validate: [minLength, 'Must have at least one speaker']
    },
    //lists all tracks the event caters towards
    targetTracks: {
        type: [{
            type:String,
        }],
    },
    date: {
        type: dateSchema,
        //validate: [minTimeframe, 'End time must be after start time']
    },
    location: {
        type: locationSchema
    },
    //IGDA is always listed, additional clubs are optional
    involvedClubs: {
        type: [{
            type:String,
        }],
        validate: [minLength, 'Must have at least one involved Club']
    },
    overview:{
        type:String,
    },
    capacity:{
        type:Number,
        validate: {
            validator: function (value) {
                return Number.isInteger(value);
            },
            message: "Capacity must be an integer"
        },
    },
    attendance:{
        type:Number,
        validate: {
            validator: function (value) {
                return Number.isInteger(value);
            },
            message: "Attendance must be an integer"
        },
    },
}

const Event=mongoose.model('Events',eventSchema);

app.get('/get-details', function (req, res) {
    res.sendFile(__dirname + "/public/detail.html");
});

app.get("/get-all-events", function (req, res) {
    Event.find().then(events => {
        res.send({
            "message": "success",
            "data": events,
        })
    }).catch(err => {
        res.send({
            "message": err.message,
            "data": []
        })
    })
});


app.get('/get-events-by-id', function (req, res) {
    Event.find({'_id': req.query.event._id}) //if issues use event_id
        .then(cars => {
            res.send({
                "message": "success",
                "data": events[0],
            })
        }).catch(err => {
        res.send({
            "message": err.message,
            "data": {}
        })
    })
});

app.get("/get-events-by-filters", function (req, res) {
    let searchKey = req.query.search_key;
    let min_year = req.query.min_year;
    let max_year = req.query.max_year;
    let min_price = req.query.min_price;
    let max_price = req.query.max_price;
    let sortBy = req.query.sortBy
    console.log(sortBy)

    //do not sort unless a attribute header was clicked
    if (sortBy === "basic-addon2" || "search_box" || "nullSort") {sortBy = {};}
    if (!min_year) {min_year = 1900;}
    if (!max_year) {max_year = new Date().getFullYear();}
    if (!min_price) {min_price = 0;}
    if (!max_price) {max_price = Number.MAX_VALUE;}

    Event.find({
        $and: [
            {year:{$gte: min_year},},
            {year:{$lte: max_year},},
            {price:{$gte: min_price},},
            {price:{$lte: max_price},},
            {$or: [
                    {make: {$regex: searchKey}},
                    {model: {$regex: searchKey}}
                ]}
        ]
    }).sort(req.query.sortBy)
        .then(events => {
        res.send({
            "message": "success",
            "data": events,
        })
    }).catch(err => {
        res.send({
            "message": err.message,
            "data": []
        })
    })
});