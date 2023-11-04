import { TextField,Button,Card,Typography } from "@mui/material";
import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";

function Signin(){
    // Here beow we are using recoil
    const setUser = useSetRecoilState(userState) //userSate is an atom
    // It's a setter function to the userState variable, as we are updating this variable after successfully login those components are subscribed to it will rerender. 
    // (Here in our case it will AppBar component) 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    return(
        <div style={{display:'flex', justifyContent:'center',marginTop:250,}}>
            <Card style={{width:400, height:300, padding:20}}>
                <div style={{display:'flex', justifyContent:'center'}}>
                    <Typography variant="h5">Welcome back, Please Sign In</Typography>
                </div>
                <div style={{marginTop:50}}>
                        <TextField onChange={(e)=>{setUsername(e.target.value)}} fullWidth={true} id="outlined-basic" label="Username" variant="outlined" />
                </div>
                <div style={{marginTop:20}}>
                    <TextField onChange={(e)=>{setPassword(e.target.value)}} fullWidth={true} id="outlined-basic" label="Password" variant="outlined" />
                </div>
                <div style={{display:'flex', justifyContent:'center', marginTop:30}}>
                    <Button size="medium" variant="contained" onClick={()=>{
                        fetch('http://localhost:3000/admin/login',{
                            method: "POST",
                            body : JSON.stringify({
                                username,
                                password
                            }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then((res)=>{
                            return res.json();
                        }).then((data)=>{
                            localStorage.setItem('token', 'Bearer '+data.token);
                            setUser({userEmail: data.username, isLoading: false})
                            navigate('/courses')
                            // location.reload(); for using of recoil ***atom***/state variable now we do not have to reload our page manually to send a 'GET' request to show the appBar based on the condition.
                        })
                    }}>login</Button>
                </div>
            </Card>
        </div>
    )
}

export default Signin;