import { fileToDataUri } from '@src/utility/Utils'
import React, { useEffect, useState } from 'react'
import {Camera} from "react-feather"
import { Button } from 'reactstrap'

function Proof(props) {
    const {report, setReport} = props
    
    return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center flex-column" style={{gap: "1rem"}}>
            <h2>The user has been reported and will recieve a notification on their status. Thank You</h2>
            <h2>You can find more health information on the reported STD below.</h2>
        </div>
    )
}

export default Proof