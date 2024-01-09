import { Box, Typography } from "@mui/material";
function Loading(){
    return(
        <Box sx={{width:'100vw', height: '100vh',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Typography variant="h4" component="h2" sx={{color: '#1976D2'}}>
                Lodding....
            </Typography>
        </Box>

    )
}
export default Loading;