import React,{useState} from 'react';
import { Card,TextField,Button,FormGroup,FormControlLabel,Switch,Box } from '@mui/material';


function AddCourse(){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [price, setPrice] = useState(0);
    const [published, setPublished] = useState(false);

    const submitHandler = async ()=> {
        const response = await fetch('http://localhost:3000/admin/course',{
            method: "POST",
            body: JSON.stringify({
                title,
                description,
                imgUrl,
                price,
                published
            }),
            headers: {
                'Content-Type': 'application/json',
                "token": localStorage.getItem('token')
            }
        })
        const data = await response.json();
        alert(data.message)
    }

    return(
        <Box sx={{display:'flex', justifyContent:'center', marginTop:{xs:'100px', sm:'200px', md:'200px', lg:'200px'}, padding:'20px'}}>
            <Card style={{width:'500px', height:'450px',padding:'20px'}}>
                <div>
                    <TextField onChange={(e)=>{setTitle(e.target.value)}} fullWidth id="outlined-basic" label="Title" variant="outlined"></TextField>
                </div>
                <div style={{marginTop:15}}>
                    <TextField onChange={(e)=>{setDescription(e.target.value)}} fullWidth id="outlined-basic" label="Description" variant="outlined"></TextField>
                </div>
                <div style={{marginTop:15}}>
                    <TextField onChange={(e)=>{setImgUrl(e.target.value)}} fullWidth id="outlined-basic" label="Image link" variant="outlined"></TextField>
                </div>
                <div style={{marginTop:15}}>
                    <TextField onChange={(e)=>{setPrice(e.target.value)}} fullWidth id="outlined-basic" label="Price" variant="outlined"></TextField>
                </div>
                <div style={{marginTop:15}}>
                    <FormGroup>
                        <FormControlLabel onClick={(e)=>{setPublished(e.target.checked)}} required control={<Switch />} label="Published" />
                    </FormGroup>
                </div>
                <div style={{display:'flex', justifyContent:'center', marginTop:20}}>
                    <Button onClick={submitHandler} size="medium" variant="contained">Add Course</Button>
                </div>
            </Card>
        </Box>
    )
}

export default AddCourse;