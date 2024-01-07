import React from 'react'
import { Typography,Button,Grid, Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userEmailState } from '../store/selectors/userEmail';
import Footer from './Footer';


function Landing(){
    const navigate = useNavigate()
    const username = useRecoilValue(userEmailState)
    if(username){
        return (
            <Grid container sx={{paddingTop:{md: '400px', xs: '140px', lg: '300px', xl: '400px'}, height: '100vh'}}>
                <Grid item xs={12} md={6} lg={6}>
                    <Box sx={{width:{lg: '50vw'}, marginLeft:{lg: '100px'}}}>
                        <Box sx={{textAlign:'center'}}>
                            <Typography variant='h2' sx={{fontSize:{xs: '45px', md: '60px', lg: '60px'}}}>Curobrain Admin</Typography>
                            <Typography sx={{fontSize:{xs: '20px',md: '24px', lg: '24px'}, marginTop:{sx:'40px', lg:'-10px'}}} variant='h5'>A place to learn, earn and grow</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Box sx={{width:{lg: '50vw'}, display:'flex', justifyContent:'center', marginTop:{lg: '-150px',md: '300px', xs: '40px'}}}>
                        <img className='heroImg' src="https://cdni.iconscout.com/illustration/premium/thumb/login-here-2161443-1815085.png" alt="" />
                    </Box>
                </Grid>
            </Grid>  
        )
    }
    return(
        <Grid container sx={{paddingTop:{md: '400px', xs: '140px', lg: '300px', xl: '400px'}, height: '100vh'}}>
            <Grid item xs={12} md={6} lg={6}>
                <Box sx={{width:{lg: '50vw'}, marginLeft:{lg: '100px'}}}>
                    <Box sx={{textAlign:'center'}}>
                        <Typography variant='h2' sx={{fontSize:{xs: '45px', md: '60px', lg: '60px'}}}>Curobrain Admin</Typography>
                        <Typography sx={{fontSize:{xs: '20px',md: '24px', lg: '24px'}, marginTop:{sx:'40px', lg:'-10px'}}} variant='h5'>A place to learn, earn and grow</Typography>
                    </Box>
                    <Box sx={{display:'flex',justifyContent:'center', gap:'10px', marginTop:{md: '15px',lg: '15px', xs: '20px'}, textAlign:'center'}}>
                        <div>
                            <Button onClick={()=>{
                                navigate('/signin')
                            }} variant="contained">Signin</Button>
                        </div>
                        <div>
                            <Button onClick={()=>{
                                navigate('/signup')
                            }} variant="contained">Signup</Button>
                        </div>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
                <Box sx={{width:{lg: '50vw'}, display:'flex', justifyContent:'center', marginTop:{lg: '-150px',md: '300px', xs: '40px'}}}>
                    <img className='heroImg' src="https://cdni.iconscout.com/illustration/premium/thumb/login-here-2161443-1815085.png" alt="" />
                </Box>
            </Grid>
        </Grid> 
    )   
}

export default Landing;