import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Appbar, Signin, Signup, Courses, AddCourse, Course, Landing, EditCourse} from './components/index'

function App() {
 
  return (
    <div style={{
      width:'100vw',
      height:'100vh',
      backgroundColor:'#eeeeee'}}>
      <Router>
        <Appbar/>
        <Routes>
          <Route path={'/'} element={<Landing/>}></Route>
          <Route path={'/signup'} element={<Signup/>}></Route>
          <Route path={'/signin'} element={<Signin/>}></Route>
          <Route path={'/courses'} element={<Courses/>}></Route>
          <Route path={'/addCourse'} element={<AddCourse/>}></Route>
          <Route path={'/course/:courseId'} element={<EditCourse/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
