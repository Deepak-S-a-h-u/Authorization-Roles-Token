import React from 'react'
import Employee from './Employee/Employee'
import Admin from './Admin'
import Home from './Home'
import Login from './Login'
import NavBar from './NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function Routing() {
  return (
    <div>
         <BrowserRouter>
       <  NavBar/>
       <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/employee' element={<Employee/>}/>

       </Routes>
       </BrowserRouter>
    </div>
  )
}

export default Routing