import React from 'react'

function CompactCalendar() {
  return (
    <div className="d-flex justify-content-center align-items-center m-1" style={{ gap: "2rem"}}>
        <div className="rounded-circle bg-dark text-white d-flex justify-content-center align-items-center" style={{height: "30px", width: "30px"}}>
            10
        </div>
        <div className="rounded-circle bg-dark text-white d-flex justify-content-center align-items-center" style={{height: "30px", width: "30px"}}>
            11
        </div>
        <div className="rounded-circle bg-dark text-white d-flex justify-content-center align-items-center" style={{height: "30px", width: "30px"}}>
            12
        </div>
        <div className="rounded-circle bg-dark text-white d-flex justify-content-center align-items-center" style={{height: "30px", width: "30px"}}>
            13
        </div>
        <div className="rounded-circle bg-dark text-white d-flex justify-content-center align-items-center" style={{height: "38px", width: "38px"}}>
            14
        </div>
        <div className="rounded-circle bg-dark text-white d-flex justify-content-center align-items-center" style={{height: "30px", width: "30px"}}>
            15
        </div>
        <div className="rounded-circle bg-dark text-white d-flex justify-content-center align-items-center" style={{height: "30px", width: "30px"}}>
            16
        </div>
    </div>
  )
}

export default CompactCalendar