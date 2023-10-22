import React from 'react';
import { useState,useEffect } from 'react';
import {Button,Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
function Appbar(){
    //A react component which is nothing but a function should return a single element.
    // State variable.
    const [username, setUsername] = useState("");
    useEffect(()=>{
        fetch('http://localhost:3000/me',{
            method: 'GET',
            headers: {
                'token': localStorage.getItem('token')
            }
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            setUsername(data.username);
        })
    },[]);

    const navigate = useNavigate();

    if(username){
        return(
           <div style={{display:'flex', justifyContent:'space-between',padding:10,zIndex:1}}>
                <div style={{marginLeft:10,cursor:"pointer"}} onClick={()=>{navigate('/')}}>
                    <Typography variant='h6'>Curobrain</Typography>
                </div>
                <div>
                    <Button style={{marginRight:20}} variant="contained" disabled>{username}</Button>
                    <Button style={{marginRight:20}} variant="contained">Add Course</Button>
                    <Button style={{marginRight:20}} variant="contained" onClick={()=>{
                        navigate('/courses');
                    }}>Courses</Button>
                    <Button variant="contained" onClick={()=>{
                        localStorage.removeItem('token')
                        setUsername('');
                    }}>Logout</Button>
                </div>
           </div>
        )
    }else{
        return(
            <div style={{display:'flex',justifyContent:'space-between',padding:10,zIndex:1}}>
                <div style={{marginLeft:10,cursor:"pointer"}} onClick={()=>{navigate('/')}}>
                    <Typography variant='h6'>Curobrain</Typography>
                </div>
                <div>
                    <Button style={{marginRight:20}} variant="contained" onClick={()=>{location='/'}}>login</Button>
                    <Button variant="contained" onClick={()=>{location='/signup'}}>Signup</Button>
                </div>
            </div>
        )
    }
}

export default Appbar;