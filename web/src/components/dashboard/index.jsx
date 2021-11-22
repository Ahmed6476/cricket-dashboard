import axios from 'axios';
import { useState, useEffect } from "react"
import { baseUrl } from "./../../core"
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import io from 'socket.io-client';
import Grid from '@mui/material/Grid';
// import Post from './post'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
} from "react-router-dom";

function Dashboard() {
    let history = useHistory();
    // const [inputText, setInputText] = useState("");
    //                      // const [wicketsText, setWicketsText] = useState("");
    // const [TeamAwickets, setWicketsText] = useState("");
    //                     // const [overs, setOvers] = useState("");
    // const [TeamAovers, setOvers] = useState("");
    //                    // const [team1, setTeam1] = useState("");
    //                  // const [team1, setTeam1] = useState("");
    // const [TeamARuns, setTeam1] = useState("");
    //                 // const [team2, setTeam2] = useState("");
    // const [TeamA, setTeam2] = useState("");
    // // const [posts, setPosts] = useState([])
    // const [refresh, setRefresh] = useState(false)
    // // const [isMore, setIsMore] = useState(true)
    const [score, setScore] = useState({
        toss: "",
        teamA: "",
        teamB: "",
        wickets: "",
        runs:"",
        overs: "",
        bowler: "",
        bowlerOvers: "",
        bowlerRuns: "",
        bowlerWickets: "",
        batsmanOne: "",
        batsmanOneRuns: "",
        batsmanOneBowls: "",
        batsmanTwo: "",
        batsmanTwoRuns: "",
        batsmanTwoBowls: "",
        target: ""
    })

    useEffect(() => {
        axios.get(`${baseUrl}/api/v1/score`)
            .then((res) => {
                console.log("res +++: ", res.data);
                setScore(res.data)
            })
    }, [])


    // const submit = () => {
    // if (inputText !== "") {
    //     // const genderValue = document.querySelector(
    //     //     'input[name="gender"]:checked'
    //     // ).value;
    //     axios.post(`${baseUrl}/api/v1/score`, score){

    //     }
    // postText: inputText,
    // wicketsA: TeamAwickets,
    // oversA: TeamAovers,
    // runsA: TeamARuns,
    // TeamA: TeamA,
    // postText: req.body.postText,
    // wicketsText: req.body.wicketsText,
    // TeamAWickets : req.body.TeamAWickets,
    // // oversText: req.body.oversText,
    //     // TeamAovers : req.body.oversText,
    //     // // team1Text: req.body.team1Text,
    //     // TeamAruns : req.body.TeamAruns,
    //     // // team2Text: req.body.team2Text,
    //     // TeamA : req.body.TeamA,
    //     //         // gender: genderValue,
    //     //     }, {
    //         //     withCredentials: true
    //         // })
    //             .then((res) => {
    //                 console.log("res: ", res.data);
    //                 if (res.data) {
    //                     history.push("/Scorecard")
    //                 }
    //                 setRefresh(!refresh)


    //             })
    //     }
    // }

    const submit = () => {
        axios.post(`${baseUrl}/api/v1/score`, score)
            .then((res) => {
                console.log("res: ", res.data);
                if (res.data) {
                    history.push("/Scorecard")
                }
            })
    }
    return (
        <div style={{ margin: "1rem" }}>

            <h1> Dashboard Page </h1>


            <Stack spacing={2} direction="row">

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        '& .MuiTextField-root': { width: '20ch' },
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField
                                label="TeamA"
                                id="outlined-multiline-static"
                                multiline
                                rows={1}
                                value={score.teamA}
                                onChange={(e) => {
                                    setScore((prev) => {
                                        return { ...prev, teamA: e.target.value }
                                    })
                                }}
                                placeholder="First Team Name"
                            />
                        </Grid>   <br />

                        <Grid item xs={4}>
                            <TextField
                                label="TeamB"
                                id="outlined-multiline-static"
                                multiline
                                rows={1}
                                value={score.teamB}
                                onChange={(e) => {
                                    setScore((prev) => {
                                        return { ...prev, teamB: e.target.value }
                                    })
                                }}
                                placeholder="Second Team Name"
                            />
                        </Grid>
                        <br />
                        {/* <FormControl component="fieldset">
                            <FormLabel component="legend" style={{ textAlign: "left" }}>
                                Toss    
                            </FormLabel>
                            <RadioGroup
                                aria-label="gender"
                                defaultValue="Bat"
                                name="genderParent"
                            >
                                <FormControlLabel
                                    name="gender"
                                    value="Bat"
                                    control={<Radio />}
                                    label="Bat"
                                />
                                <FormControlLabel
                                    name="gender"
                                    value="Field"
                                    control={<Radio />}
                                    label="Field"
                                />
                            </RadioGroup>
                        </FormControl> */}
                        <Grid item xs={4}>
                            <TextField
                                label="Toss"
                                id="outlined-multiline-static"
                                multiline
                                rows={3}
                                value={score.toss}
                                onChange={(e) => {
                                    setScore((prev) => {
                                        return { ...prev, toss: e.target.value }
                                    })
                                }}
                                placeholder="Who Won the toss and what he decided"
                            />
                        </Grid>

                        <br />

                        <Grid item xs={4}>
                            <TextField
                                label="Wickets"
                                id="outlined-multiline-static"
                                multiline
                                rows={1}
                                value={score.wickets}
                                onChange={(e) => {
                                    setScore((prev) => {
                                        return { ...prev, wickets: e.target.value }
                                    })
                                }}
                                placeholder="Wickets"
                            />
                        </Grid>
                        <br />
                        <Grid item xs={4}>
                            <TextField
                                label="Runs"
                                id="outlined-multiline-static"
                            
                                rows={1}
                                value={score.runs}
                                onChange={(e) => {
                                    setScore((prev) => {
                                        return { ...prev, runs: e.target.value }
                                    })
                                }}
                                placeholder="Wickets"
                            />
                        </Grid>


                        <Grid item xs={4}>
                            <TextField
                                label="Overs"
                                id="outlined-multiline-static"
                                multiline
                                rows={1}
                                value={score.overs}
                                onChange={(e) => {
                                    setScore((prev) => {
                                        return { ...prev, overs: e.target.value }
                                    })
                                }}
                                placeholder="Overs"
                            />

                        </Grid>
                        
                        <Grid item xs={4}>
                            <TextField
                                label="Bowler Name"
                                id="outlined-multiline-static"
                                multiline
                                rows={1}
                                value={score.bowler}
                                onChange={(e) => {
                                    setScore((prev) => {
                                        return { ...prev, bowler: e.target.value }
                                    })
                                }}
                                placeholder="Bowler"
                            />

                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="BowlerRuns"
                                id="outlined-multiline-static"
                                multiline
                                rows={1}
                                value={score.bowlerRuns}
                                onChange={(e) => {
                                    setScore((prev) => {
                                        return { ...prev, bowlerRuns: e.target.value }
                                    })
                                }}
                                placeholder="BowlerRuns"
                            />

                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="BowlerWickets"
                                id="outlined-multiline-static"
                                multiline
                                rows={1}
                                value={score.bowlerWickets}
                                onChange={(e) => {
                                    setScore((prev) => {
                                        return { ...prev, bowlerWickets: e.target.value }
                                    })
                                }}
                                placeholder="BowlerWickets"
                            />

                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="BowlerOvers"
                                id="outlined-multiline-static"
                                multiline
                                rows={1}
                                value={score.bowlerOvers}
                                onChange={(e) => {
                                    setScore((prev) => {
                                        return { ...prev, bowlerOvers: e.target.value }
                                    })
                                }}
                                placeholder="BowlerOvers"
                            />

                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="BatsmanOneName"
                                id="outlined-multiline-static"
                                multiline
                                rows={1}
                                value={score.batsmanOne}
                                onChange={(e) => {
                                    setScore((prev) => {
                                        return { ...prev, batsmanOne: e.target.value }
                                    })
                                }}
                                placeholder="BatsmanOne"
                            />

                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="BastmanOneRuns"
                                id="outlined-multiline-static"
                                multiline
                                rows={1}
                                value={score.batsmanOneRuns}
                                onChange={(e) => {
                                    setScore((prev) => {
                                        return { ...prev, batsmanOneRuns: e.target.value }
                                    })
                                }}
                                placeholder="BastmanOneRuns"
                            />

                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="BastmanOneBowls"
                                id="outlined-multiline-static"
                                multiline
                                rows={1}
                                value={score.batsmanOneBowls}
                                onChange={(e) => {
                                    setScore((prev) => {
                                        return { ...prev, batsmanOneBowls: e.target.value }
                                    })
                                }}
                                placeholder="BastmanOneBowls"
                            />

                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="BatsmanTwoName"
                                id="outlined-multiline-static"
                                multiline
                                rows={1}
                                value={score.batsmanTwo}
                                onChange={(e) => {
                                    setScore((prev) => {
                                        return { ...prev, batsmanTwo: e.target.value }
                                    })
                                }}
                                placeholder="BatsmanTwoName"
                            />

                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                 id="outlined-number"
                                 label="BatsmanTwoRuns"
                                 type="number"
                                rows={1}
                                value={score.batsmanTwoRuns}
                                onChange={(e) => {
                                    setScore((prev) => {
                                        return { ...prev, batsmanTwoRuns: e.target.value }
                                    })
                                }}
                                placeholder="BatsmanTwoRuns"
                            />

                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="BatsmanTwoBowls"
                                id="outlined-multiline-static"
                                rows={1}
                                value={score.batsmanTwoBowls}
                                onChange={(e) => {
                                    setScore((prev) => {
                                        return { ...prev, batsmanTwoBowls: e.target.value }
                                    })
                                }}
                                placeholder="BatsmanTwoBowls"
                            />

                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Target"
                                id="outlined-multiline-static"
                                multiline
                                rows={1}
                                value={score.target}
                                onChange={(e) => {
                                    setScore((prev) => {
                                        return { ...prev, target: e.target.value }
                                    })
                                }}
                                placeholder="Target"
                            />

                        </Grid>
                        
                        <Grid item xs={4}>

                            <Button variant="contained" onClick={submit}>Post</Button>

                        </Grid>

                    </Grid>
                </Box>

            </Stack>

            <br />


            {/* <Post name={posts.name} email={posts.email} team1={posts.team1Text} team2={posts.team2Text} toss={posts.gender} text={posts.postText} wickets={posts.wicketsText} overs={posts.oversText} /> */}


            <br />

            {/* {(isMore) ? <Button onClick={loadMore}>Load More</Button> : null} */}

        </div>
    );
}

export default Dashboard;