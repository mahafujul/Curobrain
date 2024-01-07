import React from "react";
import { Box,Typography } from "@mui/material";

function Footer(){
    return(
        <Box sx={{backgroundColor: '#1976D2', height: '40px', width: '100vw', position: 'fixed', bottom: 0, display: {xs: 'none', sm: 'none',md: 'block', md: 'block', lg: 'block'}, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Typography variant='h6' sx={{fontSize:{xs: '20px', md: '30px', lg: '20px', color: 'white'}}}>© {new Date().getFullYear()} Curobrain.</Typography>
        </Box>
    )
}

export default Footer;