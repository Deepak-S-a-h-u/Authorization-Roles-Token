import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function NavBar() {
  const navigate=useNavigate();
  const[user,setUser]=useState();
  useEffect(()=>{
      let usr=localStorage.getItem("currentUser");
      if(usr)
      {
        setUser(usr);
      }
  },[]);
  const logout=()=>{
        localStorage.clear();
        navigate("/login");
  }
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
       <a class="nav-link" href="employee">Employee</a>
       {/* <Link className='nav-link' to='/employee'>Employee</Link> */}

     </li>
     <li class="nav-item active">
       {/* <a class="nav-link" href="designation">Designation</a>  */}
       <Link className='nav-link' to='/login'>Login</Link>

     </li>
   </ul>
   {user?(<div/>):(
      <Link to="/register" class="btn btn-outline-success my-2 my-sm-0">Register</Link>
    )
    }
    {user?
       (<a onClick={logout} className="btn btn-success">Logout</a>
       ):
       (
        <Link to="/login" class="btn btn-outline-success my-2 my-sm-0">Login</Link>
      )
    }
 </div>
   </nav>
    </div>
  )
}

export default NavBar