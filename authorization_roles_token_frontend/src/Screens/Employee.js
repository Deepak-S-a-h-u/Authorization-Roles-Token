import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
function Employee() {
  var initData={
    name:"",
    age:0,
    address:""
  }
  const [employees, SetEmployee] = useState();
  const [employeeForm, SetEmployeeForm] = useState({initData});
  useEffect(() => {
    GetAllEmployee();
  }, []);
  //debugger
  let token = localStorage.getItem("userToken");
  const Authorization = `Bearer ${token}`;

  const GetAllEmployee = () => {
    axios
      .get("https://localhost:44395/api/Employee", {
        headers: { Authorization: Authorization },
      })
      .then((d) => {
        SetEmployee(d.data);
        console.log("setEMploy byapi data", d.data);
        SetEmployeeForm(initData);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  function renderEmployees() {
    let employeeRows = [];
    employees?.map((item) => {
      employeeRows.push(
        <tr>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.address}</td>
          <td>{item.age}</td>
          <td>
            <button
              className="btn btn-info"
              data-toggle="modal"
              data-target="#editmodal"
              // onClick={() => editClick(item)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              data-dismiss="modal"
              // onClick={() => deleteClick(item._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return employeeRows;
  }

  const ChangeHandler=(event)=>{
    SetEmployeeForm({...employeeForm,[event.target.name]: event.target.value })
    console.log(employeeForm)
  }
  const saveClick = () => {
    axios
      .post("https://localhost:44395/api/Employee/", employeeForm,{
        headers: { Authorization: Authorization }
      })
      .then(() => {
        alert("Data Saved Successfully");
        GetAllEmployee();
      })
      .catch((e) => {
        alert("api DID not Working Properly");
      });
  };
  return (
    <div>
      <NavBar />
      <div className="row">
        <div className="col-10">
          <h2 className="text-primary text-left">Employee List</h2>
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
          <tbody>{renderEmployees()}</tbody>
        </table>
      </div>
      {/* save */}
      <form>
        <div className="modal" id="newModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* header */}
              <div className="modal-header">
                <div className="modal-title">New Employee</div>
                <button className="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>
              {/* body */}
              <div className="modal-body">
              <div className="form-group row">
                  <label for="depName" className="col-sm-4">
                    Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      onChange={ChangeHandler}
                       value={employeeForm.name}
                      className="form-control"
                      name="name"
                      type="text"
                      id="depName"
                      placeholder="Department Name"
                    ></input>
                  </div>
                </div><div className="form-group row">
                  <label for="Age" className="col-sm-4">
                    Age
                  </label>
                  <div className="col-sm-8">
                    <input
                      onChange={ChangeHandler}
                      value={employeeForm.age}
                      className="form-control"
                      name="age"
                      type="text"
                      id="Age"
                      placeholder="Age"
                    ></input>
                  </div>
                </div><div className="form-group row">
                  <label for="Address" className="col-sm-4">
                    Address
                  </label>
                  <div className="col-sm-8">
                    <input
                      onChange={ChangeHandler}
                      value={employeeForm.address}
                      className="form-control"
                      name="address"
                      type="text"
                      id="Address"
                      placeholder=" Address"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-success"
                  onClick={saveClick}
                  data-dismiss="modal"
                >
                  Save
                </button>
                <button className="btn btn-danger">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* save code ended */}
    </div>
  );
}

export default Employee;
