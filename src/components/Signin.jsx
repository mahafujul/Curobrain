import React,{useState} from 'react'
import { TextField,Button,Card,Typography,Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";

function Signin(){
    // Here beow we are using recoil
    const setUser = useSetRecoilState(userState) //userSate is an atom
    // It's a setter function to the userState state variable/atom, as we are updating this variable after successfully login those components are subscribed to it will rerender. 
    // (Here in our case it will AppBar component) 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    return(
        <Box sx={{display:'flex', justifyContent:'center',paddingTop:{xs: '200px', md: '300px', lg: '200px', xl:'300px'}, height:'100vh'}}>
            <Card sx={{width:{lg:'400px',md:'400px',xs:'350px'}, height:{lg: '320px', md:'320px', xs:'300px'}, padding:'20px'}}>
                <Box sx={{display:'flex', justifyContent:'center',paddingTop:{lg:'15px',md:'15px'} }}>
                    <Typography sx={{fontWeight:'600', fontSize:{lg:'1.5rem',md:'1.5rem',xs:'1.3rem'}, lineHeight:{lg:'1.334', md:'1.334',xs:'2.334'}}} variant="h5">Welcome back, Please Sign In</Typography>
                </Box>
                <Box sx={{marginTop:{lg:'35px',md:'35px',xs:'15px'}}}>
                    <TextField onChange={(e)=>{setUsername(e.target.value)}} fullWidth={true} id="outlined-basic" label="Username" variant="outlined" />
                </Box>
                <Box sx={{marginTop:'20px'}}>
                    <TextField onChange={(e)=>{setPassword(e.target.value)}} fullWidth={true} id="outlined-basic" label="Password" variant="outlined" />
                </Box>
                <div style={{display:'flex', justifyContent:'center', marginTop:30}}>
                    <Button size="medium" variant="contained" onClick={()=>{
                        fetch(`${import.meta.env.VITE_BASE_URL}/admin/login`,{
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
        </Box>
    )
}

export default Signin;