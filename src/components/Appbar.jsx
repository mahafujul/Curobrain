import React from 'react';
import {Button,Typography,Box,IconButton,Drawer,Divider,ListItem,ListItemButton,ListItemIcon,ListItemText,List,CssBaseline,Toolbar } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import BackupTableIcon from '@mui/icons-material/BackupTable';

import { styled, useTheme } from '@mui/material/styles';

import {useNavigate} from 'react-router-dom';
import { useRecoilValue,useSetRecoilState } from 'recoil';

import { userState } from '../store/atoms/user';
import { userEmailState } from '../store/selectors/userEmail';


const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));
const AppBarr = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    }),
  }));


function Appbar(){
    const theme = useTheme();
    
    // ------------------
    // State variables.
    const [open, setOpen] = React.useState(false);
    const username = useRecoilValue(userEmailState)
    const setUsername = useSetRecoilState(userState)

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    
    const handleDrawerClose = () => {
      setOpen(false);
    };
    // ------------------
    

    const navigate = useNavigate();


    if(username){
        return(
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBarr position="fixed" open={open} sx={{backgroundColor:'#eeeeee', height:{lg: '65px', md:'65px', xs: '55px'}, color:'black'}}>
                    <Toolbar>
                        <Typography variant="h5" noWrap sx={{ flexGrow: 1,cursor:'pointer' }} component="div" onClick={()=>{navigate('/')}}>
                            Curobrain
                        </Typography>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerOpen}
                            sx={{ ...(open && { display: 'none' }),...(!open && { display: {lg:'none', md:'none'} }) }}
                        >
                        <MenuIcon/> 
                        </IconButton>
                        <Box sx={{display:{xs:'none', md:'flex',lg: 'flex'}}}>
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
                        </Box>
                    </Toolbar>
                </AppBarr>
                <Drawer
                    sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                }}
                    variant="persistent"
                    anchor="right"
                    open={open}
                >
                    <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        <Box sx={{display:'flex'}}>
                            <ListItemText primary={`${'\xa0'.repeat(5)} Hello, ${username}`} />
                        </Box>
                    </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={()=>{navigate('/addCourse')}}>
                                <ListItemIcon>
                                    <CastForEducationIcon/>
                                </ListItemIcon>
                                <ListItemText primary={'Add Course'} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={()=>{navigate('/Courses')}}>
                                <ListItemIcon>
                                    <BackupTableIcon/>
                                </ListItemIcon>
                                <ListItemText primary={'Courses'} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={()=>{
                                setUsername({userEmail:null, isLoading:false});
                                localStorage.removeItem('token')
                                navigate('/')
                            }}>
                                <ListItemIcon>
                                    <LogoutIcon/>
                                </ListItemIcon>
                                <ListItemText primary={'Logout'} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
            </Box>
        )
    }else{
        return(
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBarr position="fixed" open={open} sx={{backgroundColor:'#eeeeee', height:{lg: '65px', md:'65px', xs: '55px'}, color:'black'}}>
                    <Toolbar>
                        <Typography variant="h5" noWrap sx={{ flexGrow: 1,cursor:'pointer' }} component="div" onClick={()=>{navigate('/')}}>
                            Curobrain
                        </Typography>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerOpen}
                            sx={{ ...(open && { display: 'none' }),...(!open && { display: {lg:'none', md:'none'} }) }}
                        >
                        <MenuIcon/> 
                        </IconButton>
                        <Box sx={{display:{xs:'none', md:'flex',lg: 'flex'}}}>
                            <Button sx={{display: {xs: 'none', md: 'block', lg: 'block'}}} style={{marginRight:20}} variant="contained" onClick={()=>{navigate('/signin')}}>login</Button>
                            <Button sx={{display: {xs: 'none', md: 'block', lg: 'block'}}} variant="contained" onClick={()=>{navigate('/signup')}}>Signup</Button>
                        </Box>
                    </Toolbar>
                </AppBarr>
                <Drawer
                    sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                }}
                    variant="persistent"
                    anchor="right"
                    open={open}
                >
                    <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                    <ListItem disablePadding>
                            <ListItemButton onClick={()=>{navigate('/signin')}}>
                                <ListItemIcon>
                                    <LoginIcon/>
                                </ListItemIcon>
                                <ListItemText primary={'Login'} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={()=>{navigate('/signup')}}>
                                <ListItemIcon>
                                    <PersonAddIcon/>
                                </ListItemIcon>
                                <ListItemText primary={'Signup'} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                </Drawer>
            </Box>
        )
    }
}

export default Appbar;