import React from 'react';
import {Button,Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userEmailState } from '../store/selectors/userEmail';
import { useSetRecoilState } from 'recoil';
import { userState } from '../store/atoms/user';
import { isUserloadingState } from '../store/selectors/isUserLoading';

function Appbar(){
    //A react component which is nothing but a function should return a single element.
    // State variable.
    const username = useRecoilValue(userEmailState)
    const setUsername = useSetRecoilState(userState)
    const isLoading = useRecoilValue(isUserloadingState)

    const navigate = useNavigate();

    if(isLoading){
        return(
            <div></div>
        )
    }

    if(username){
        return(
            <div style={{display:'flex', justifyContent:'space-between',padding:10,zIndex:1}}>
                 <div style={{marginLeft:10,cursor:"pointer"}} onClick={()=>{navigate('/')}}>
                     <Typography variant='h5'>Curobrain</Typography>
                 </div>
                 <div>
                     <Button style={{marginRight:20}} variant="contained" disabled>{username}</Button>
                     <Button style={{marginRight:20}} variant="contained" onClick={()=>{
                         navigate('/addCourse');
                     }}>Add Course</Button>
                     <Button style={{marginRight:20}} variant="contained" onClick={()=>{
                         navigate('/courses');
                     }}>Courses</Button>
                     <Button variant="contained" onClick={()=>{
                         localStorage.removeItem('token')
                         setUsername({userEmail:null, isLoading:false});
                         navigate('/')
                     }}>Logout</Button>
                 </div>
            </div>
        )
    }else{
        return(
            <div style={{display:'flex',justifyContent:'space-between',padding:10,zIndex:1}}>
                <div style={{marginLeft:10,cursor:"pointer"}} onClick={()=>{navigate('/')}}>
                    <Typography variant='h5'>Curobrain</Typography>
                </div>
                <div>
                    <Button style={{marginRight:20}} variant="contained" onClick={()=>{navigate('/signin')}}>login</Button>
                    <Button variant="contained" onClick={()=>{navigate('/signup')}}>Signup</Button>
                </div>
            </div>
        )
    }
}

export default Appbar;