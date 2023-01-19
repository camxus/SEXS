import React from 'react'
import { Button } from "reactstrap"
import { useHistory } from "react-router-dom"

function Report() {
    const history = useHistory()
    return (
        <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center" style={{ gap: "1rem" }}>
            <h2>We're sorry to hear about your incident</h2>
            <h2>What kind of incident would you like to report?</h2>
            <Button color="primary" onClick={() => history.push("/report/std-report")}>Positive STD Result</Button>
            <Button color="primary" onClick={() => history.push("/report/incident-report")}>Uncomfortable Situation</Button>
        </div>
    )
}

export default Report