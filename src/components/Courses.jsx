import React from "react";
import { useEffect,useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

import {Course,Loading} from '../components/index'


function Courses(){
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true)
    console.log(import.meta.env.BASE_URL)
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_BASE_URL}/admin/courses`,{
            method: "GET",
            headers:{
                "token": localStorage.getItem('token')
            }
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            setCourses(data.courses);
            setLoading(false);
        })
    },[])

    if(loading){
        return(
            <Loading/>
        )
    }

    return(
        <Grid style={{padding:30, display:'flex', paddingTop:'100px'}} container spacing={{ xs: 3, md: 3, lg:2 }} columns={{ xs: 2, sm: 8, md: 12, lg:12, xl:12}}>
            {
                courses.length!==0? (courses.map((course)=>{
                                        return(
                                            <Grid item xs={2} sm={4} md={4} lg={3} xl={2} key={course._id}>
                                                <Course imgUrl={course.imgUrl} title={course.title} description={course.description} price={course.price} id={course._id}/>
                                            </Grid>
                                        )
                                    }))
                                    :
                                    (<Box sx={{width:'100vw', height: '100vh',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                        <Typography variant="h4" component="h2" sx={{color: '#1976D2'}}>
                                            No course present to show.
                                        </Typography>
                                    </Box>)
            }
        </Grid>       
    )
}


export default Courses;