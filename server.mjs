import express from 'express'
import mongoose from "mongoose"
import cors from "cors"
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";


const __dirname = path.resolve();
import {
    stringToHash,
    varifyHash
} from "bcrypt-inzi"
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';


const SECRET = process.env.SECRET || "12345"
const PORT = process.env.PORT || 5001
const app = express()

mongoose.connect('mongodb+srv://ahmed672:Samsung123@cluster0.f1scc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
    created: { type: Date, default: Date.now },
});
const Score = mongoose.model("Score", {
    toss: String,
        teamA: String,
        teamB:String,
        wickets: String,
        runs:String,
        overs: String,
        bowler: String,
        bowlerOvers: String,
        bowlerRuns: String,
        bowlerWickets: String,
        batsmanOne: String,
        batsmanOneRuns: String,
        batsmanOneBowls: String,
        batsmanTwo: String,
        batsmanTwoRuns: String,
        batsmanTwoBowls: String,
        target: String,
    created: { type: Date, default: Date.now },
    userId: String,
    name: String,
    email: String,
})
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5001"],
    credentials: true
}))

app.use('/', express.static(path.join(__dirname, 'web/build')))
app.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./web/build/index.html"))
})


app.post('/api/v1/login', (req, res, next) => {

    if (!req.body.email ||
        !req.body.password
    ) {
        console.log("required field missing");
        res.status(403).send("required field missing");
        return;
    }
    console.log("req.body: ", req.body);

    User.findOne({ email: req.body.email }, (err, user) => {

        if (err) {
            res.status(500).send("error in getting database")
        } else {
            if (user) {

                varifyHash(req.body.password, user.password).then(result => {
                    if (result) {

                        var token = jwt.sign({
                            name: user.name,
                            email: user.email,
                            _id: user._id,
                        }, SECRET);
                        console.log("token created: ", token);

                        res.cookie("token", token, {
                            httpOnly: true,
                            // expires: (new Date().getTime + 300000), //5 minutes
                            maxAge: 500000
                        });

                        res.send({
                            name: user.name,
                            email: user.email,
                            _id: user._id,
                        });
                    } else {
                        res.status(401).send("Authentication fail");
                    }
                }).catch(e => {
                    console.log("error: ", e)
                })

            } else {
                res.send("user not found");
            }
        }
    })
})

app.post('/api/v1/signup', (req, res, next) => {

    if (!req.body.email ||
        !req.body.password ||
        !req.body.name
    ) {
        console.log("required field missing");
        res.status(403).send("required field missing");
        return;
    } else {

        User.findOne({ email: req.body.email }, (err, user) => {
            if (user) {
                res.send("user already exist");
            } else {
                console.log(req.body)

                stringToHash(req.body.password).then(passwordHash => {
                    console.log("hash: ", passwordHash);

                    let newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: passwordHash,
                    })
                    newUser.save(() => {
                        console.log("data saved")
                        res.send('signup success')
                    })
                })
            }
        })
    }

})

app.use((req, res, next) => {

    jwt.verify(req.cookies.token, SECRET,
        function (err, decoded) {

            req.body._decoded = decoded;

            console.log("decoded: ", decoded) // bar

            if (!err) {
                next();
            } else {
                res.status(401).sendFile(path.join(__dirname, "./web/build/index.html"))
            }

        })

});

app.post('/api/v1/logout', (req, res, next) => {
    res.cookie("token", "", {
        httpOnly: true,
        maxAge: 300000
    });
    res.send();
})

app.get('/api/v1/profile', (req, res) => {
    User.findOne({ email: req.body._decoded.email }, (err, user) => {

        if (err) {
            res.status(500).send("error in getting database")
        } else {
            if (user) {
                res.send({
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                });
            } else {
                res.send("user not found");
            }
        }
    })
})
app.post('/api/v1/profile', (req, res) => {
    res.send('profile created')
})
app.put('/api/v1/profile', (req, res) => {
    res.send('profile updated')
})
app.delete('/api/v1/profile', (req, res) => {
    res.send('profile deleted')
})

app.post("/api/v1/score", (req, res) => {
    const newScore = new Score({
        // postText: req.body.postText,
        // // wicketsText: req.body.wicketsText,
        // wicketsA : req.body.wicketsA,
        // // oversText: req.body.oversText,
        // oversA : req.body.oversA,
        // // team1Text: req.body.team1Text,
        // runsA : req.body.runsA,
        // // team2Text: req.body.team2Text,
        // TeamA : req.body.TeamA,
        // // gender: req.body.gender,

        toss: req.body.toss,
        teamA: req.body.teamA,
        teamB: req.body.teamB,
        wickets: req.body.wickets,
        runs:req.body.runs,
        overs: req.body.overs,
        bowler: req.body.bowler,
        bowlerOvers: req.body.bowlerOvers,
        bowlerRuns: req.body.bowlerRuns,
        bowlerWickets: req.body.bowlerWickets,
        batsmanOne: req.body.batsmanOne,
        batsmanOneRuns:req.body.batsmanOneBowls,
        batsmanOneBowls: req.body.batsmanOneBowls,
        batsmanTwo: req.body.batsmanTwo,
        batsmanTwoRuns: req.body.batsmanTwoRuns,
        batsmanTwoBowls: req.body.batsmanTwoBowls,
        target: req.body.target,
        userId: req.body._decoded._id,
        name: req.body._decoded.name,
        email: req.body._decoded.email
    });
    newScore.save().then(() => {
        console.log("Score created");
        
        io.emit("POSTS", {
            toss: req.body.toss,
        teamA: req.body.teamA,
        teamB: req.body.teamB,
        wickets: req.body.wickets,
        runs:req.body.runs,
        overs: req.body.overs,
        bowler: req.body.bowler,
        bowlerOvers: req.body.bowlerOvers,
        bowlerRuns: req.body.bowlerRuns,
        bowlerWickets: req.body.bowlerWickets,
        batsmanOne: req.body.batsmanOne,
        batsmanOneRuns:req.body.batsmanOneBowls,
        batsmanOneBowls: req.body.batsmanOneBowls,
        batsmanTwo: req.body.batsmanTwo,
        batsmanTwoRuns: req.body.batsmanTwoRuns,
        batsmanTwoBowls: req.body.batsmanTwoBowls,
        target: req.body.target,
        //     postText: req.body.postText,
        // // wicketsText: req.body.wicketsText,
        // wicketsA : req.body.wicketsA,
        // // oversText: req.body.oversText,
        // oversA : req.body.oversA,
        // // team1Text: req.body.team1Text,
        // runsA : req.body.runsA,
        // // team2Text: req.body.team2Text,
        // TeamA : req.body.TeamA,
        //     // gender: req.body.gender,
            userId: req.body._decoded._id,
            name: req.body._decoded.name,
            email: req.body._decoded.email
        });
        res.send("Score created");
    });
});
app.delete("/api/v1/post", (req, res) => {
    Post.deleteOne({ _id: req.body.id, userId: req.body._decoded._id }, (err, data) => {
        res.send("Post deleted");
    });
});

app.put("/api/v1/post", (req, res) => {
    Post.updateOne({
        _id: req.body.id,
        userId: req.body._decoded._id
    }, {
        PlayingTeams: req.body.PlayingTeams
    }, (err, data) => {
        res.send("Post deleted");
    });
});

app.get("/api/v1/score", (req, res) => {

    // const page = Number(req.query.page);

    // console.log("page: ", page);

    // Post.find({})
    //     .sort({ created: "desc" })
    //     .skip(page)
    //     .limit(2)
    //     .exec(function (err, data) {
    //         res.send(data);
    //     });

    Score.findOne({})
    .sort({_id:'desc'})
    .exec(function(err,data){
        res.send(data);
    })
});

app.get("/**", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./web/build/index.html"))
    // res.redirect("/")
})

// app.listen(PORT, () => {
//     console.log(`Example app listening at http://localhost:${PORT}`)
// })

const server = createServer(app);

const io = new Server(server, { cors: { origin: "*", methods: "*", } });

io.on("connection", (socket) => {
    console.log("New client connected with id: ", socket.id);

    // to emit data to a certain client
    socket.emit("topic 1", "some data")

    // collecting connected users in a array
    // connectedUsers.push(socket)

    socket.on("disconnect", (message) => {
        console.log("Client disconnected with id: ", message);
    });
});


setInterval(() => {

    // to emit data to all connected client
    // first param is topic name and second is json data
    io.emit("Test topic", { event: "ADDED_ITEM", data: "some data" });
    console.log("emiting data to all client");

}, 2000)


server.listen(PORT, function () {
    console.log("server is running on", PORT);
})