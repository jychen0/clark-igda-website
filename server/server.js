const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const cors=require("cors")
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public")); //might be redundant
app.use(express.static(__dirname + "/client")); //this should allow us to load any files within this subdirectory

mongoose.connect('mongodb://localhost:27017/eventDB', {})
    .then(function (db) {
        console.log("db connected");
    });

//frontend on port 3000
const port = 3001;
app.listen(port, function () {
    console.log(`Server listening on port ${port}`);
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});


//subdocument schema for event speakers {name, info, credentials}
const speakerSchema ={
    speakerName:{ //Speaker full name
        type:String,
        required:[true, 'Speaker Name is required'],
        minLength:[4, 'Speaker Name must be at least 4 characters'],
    },
    speakerInfo:{ //Speaker LinkedIn URL
        type:String,
    },
    speakerPos:{ //Speaker Position
        type:String,
    },
    speakerCred:{ //Speaker Company / Affiliation
        type:String,
    }
}
//subdocument schema for event date {semester, startTime, endTime}
const dateSchema ={
    semester:{ //Semester event ran in
        type:String,
        required:[true, 'Semester is required'],
    },
    start:{ //Start time of event
        type:Date,
        required:[true, 'Start Time is required'],
        min:['2023-01-01T00:00:00', 'Event must be since 2023'],
    },
    end:{ //End time of event
        type:Date,
        required:[true, 'End Time is required'],
        min:['2023-01-01T00:00:00', 'Event must be since 2023'],
    }
}
//subdocument schema for event location, {held, location} 0=virtual, 1=in person
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
    //enforce minimum of 1 array object, used for speaker, involved clubs, and target tracks
    return val.length > 0;
}
function minTimeframe(date) {
    //enforce event endTime being after startTime, currently broken
    return date.start < date.end;
}
const eventSchema={
    eventName:{ //Event Title
        type:String,
        required:[true, 'Event Title is required'],
        minLength:[5, 'Event Title must be at least 5 characters'],
    },
    eventType:{ //talk, workshop, info session, mixer, game jam, asset jam, expo, field trip
        type:String,
        required:[true, 'Event type is required'],
    },
    posterIMG:{ //dir for images: /igda-club-site/src/assets/event_posters/ + posterIMG string
        type:String,
    },
    speakers: { //array of outside industry speakers
        type: [{
            type: speakerSchema,
        }],
        //validate: [minLength, 'Must have at least one speaker']
    },
    targetTracks: { //lists all tracks the event caters towards (Production, Programming, 3D Art, 2D Art, Audio, Writing, Design)
        type: [{
            type:String,
        }],
    },
    date: { //date object
        type: dateSchema,
        //validate: [minTimeframe, 'End time must be after start time']
    },
    location: { //location object
        type: locationSchema
    },
    involvedClubs: { //IGDA is assumed, only lists additional clubs
        type: [{
            type:String,
        }],
        //validate: [minLength, 'Must have at least one involved Club']
    },
    overview:{
        type:String,
    },
    capacity:{ //if applicable, must be an int
        type:Number,
        validate: {
            validator: function (value) {
                return Number.isInteger(value);
            },
            message: "Capacity must be an integer"
        },
    },
    attendance:{ //recorded # of attendees
        type:Number,
        validate: {
            validator: function (value) {
                return Number.isInteger(value);
            },
            message: "Attendance must be an integer"
        },
    },
}

const jamSchema={
    gameName:{ //Event Title
        type:String,
        required:[true, 'Event Title is required'],
    },
    jamSubmission:{ //talk, workshop, info session, mixer, game jam, asset jam, expo, field trip
        type:String,
        required:[true, 'Event type is required'],
    },
    image:{
        type:String,
    },
    itchLink:{
        type:String,
    },
    developers: {
        type: [{
            type:String,
        }],
    },
    awards: {
        type: [{
            type:String,
        }],
    },
}

const Jam=mongoose.model('Jams',jamSchema);

const Event=mongoose.model('Event',eventSchema);

app.get('/test', function (req, res) {
    res.send('it works now')
});

app.get("/get-all-jams", function (req, res) {
    Jam.find().then(jams => {
        res.send({
            "message": "success",
            "data": jams,
        })
    }).catch(err => {
        res.send({
            "message": err.message,
            "data": []
        })
    })
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