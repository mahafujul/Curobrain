import React,{useState,useEffect} from 'react'
import {Typography,Card,FormGroup, FormControlLabel,Button,TextField,Switch,CardMedia,CardActionArea,CardContent} from '@mui/material'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { courseState } from '../store/atoms/course';
import { useRecoilValue } from 'recoil';
import { useRecoilState } from 'recoil';
import { courseDescription, courseImg, courseIsLoading, courseTitle } from '../store/selectors/course';

function EditCourse(){
    const id = useParams('courseId');
    // const [course,setCourse] = useState({});
    const setCourse = useSetRecoilState(courseState);

    const isLoading = useRecoilValue(courseIsLoading)
    useEffect(()=>{
        fetch(`http://localhost:3000/admin/course/${id.courseId}`,{
            methid: 'GET',
            headers:{
                'token': localStorage.getItem('token')
            }
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            if(data.course){
                setCourse({course: data.course, isLoading:false})
            }else{
                setCourse({course: {}, isLoading:false})
            }
        }).catch((err)=>{
            setCourse({course: {}, isLoading:false})
        })
    },[])

    if(isLoading){
        <div></div>
    }

    return(
        <div>
            <GrayTopper/>
            <div style={{marginTop:-50, marginLeft:200, display:'flex'}}>
                <UpdateCard/>
                <CourseCard/>
            </div>
        </div>
    )
}

function GrayTopper(){
    const title = useRecoilValue(courseTitle)
    return(
        <div>
            <div style={{backgroundColor:'#212121', display:'flex', justifyContent:'center', height:250, width:'100vw'}}>
                <Typography style={{color: 'white', marginTop:90, fontWeight:600}} variant='h3'>{title}</Typography>
            </div>
        </div>
    )
}

function UpdateCard(){
    const [courseDetails, setCourse] = useRecoilState(courseState)
    console.log(courseDetails.course)
    // Course state--Start
    const [title, setTitle] = useState(courseDetails.course.title)
    const [description, setDescription] = useState(courseDetails.course.description);
    const [imgUrl, setImgUrl] = useState(courseDetails.course.imgUrl);
    const [price, setPrice] = useState(courseDetails.course.price);
    const [published, setPublished] = useState(courseDetails.course.published);
    // Course state--End

    return(
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
                    const response = await fetch(`http://localhost:3000/admin/course/${courseDetails.course._id}`,{
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
                    const updatedCourse = {
                        _id: courseDetails.course._id,
                        title: title,
                        description: description,
                        price: price,
                        imgUrl: imgUrl,
                        published: published
                    }  
                    setCourse({course: updatedCourse, isLoading: false})
                    alert(`${data.message}`)
                }}>Update Course</Button>
            </div>
        </Card>
    )
}

function CourseCard(){
    const title = useRecoilValue(courseTitle);
    const description = useRecoilValue(courseDescription)
    const imgUrl = useRecoilValue(courseImg)
    return(
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
    )
}

export default EditCourse;