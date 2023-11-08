import React from 'react'
import { Card,CardActionArea,CardMedia,CardContent,Typography,CardActions,Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function Course({imgUrl, title, description, price, id}){
  const navigate = useNavigate();
    return(
      <Card sx={{ maxWidth: '345px', height:'350px' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="150"
            image={imgUrl}
            alt={title}
          />
          <CardContent sx={{height:'130px'}}>
            <Typography sx={{color:'black'}} variant="h6" component="div">
              {title}
            </Typography>
            <Typography sx={{paddingTop:'5px'}} variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <div style={{marginTop:15, display:'flex', justifyContent:'center'}}>
          <CardActions>
            <Button variant="contained" color="primary" onClick={()=>{
              navigate(`/course/${id}`);
            }} size="small">
              Edit
            </Button>
          </CardActions>
        </div>
      </Card>
    )
}

export default Course;