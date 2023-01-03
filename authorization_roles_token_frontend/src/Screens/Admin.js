import React from 'react'
import NavBar from './NavBar';

function Admin() {
  return (
    <div>
      <  NavBar/>
      

<body>
    <form class="lform" action="#" method="post">

        <h1 id="lgn">Sign Up</h1>
        
        
        <hr id="h-r"/>
        
        <input type="text" placeholder="Creat Username" required/>
      <input type="email" placeholder="Enter Your Mail" required/>

        <input id="pswrd2" type="password" placeholder="Creat Password" required/>
        <p id="checkbx"><input id="checkb2" type="checkbox" onclick="myFunction2()"/>Show Password</p>
       
        <input id="pswrd" type="password" placeholder="Re-Enter Password" required/>
       
        <p id="checkbx"><input id="checkb" type="checkbox" onclick="myFunction()"/>Show Password</p>
        <input type="submit" value="Sign Up"/>
       
       
    </form>
</body>

      
    </div>
  )
}

export default Admin