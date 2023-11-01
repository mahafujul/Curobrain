import React from 'react'
import { Card,CardActionArea,CardMedia,CardContent,Typography,CardActions,Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function Course({imgUrl, title, description, price, id}){
  const navigate = useNavigate();
    return(
      <div>
        <CardActionArea>
          <CardContent>
            <Typography style={{color:'black'}} variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            height="140"
            image={imgUrl}
            alt={title}
          />
        </CardActionArea>
        <div style={{display:'flex', justifyContent:'center', marginTop:15}}>
          <CardActions>
            <Button variant='contained' onClick={()=>{
              navigate(`/course/${id}`);
            }} size="small" color="primary">
              Edit
            </Button>
          </CardActions>
        </div>
      </div>
    )
}

export default Course;