import React from 'react'
import {Camera} from "react-feather"

function Proof(props) {
    const {report, setReport} = props
    return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center flex-column" style={{gap: "1rem"}}>
            <h2 className="text-center">Your report has been added to the user. Their Account will be hidden from your partner list.</h2>
        </div>
    )
}

export default Proof