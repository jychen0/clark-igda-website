const fs=require('fs');
const mongoose = require('mongoose');
const csv_parse = require('csv-parse/sync');


// dir for images: /igda-club-site/src/assets/event_posters/
const rawData=fs.readFileSync(__dirname+'/past_events.csv','utf8');
const parsedData = csv_parse.parse(rawData, {
    columns: true,
    skip_empty_lines: true,
});

mongoose.connect('mongodb://localhost:27017/eventDB', {})
    .then(function (db) {
        console.log("db connected");
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
const eventList=[];

parsedData.forEach(event=>{

    eventList.push({
        //mongoose schema: csv entry
        eventName: event.eventName,
        eventType: event.eventType,
        posterIMG: event.posterIMG,
        attendance: event.attendance,
        overview: event.overview,
        //subdocuments:
        date: {
            semester: event.semester,
            start: event.startTime,
            end: event.endTime,
        },
        location: {
            held: event.inPerson,
            location: event.location,
        },
        //array of strings
        targetTracks: processArrays(event.targetTracks),
        involvedClubs: processArrays(event.involvedClubs),
        //array of subdocuments
        speakers: processSpeakers(event.speakerNames, event.speakerInfos, event.speakerCreds,),
        //requires validation if provided
        ...((!!event.capacity) && { capacity: event.capacity }),
    });
});

function processArrays(eventInfo) {
    return eventInfo.split(/[|]/); //use regex to split string at |
}
function processSpeakers(Names, Infos, Creds) {
    let speakerNames =  Names.split(/[|]/); //names is the only required portion
    let speakerInfos =  Infos.split(/[|]/);
    let speakerCreds =  Creds.split(/[|]/);
    const speakerList=[];

    //must have same # of separator chars in each field, but value may be empty
    speakerNames.forEach((speaker, index) => {
        speakerList.push({
            speakerName: speakerNames[index],
            speakerInfo: speakerInfos[index],
            speakerCred: speakerCreds[index],
        })
    })
    return speakerList;
}

Event.insertMany(eventList).then(events=>{
    mongoose.connection.close();
}).catch(err => {
    console.log(err);
});