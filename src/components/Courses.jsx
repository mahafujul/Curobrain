import React from "react";
import { useEffect,useState } from "react";
import { Grid } from "@mui/material";

import {Course} from '../components/index'


function Courses(){
    const [courses, setCourses] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:3000/admin/courses',{
            method: "GET",
            headers:{
                "token": localStorage.getItem('token')
            }
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            setCourses(data.courses) 
        })
    },[])
    return(
        <Grid style={{padding:30, display:'flex', paddingTop:'100px'}} container spacing={{ xs: 3, md: 3, lg:2 }} columns={{ xs: 2, sm: 8, md: 12, lg:12, xl:12}}>
            {
                courses.map((course)=>{
                    return(
                        <Grid item xs={2} sm={4} md={4} lg={3} xl={2} key={course._id}>
                            <Course imgUrl={course.imgUrl} title={course.title} description={course.description} price={course.price} id={course._id}/>
                        </Grid>
                    )
                })
            }
        </Grid>       
    )
}


export default Courses;