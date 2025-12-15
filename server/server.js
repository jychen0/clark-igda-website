const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();
const cors = require("cors")

const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose").default;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/client")); //this should allow us to load any files within this subdirectory
app.use(express.static(__dirname + "/igda-club-site"));
//app.use(express.static(__dirname + "/igda-club-site"));

app.use(session({
    secret: process.env.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const {MongoClient, ServerApiVersion} = require('mongodb');
const path = require("path");
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

//frontend on port 3000
//const port = 3001;
const port = process.env.PORT || 3001;
app.listen(port, function () {
    console.log(`Server listening on port ${port}`);
});

// app.get('/', function (req, res) {
//     res.sendFile(__dirname + "/public/index.html");
// });

if (process.env.NODE_ENVIRONMENT === "production") {
    app.use(express.static("igda-club-site/build")); // Serve static files from the build directory
    app.get("/", (req, res) => { // For any other route, serve the index.html file
        res.sendFile(path.resolve(__dirname, "igda-club-site", "build", "index.html"));
    });
    app.get("*", (req, res) => { // For any other route, serve the index.html file
        res.sendFile(path.resolve(__dirname, "igda-club-site", "build", "index.html"));
    });
}
// app.use(express.static("igda-club-site/build")); // Serve static files from the build directory
// app.get("*", (req, res) => { // For any other route, serve the index.html file
//     res.sendFile(path.resolve(__dirname, "igda-club-site", "build", "index.html"));
// });
// app.get('/', function (req, res) {
//     res.sendFile(__dirname + "/../igda-club-site/public/index.html");
// });

//subdocument schema for event speakers {name, info, credentials}
const speakerSchema = {
    speakerName: { //Speaker full name
        type: String,
        required: [true, 'Speaker Name is required'],
        minLength: [4, 'Speaker Name must be at least 4 characters'],
    },
    speakerInfo: { //Speaker LinkedIn URL
        type: String,
    },
    speakerPos: { //Speaker Position
        type: String,
    },
    speakerCred: { //Speaker Company / Affiliation
        type: String,
    }
}
//subdocument schema for event date {semester, startTime, endTime}
const dateSchema = {
    semester: { //Semester event ran in
        type: String,
        required: [true, 'Semester is required'],
    },
    start: { //Start time of event
        type: Date,
        required: [true, 'Start Time is required'],
        min: ['2023-01-01T00:00:00', 'Event must be since 2023'],
    },
    end: { //End time of event
        type: Date,
        required: [true, 'End Time is required'],
        min: ['2023-01-01T00:00:00', 'Event must be since 2023'],
    }
}
//subdocument schema for event location, {held, location} 0=virtual, 1=in person
const locationSchema = {
    held: {
        type: Number,
        required: [true, 'in person clarification is required'],
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
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
const eventSchema = {
    eventName: { //Event Title
        type: String,
        required: [true, 'Event Title is required'],
        minLength: [5, 'Event Title must be at least 5 characters'],
    },
    eventType: { //talk, workshop, info session, mixer, game jam, asset jam, expo, field trip
        type: String,
        required: [true, 'Event type is required'],
    },
    posterIMG: { //dir for images: /igda-club-site/src/assets/event_posters/ + posterIMG string
        type: String,
    },
    speakers: { //array of outside industry speakers
        type: [{
            type: speakerSchema,
        }],
        //validate: [minLength, 'Must have at least one speaker']
    },
    targetTracks: { //lists all tracks the event caters towards (Production, Programming, 3D Art, 2D Art, Audio, Writing, Design)
        type: [{
            type: String,
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
            type: String,
        }],
        //validate: [minLength, 'Must have at least one involved Club']
    },
    overview: {
        type: String,
    },
    capacity: { //if applicable, must be an int
        type: Number,
        validate: {
            validator: function (value) {
                return Number.isInteger(value);
            },
            message: "Capacity must be an integer"
        },
    },
    attendance: { //recorded # of attendees
        type: Number,
        validate: {
            validator: function (value) {
                return Number.isInteger(value);
            },
            message: "Attendance must be an integer"
        },
    },
}

const jamSchema = {
    gameName: { //Event Title
        type: String,
        required: [true, 'Event Title is required'],
    },
    jamSubmission: { //talk, workshop, info session, mixer, game jam, asset jam, expo, field trip
        type: String,
        required: [true, 'Event type is required'],
    },
    image: {
        type: String,
    },
    itchLink: {
        type: String,
    },
    developers: {
        type: [{
            type: String,
        }],
    },
    awards: {
        type: [{
            type: String,
        }],
    },
}

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tag: {
    type: String,
  },
  desc: {
    type: String,
    required: [true, "Description is required"],
  },
});

const eboardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  position: {
    type: String,
    required: [true, "Position is required"],
  },
  image: {
    type: String,
    default: "",
  },
});

const Jam = mongoose.model('Jams', jamSchema);
const Event = mongoose.model('Event', eventSchema);
const Announcement = mongoose.model("Announcement", announcementSchema);
const EBoardMember = mongoose.model("EBoardMember", eboardSchema);

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});

adminSchema.plugin(passportLocalMongoose);

const Admin = mongoose.model("Admin", adminSchema);


passport.use(Admin.createStrategy());
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

// Ensure admin account exists on startup
async function ensureAdmin() {
  try {
    const existingAdmin = await Admin.findOne({ username: "admin" });

    if (!existingAdmin) {
      const admin = await Admin.register(
        { username: "admin" },
        process.env.ADMIN_PASSWORD
      );
      console.log("Admin user created successfully");
    } else {
      console.log("Admin user already exists");
    }
  } catch (err) {
    console.error("Admin creation error:", err);
  }
}

ensureAdmin();


app.get('/test', function (req, res) {
    res.send('it works now')
});

app.post("/admin/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Login error:", err);
      return res.status(500).json({ message: "Server error" });
    }
    if (!user) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    req.login(user, (err) => {
      if (err) {
        console.error("Session error:", err);
        return res.status(500).json({ message: "Login failed" });
      }
      return res.json({ message: "success" });
    });
  })(req, res, next);
});

app.get("/admin/check", function (req, res) {
    if (req.isAuthenticated()) {
        res.json({ authenticated: true });
    } else {
        res.status(401).json({ authenticated: false });
    }
});

app.get("/admin/logout", function (req, res) {
    req.logout(() => {
        res.json({ message: "logged out" });
    });
});

// // TEMPORARY: Reset admin password manually
// app.post("/admin/reset-password", async (req, res) => {
//   try {
//     const { newPassword } = req.body;
//     const admin = await Admin.findOne({ username: "admin" });

//     if (!admin) {
//       return res.status(404).json({ message: "Admin not found" });
//     }

//     await admin.setPassword(newPassword);
//     await admin.save();

//     res.json({ message: "Password reset successful" });
//   } catch (err) {
//     console.error("Error resetting password:", err);
//     res.status(500).json({ message: "Error resetting password" });
//   }
// });

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
    Event.find({ '_id': req.query.event._id }) //if issues use event_id
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
    if (sortBy === "basic-addon2" || "search_box" || "nullSort") { sortBy = {}; }
    if (!min_year) { min_year = 1900; }
    if (!max_year) { max_year = new Date().getFullYear(); }
    if (!min_price) { min_price = 0; }
    if (!max_price) { max_price = Number.MAX_VALUE; }

    Event.find({
        $and: [
            { year: { $gte: min_year }, },
            { year: { $lte: max_year }, },
            { price: { $gte: min_price }, },
            { price: { $lte: max_price }, },
            {
                $or: [
                    { make: { $regex: searchKey } },
                    { model: { $regex: searchKey } }
                ]
            }
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

app.get("/get-all-announcements", async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ date: -1 });
    res.json({ message: "success", data: announcements });
  } catch (err) {
    console.error("Error fetching announcements:", err);
    res.status(500).json({ message: "Error fetching announcements", data: [] });
  }
});

// --- Admin Management --- //
app.post("/admin/add-event", async (req, res) => {
  try {
    const body = { ...req.body };

    if (!body.attendance && body.attendance !== 0) body.attendance = 0;
    if (body.capacity === "" || body.capacity === null) delete body.capacity;

    const newEvent = new Event(body);
    await newEvent.save();

    res.json({ message: "Event added successfully" });
  } catch (err) {
    console.error("Error adding event:", err);

    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors)
        .map((e) => e.message)
        .join("; ");
      return res.status(400).json({ message: messages });
    }
    res.status(500).json({ message: "Unexpected server error" });
  }
});


app.post("/admin/add-announcement", async (req, res) => {
  try {
    const newAnnouncement = new Announcement(req.body);
    await newAnnouncement.save();
    res.json({ message: "Announcement added successfully" });
  } catch (err) {
    console.error("Error adding announcement:", err);
    res.status(500).json({ message: "Error adding announcement", error: err.message });
  }
});

app.put("/admin/edit-event/:id", async (req, res) => {
  try {
    await Event.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Event updated successfully" });
  } catch (err) {
    console.error("Error updating event:", err);
    res.status(500).json({ message: "Error updating event" });
  }
});

app.put("/admin/edit-announcement/:id", async (req, res) => {
  try {
    await Announcement.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Announcement updated successfully" });
  } catch (err) {
    console.error("Error updating announcement:", err);
    res.status(500).json({ message: "Error updating announcement" });
  }
});

app.delete("/admin/delete-event/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ message: "Error deleting event" });
  }
});

app.delete("/admin/delete-announcement/:id", async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Announcement deleted successfully" });
  } catch (err) {
    console.error("Error deleting announcement:", err);
    res.status(500).json({ message: "Error deleting announcement" });
  }
});

// --- E-Board Management --- //
app.get("/get-all-eboard", async (req, res) => {
  try {
    const members = await EBoardMember.find();
    res.json({ message: "success", data: members });
  } catch (err) {
    res.status(500).json({ message: err.message, data: [] });
  }
});

app.post("/admin/add-eboard", async (req, res) => {
  try {
    const newMember = new EBoardMember(req.body);
    await newMember.save();
    res.json({ message: "E-Board member added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/admin/edit-eboard/:id", async (req, res) => {
  try {
    await EBoardMember.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "E-Board member updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/admin/delete-eboard/:id", async (req, res) => {
  try {
    await EBoardMember.findByIdAndDelete(req.params.id);
    res.json({ message: "E-Board member removed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
