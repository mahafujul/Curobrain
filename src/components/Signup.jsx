import React from 'react';
import {Card,TextField,Button,Typography} from '@mui/material/'
import { useState } from 'react';
function Signup(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return(
        <div style={{display:'flex',justifyContent:'center', marginTop:250}}>
            <Card style={{width:400,height:300,padding:20}}>
                <div style={{display:'flex', justifyContent:"center"}}> 
                    <Typography variant="h5">Welcome Back, Please Sign Up</Typography>
                </div>
                <div style={{marginTop:50}}>
                    <TextField onChange={(e)=>setUsername(e.target.value)} fullWidth id="outlined-basic" label="Username" variant="outlined" />
                </div>
                <div style={{marginTop:20}}></div>
                    <TextField onChange={(e)=> setPassword(e.target.value)} fullWidth id="outlined-basic" label="Password" variant="outlined" />
                <div style={{marginTop: 30, display:'flex', justifyContent:'center'}}>
                    <Button onClick={async ()=>{
                        try{
                            const response = await fetch('http://localhost:3000/admin/signup',{
                                method: "POST",
                                body: JSON.stringify({
                                    username,
                                    password
                                }),
                                headers:{
                                    'Content-Type': "application/json"
                                }
                            })
                            const data = await response.json();
                            alert(data.message)
                        }catch(err){
                            console.log(err)
                        }
                    }}
                    size='medium' variant="contained">Sign Up</Button>
                </div>
            </Card>
        </div>
    )
}

export default Signup;