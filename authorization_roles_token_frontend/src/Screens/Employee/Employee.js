import React from 'react'
import DisplayEmployee from './DisplayEmployee'

function Employee() {
  var x=23;
  return (
    <div>
      <h1>
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
      </h1>
      <DisplayEmployee x/>
    </div>
  )
}

export default Employee