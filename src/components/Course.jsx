import React from 'react'
import { Card,CardActionArea,CardMedia,CardContent,Typography,CardActions,Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function Course({imgUrl, title, description, price, id}){
  const navigate = useNavigate();
    return(
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={imgUrl}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={()=>{
          navigate(`/course/${id}`);
        }} size="small" color="primary">
          Edit
        </Button>
      </CardActions>
    </Card>
    )
}

export default Course;