import React,{ useState } from 'react';
import {Card,TextField,Button,Typography,Box} from '@mui/material/'

function Signup(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return(
        <Box sx={{display:'flex', justifyContent:'center',paddingTop:{xs: '200px', md: '300px', lg: '200px', xl: '300px'}, height: '100vh'}}>
            <Card sx={{width:{lg:'400px',md:'400px',xs:'350px'}, height:{lg: '320px', md:'320px', xs:'300px'}, padding:'20px'}}>
                <Box sx={{display:'flex', justifyContent:'center',paddingTop:{lg:'15px',md:'15px'} }}>
                    <Typography sx={{fontWeight:'600', fontSize:{lg:'1.5rem',md:'1.5rem',xs:'1.3rem'}, lineHeight:{lg:'1.334', md:'1.334',xs:'2.334'}}} variant="h5">Welcome back, Please Sign Up</Typography>
                </Box>
                <Box sx={{marginTop:{lg:'35px',md:'35px',xs:'15px'}}}>
                    <TextField onChange={(e)=>{setUsername(e.target.value)}} fullWidth={true} id="outlined-basic" label="Username" variant="outlined" />
                </Box>
                <Box sx={{marginTop:'20px'}}>
                    <TextField onChange={(e)=>{setPassword(e.target.value)}} fullWidth={true} id="outlined-basic" label="Password" variant="outlined" />
                </Box>
                <div style={{marginTop: 30, display:'flex', justifyContent:'center'}}>
                   <Button onClick={async ()=>{
                        try{
                            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/signup`,{
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
                    size='medium' variant="contained">SignUp</Button>
                </div>
            </Card>
        </Box>
    )
}

export default Signup;