import React,{useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Appbar, Signin, Signup, Courses, AddCourse, Course, Landing, EditCourse} from './components/index'
import { RecoilRoot,useSetRecoilState } from 'recoil'
import { userState } from './store/atoms/user'
function App() {
 
  return (
    <div style={{
      width:'100vw',
      height:'100vh',
      backgroundColor:'#eeeeee'}}>
      <RecoilRoot>
        <Router>
          <Appbar/>
          <InitUser/>
          <Routes>
            <Route path={'/'} element={<Landing/>}></Route>
            <Route path={'/signup'} element={<Signup/>}></Route>
            <Route path={'/signin'} element={<Signin/>}></Route>
            <Route path={'/courses'} element={<Courses/>}></Route>
            <Route path={'/addCourse'} element={<AddCourse/>}></Route>
            <Route path={'/course/:courseId'} element={<EditCourse/>}></Route>
          </Routes>
        </Router>
      </RecoilRoot>
    </div>
  )
}

function InitUser(){
  const setUser = useSetRecoilState(userState) //Here userState is an atom
  useEffect(()=>{
    fetch('http://localhost:3000/me',{
      method:'GET',
      headers:{
        'token': localStorage.getItem('token')
      }
    }).then((res)=>{
      return res.json();
    }).then((data)=>{
      if(data.username){
        setUser({
          isLoading: false,
          userEmail: data.username
        })
      }else{
        setUser({
          isLoading: false,
          userEmail: null
        })
      }

    }).catch((err=>{
      setUser({
        isLoading: false,
        userEmail: null
      })
    }))
  },[])
}

export default App
