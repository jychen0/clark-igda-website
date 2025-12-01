const fs=require('fs');
const mongoose = require('mongoose');
const csv_parse = require('csv-parse/sync');

const rawEventData=fs.readFileSync(__dirname+'/' + 'events.csv','utf8');
const parsedEventData = csv_parse.parse(rawEventData, {
    columns: true,
    skip_empty_lines: true,
});

mongoose.connect('mongodb://localhost:27017/eventDB', {})
    .then(function (db) {
        console.log("db connected");
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

const Event=mongoose.model('Events',eventSchema);
const eventList=[];

parsedEventData.forEach(event=>{
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
        ...((!!event.involvedClubs) && { involvedClubs: processArrays(event.involvedClubs) }),
        //array of subdocuments
        ...((!!event.speakerNames) && { speakers: processSpeakers(event.speakerNames, event.speakerInfos, event.speakerCreds, event.speakerPos) }),
        //requires validation if provided
        ...((!!event.capacity) && { capacity: event.capacity }),
    });
});

function processArrays(eventInfo) {
    //convert applicable event info into array of strings
    return eventInfo.split(/[|]/); //use regex to split string at |
}
function processSpeakers(Names, Infos, Creds, Pos) {
    //convert speaker parameters into array of speaker objects
    let speakerNames =  Names.split(/[|]/); //names is the only required portion
    let speakerInfos =  Infos.split(/[|]/);
    let speakerCreds =  Creds.split(/[|]/);
    let speakerPos = Pos.split(/[|]/);
    const speakerList=[];
    //must have same # of separator chars in each field, but value may be empty
    speakerNames.forEach((speaker, index) => {
        speakerList.push({
            speakerName: speakerNames[index],
            speakerInfo: speakerInfos[index],
            speakerCred: speakerCreds[index],
            speakerPos: speakerPos[index],
        })
    })
    return speakerList;
}





Event.insertMany(eventList).then(events=>{
    mongoose.connection.close();
}).catch(err => {
    console.log(err);
});