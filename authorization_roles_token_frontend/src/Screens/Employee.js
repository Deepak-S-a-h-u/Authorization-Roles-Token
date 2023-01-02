import React, { useEffect, useState } from 'react'
import axios from 'axios'
function Employee() {
  const [employee,SetEmployee]=useState()
 useEffect(()=>{
  GetAllEmployee();
 },[])

function GetAllEmployee()
{
  debugger
 axios.get("https://localhost:44395/api/Employee/").then((d) => {
  SetEmployee(d.data);
  console.log("setEMploy byapi data", d.data);
  // setEmployeeForm(employeeInit);
  //
});

}
  // function renderEmployees() {
  //   //   debugger;
  //  let emprows=[];
  //  employee?.map((item)=>{
  //   emprows.push
  //  })

  // }


  return (
    <div>
      <div className="row">
        <div className="col-10">
          <h2 className="text-primary text-left" >Employee List</h2>
        </div>
        <div className="col-2">
          <button
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#newModal"
            // onClick={() => }
          >
            New Employee
          </button>
        </div>
      </div>
      <div className="col-10 offset-1">
        <table class="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <td>EmployeeID</td>
              <th>Name</th>
              <th>Address</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* {renderEmployees()} */}
            
          </tbody>
        </table>
      </div>
      {/* save */}
      
      {/* save code ended */}
    </div>
  )
}

export default Employee