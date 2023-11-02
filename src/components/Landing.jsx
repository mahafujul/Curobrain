import React from 'react'
import { Typography,Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userEmailState } from '../store/selectors/userEmail';
function Landing(){
    const navigate = useNavigate()
    const username = useRecoilValue(userEmailState)
    if(username){
        return (
            <div style={{display:'flex', justifyContent:'center', width:'100vw'}}>
                <div style={{width:'50vw', marginLeft:100, marginTop:330,textAlign:'center'}}>
                    <div>
                        <Typography variant='h2'>Curobrain Admin</Typography>
                        <Typography style={{marginTop:-10}} variant='h5'>A place to learn, earn and grow</Typography>
                    </div>
                </div>
                <div style={{width:'50vw', display:'flex', justifyContent:'center', marginTop:150}}>
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/login-here-2161443-1815085.png" alt="" />
                </div>
            </div>
        )
    }
    return( 
        <div style={{display:'flex', justifyContent:'center', width:'100vw'}}>
            <div style={{width:'50vw', marginLeft:100, marginTop:300,textAlign:'center'}}>
                <div>
                    <Typography variant='h2'>Curobrain Admin</Typography>
                    <Typography style={{marginTop:-10}} variant='h5'>A place to learn, earn and grow</Typography>
                </div>
                <div style={{display:'flex',justifyContent:'center', gap:10, marginTop:30}}>
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
                </div>
            </div>
            <div style={{width:'50vw', display:'flex', justifyContent:'center', marginTop:150}}>
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/login-here-2161443-1815085.png" alt="" />
            </div>
        </div>
    )
}

export default Landing;