import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Appbar from './components/Appbar'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Courses from './components/Courses'
function App() {
 
  return (
    <div style={{
      width:'100vw',
      height:'100vh',
      backgroundColor:'#eeeeee'}}>
      <Router>
        <Appbar/>
        <Routes>
          <Route path={'/'} element={<Signin/>}></Route>
          <Route path={'/signup'} element={<Signup/>}></Route>
          <Route path={'/courses'} element={<Courses/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
