import React from "react";
import { useEffect,useState } from "react";

import { Grid,Paper } from "@mui/material";
import { styled } from '@mui/material/styles';

import {Course} from '../components/index'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

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
        <Grid style={{padding:30, display:'flex', justifyContent:'center'}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12, lg:12}}>
            {
                courses.map((course)=>{
                    return(
                        <Grid item xs={2} sm={4} md={3} lg={2} key={course._id}>
                            <Item style={{width:280, height:350}}>
                                <Course imgUrl={course.imgUrl} title={course.title} description={course.description} price={course.price} id={course._id}></Course>
                            </Item>   
                        </Grid>
                    )
                })
            }
        </Grid>       
    )
}



export default Courses;