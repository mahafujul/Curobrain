import React,{useState,useEffect} from 'react'
import {Typography,Card,FormGroup, FormControlLabel,Button,TextField,Switch,CardMedia,CardActionArea,CardContent} from '@mui/material'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function EditCourse(){
    const id = useParams('courseId');
    const [course,setCourse] = useState({});
    // Course state--Start
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [price, setPrice] = useState(0);
    const [published, setPublished] = useState(false);
    // Course state--End
    useEffect(()=>{
        fetch(`http://localhost:3000/admin/course/${id.courseId}`,{
            method: "GET",
            headers:{
                "token" : localStorage.getItem('token')
            }
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            if(data.course){
                setCourse(data.course)
                setTitle(data.course.title)
                setDescription(data.course.description)
                setPrice(data.course.price)
                setImgUrl(data.course.imgUrl)
                setPublished(data.course.published)
            }
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    return(
        <div>
            <div style={{backgroundColor:'#2c2b2b', display:'flex', justifyContent:'center', height:250}}>
                <Typography style={{color: 'white', marginTop:90}} variant='h2'>{title}</Typography>
            </div>
            <div style={{marginTop:-50, marginLeft:200, display:'flex'}}>
                <Card style={{width:500, height:400, padding:20}}>
                    <div>
                        <TextField value={title} onChange={(e)=>{setTitle(e.target.value)}} fullWidth id="outlined-basic" label="Title"></TextField>
                    </div>
                    <div style={{marginTop:15}}>
                        <TextField value={description} onChange={(e)=>{setDescription(e.target.value)}} fullWidth id="outlined-basic" label="Description" variant="outlined"></TextField>
                    </div>
                    <div style={{marginTop:15}}>
                        <TextField value={imgUrl} onChange={(e)=>{setImgUrl(e.target.value)}} fullWidth id="outlined-basic" label="Image link" variant="outlined"></TextField>
                    </div>
                    <div style={{marginTop:15}}>
                        <TextField value={price} onChange={(e)=>{setPrice(e.target.value)}} fullWidth id="outlined-basic" label="Price" variant="outlined"></TextField>
                    </div>
                    <div style={{marginTop:15}}>
                        <FormGroup>
                            <FormControlLabel checked={published} onClick={(e)=>{setPublished(e.target.checked)}} required control={<Switch />} label="Published" />
                        </FormGroup>
                    </div>
                    <div style={{display:'flex', justifyContent:'center', marginTop:20}}>
                        <Button size="medium" variant="contained" onClick={async ()=>{
                            const response = await fetch(`http://localhost:3000/admin/course/${course._id}`,{
                                method: "PUT",
                                body: JSON.stringify({
                                    title,
                                    description,
                                    price,
                                    imgUrl,
                                    published
                                }),
                                headers: {
                                    'Content-Type': 'application/json',
                                    'token': localStorage.getItem('token')
                                }
                            })

                            const data = await response.json();
                            alert(`${data.message}`)
                            setCourse(data.course)
                        }}>Update Course</Button>
                    </div>
                </Card>
                <Card style={{marginTop:-30, marginLeft:700, borderRadius:15, width:300, height:300}}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="140"
                        image={imgUrl}
                        alt={title}
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
                </Card>
            </div>
        </div>
    )
}

export default EditCourse;