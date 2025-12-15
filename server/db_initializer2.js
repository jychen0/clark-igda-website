const fs=require('fs');
const mongoose = require('mongoose');
const csv_parse = require('csv-parse/sync');

const rawJamData=fs.readFileSync(__dirname+'/' + 'jams.csv','utf8');
const parsedJamData = csv_parse.parse(rawJamData, {
    columns: true,
    skip_empty_lines: true,
});


const {MongoClient, ServerApiVersion} = require('mongodb');
const uri = "mongodb+srv://bagels0009:testingpassword1@messageapp.gziedbg.mongodb.net/?appName=MessageApp";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ping: 1});
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);

mongoose.connect(uri, {})
    .then(function (db) {
        console.log("db connected");
    });

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
const jamList=[];

parsedJamData.forEach(jam=>{
    jamList.push({
        //mongoose schema: csv entry
        gameName: jam.gameName,
        jamSubmission: jam.jamSubmission,
        image: jam.image,
        itchLink: jam.itchLink,
        //array of strings
        developers: processArrays(jam.developers),
        awards: processArrays(jam.awards)
    });
});

function processArrays(jamInfo) {
    //convert applicable event info into array of strings
    return jamInfo.split(/[|]/); //use regex to split string at |
}

Jam.insertMany(jamList).then(events=>{
    mongoose.connection.close();
}).catch(err => {
    console.log(err);
});