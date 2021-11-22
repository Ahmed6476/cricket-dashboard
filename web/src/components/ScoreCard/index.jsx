import axios from 'axios';
import { useState, useEffect } from "react"
import { baseUrl } from "./../../core"
// import Post from "../dashboard/post"
import io from 'socket.io-client';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';



function ScoreCard() {
    const [score, setScore] = useState({})

    useEffect(() => {
        axios.get(`${baseUrl}/api/v1/score`)
            .then((res) => {
                console.log("res +++: ", res.data);
                setScore(res.data);
            })
    }, [])

    useEffect(() => {
        const socket = io("http://localhost:5001");

        socket.on("connect", () => {
            console.log("Connected to server")
        })
        socket.on("disconnect", () => {
            console.log("Disconnected to server")
        })
        socket.on("SCORE", (data) => {
            console.log(data);
            setScore(data)
        })
        return () => {
            socket.close();
        }
    }, [])



    return (
        <Card sx={{ maxWidth: 1600 }}>
        <CardHeader
            avatar={
                <Avatar aria-label="recipe">
                    <img src="https://upload.wikimedia.org/wikipedia/en/1/10/ICC_Men%27s_T20_World_Cup_2021_logo.svg" alt="" width="30" />
                </Avatar>
            }
            title="ICC Men's T20 World Cup 2021"
            subheader="Live Match"
            
        />
        
        <CardContent>
        <Typography variant="h4" color="text.secondary">
                {score?.teamA} 
            </Typography>
            <Typography variant="h4" color="text.secondary">
                {score?.runs}/{score?.wickets}
            </Typography>
            <Typography variant="h5" color="text.secondary">
                {score.batsmanOne}  
            </Typography>

            <Typography variant="h5" color="text.secondary">
                {score?.batsmanOneRuns} 
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
        </CardActions>
        
    </Card>
);
}

export default ScoreCard;



// const ExpandMore = styled((props) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//     transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//     }),
// }));

