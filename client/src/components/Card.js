import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

import * as React from 'react';

import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EditWishList from './editWishList';



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));



const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};


export default function BasicCard(props) {  
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const base64String = btoa(String.fromCharCode(...new Uint8Array(props.word.photo.data.data)));
  console.log(base64String)
  return (
    <Card sx={{ minWidth: 275 }}>
    <CardMedia
        component="img"
        height="300"
      image={`data:image/png;base64,${base64String}`}
        alt=""
      />
      <CardContent>
        
        <Typography gutterBottom style={{paddingLeft:20}} component="div" variant="body2">
        <b style={{color:"#0069c0"}}>Item Name:</b> {props.word.item_name}
        </Typography>
        <Typography style={{paddingLeft:20}} component="div" variant="body2">
        <b style={{color:"#0069c0"}}>Brand Name:</b> {props.word.brand_name}
        </Typography>
        
        <Divider />
        
        {/* <img src={`data:image/png;base64,${base64String}`} width="500"/> */}
      </CardContent> 
      <CardActions>
        <EditWishList word={props.word}/>
      </CardActions>
    </Card>
  );
}
