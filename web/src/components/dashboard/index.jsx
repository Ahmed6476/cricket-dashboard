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
    const [inputText, setInputText] = useState("");
                         // const [wicketsText, setWicketsText] = useState("");
    const [TeamAwickets, setWicketsText] = useState("");
                        // const [overs, setOvers] = useState("");
    const [TeamAovers, setOvers] = useState("");
                       // const [team1, setTeam1] = useState("");
                     // const [team1, setTeam1] = useState("");
    const [TeamARuns, setTeam1] = useState("");
                    // const [team2, setTeam2] = useState("");
    const [TeamA, setTeam2] = useState("");
    // const [posts, setPosts] = useState([])
    const [refresh, setRefresh] = useState(false)
    // const [isMore, setIsMore] = useState(true)



    const submit = () => {
        if (inputText !== "") {
            // const genderValue = document.querySelector(
            //     'input[name="gender"]:checked'
            // ).value;
            axios.post(`${baseUrl}/api/v1/post`, {
                postText: inputText,
                wicketsA: TeamAwickets,
                oversA: TeamAovers,
                runsA: TeamARuns,
                TeamA: TeamA,
                // postText: req.body.postText,
        // wicketsText: req.body.wicketsText,
        // TeamAWickets : req.body.TeamAWickets,
        // // oversText: req.body.oversText,
        // TeamAovers : req.body.oversText,
        // // team1Text: req.body.team1Text,
        // TeamAruns : req.body.TeamAruns,
        // // team2Text: req.body.team2Text,
        // TeamA : req.body.TeamA,
        //         // gender: genderValue,
        //     }, {
                withCredentials: true
            })
                .then((res) => {
                    console.log("res: ", res.data);
                    if (res.data) {
                        history.push("/Scorecard")
                    }
                    setRefresh(!refresh)


                })
        }
    }

    return (
        <div style={{ margin: "1rem" }}>

            <h1> Dashboard Page </h1>


            <Stack spacing={2} direction="row">

            <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '& .MuiTextField-root': { width: '25ch' },
      }}
    >
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={1}
                    value={TeamA}
                    onChange={(e) => {
                        setTeam2(e.target.value)
                    }}
                    placeholder="First Team Name"
                /> <br />
                 <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={1}
                    value={TeamARuns}
                    onChange={(e) => {
                        setTeam1(e.target.value)
                    }}
                    placeholder="Team A runs"
                /> <br />
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
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={1}
                    value={inputText}
                    onChange={(e) => {
                        setInputText(e.target.value)
                    }}
                    placeholder="Who Want the toss and what he decided"
                /> <br />
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={1}
                    value={TeamAwickets}
                    onChange={(e) => {
                        setWicketsText(e.target.value)
                    }}
                    placeholder="Wickets"
                /> <br />
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={1}
                    value={TeamAovers}
                    onChange={(e) => {
                        setOvers(e.target.value)
                    }}
                    placeholder="Overs"
                /> <br />
                <Button variant="contained" onClick={submit}>Post</Button>
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