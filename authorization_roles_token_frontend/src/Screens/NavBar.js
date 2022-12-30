import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
 

 <div class="collapse navbar-collapse" id="navbarSupportedContent">
   <ul class="navbar-nav mr-auto">
     <li class="nav-item active">
       <Link className='nav-link' to='/home'>Home</Link>
     </li>
     <li class="nav-item active">
       {/* <a class="nav-link" href="department">Department</a> */}
       {/* <Link className='nav-link' to='/department'>Department</Link> */}
     </li>
     <li class="nav-item active">
       {/* <a class="nav-link" href="designation">Designation</a>  */}
       {/* <Link className='nav-link' to='/designation'>Designation</Link> */}

     </li>
     <li class="nav-item active">
       <a class="nav-link" href="employee">Employee</a>
       {/* <Link className='nav-link' to='/employee'>Employee</Link> */}

     </li>
     
   </ul>
   
 </div>
   </nav>
    </div>
  )
}

export default NavBar