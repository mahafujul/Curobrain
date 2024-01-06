import React,{useState,useEffect} from 'react'
import {Typography,Card,FormGroup, FormControlLabel,Button,TextField,Switch,CardMedia,CardActionArea,CardContent,Grid,Box} from '@mui/material'

import { useParams } from 'react-router-dom'
import { useSetRecoilState,useRecoilState,useRecoilValue } from 'recoil';

import { courseState } from '../store/atoms/course';
import { courseDescription, courseImg, courseIsLoading, courseTitle } from '../store/selectors/course';
import { useRef } from 'react';

function EditCourse(){
    const id = useParams('courseId');
    // const [course,setCourse] = useState({});
    const setCourse = useSetRecoilState(courseState);

    const isLoading = useRecoilValue(courseIsLoading)
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_BASE_URL}/admin/course/${id.courseId}`,{
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
        return(
            <></>
        )
    }

    return(
        <Box>
            <GrayTopper/>
            <Grid container spacing={2} sx={{marginTop:{xs:'100px', md:'0px', lg:'0px'}}}>
                <Grid sx={{display:'flex', justifyContent:'center', marginTop:{lg:'-40px',sm:'-160px', md:'-70px', xs:'-40px'}}} item xs={12} md={12} lg={6}>
                    <UpdateCard/>
                </Grid>
                <Grid sx={{display:'flex', justifyContent:'center', marginTop: {lg:'-60px',md:'-60px', xs:'-50px'}}} item xs={12} md={12} lg={6}>
                    <CourseCard/>
                </Grid>
            </Grid>
        </Box>
    )
}

function GrayTopper(){
    const title = useRecoilValue(courseTitle)
    return(
        <Box sx={{marginTop:{lg:'65px',sm:'57px'}, display:{xs:'none',sm:'block', lg:'block', md:'block'}}}>
            <Box sx={{backgroundColor:'#212121', display:'flex', justifyContent:'center', height:'250px', width:'100vw', padding:{lg:'100px',sm:'90px',md:'100px'}}}>
                <Typography sx={{color: 'white', fontWeight:'600', fontSize:{lg:'48px', sm:'35px'}}} variant='h3'>{title}</Typography>
            </Box>
        </Box>
    )
}

function UpdateCard(){
    const [courseDetails, setCourse] = useRecoilState(courseState)

    // Course state--Start
    const [title, setTitle] = useState(courseDetails.course.title)
    const [description, setDescription] = useState(courseDetails.course.description);
    const [imgUrl, setImgUrl] = useState(courseDetails.course.imgUrl);
    const [price, setPrice] = useState(courseDetails.course.price);
    const [published, setPublished] = useState(courseDetails.course.published);
    // Course state--End

    return(
        <Card sx={{width:'500px', height:'450px', padding:'20px', margin:{xs:'15px',sm:'0px', md:'0px', lg:'0px'}}}>
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
                    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/course/${courseDetails.course._id}`,{
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
        <Card style={{borderRadius:15, width:300, height:300}}>
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