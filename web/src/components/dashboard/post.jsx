import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';


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

export default function RecipeReviewCard(props) {
    const { text, team1, team2, toss, overs, wickets, email, name, timestamp } = props;
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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
                    {team2} 
                </Typography>
                <Typography variant="h4" color="text.secondary">
                    {team1}/{wickets}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                    {text}  
                </Typography>

                <Typography variant="h5" color="text.secondary">
                    {overs} Overs
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
            </CardActions>
            
        </Card>
    );
}