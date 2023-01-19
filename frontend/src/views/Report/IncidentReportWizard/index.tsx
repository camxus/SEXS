import React, {useState} from 'react'
import StepWizard from "react-step-wizard";
import UserSelect from "./Steps/UserSelect"
import Final from "./Steps/Final"
import Nav from "./Nav"

function STDReportWizard() {
    const [report, setReport] = useState({
        diagnosis: "",
        proof_image: null
    })

    return (
            <StepWizard
                className="w-100 h-100 d-flex justify-content-center align-items-center flex-column overflow-hidden"
                nav={<Nav/>}
            >
                <UserSelect {...{report, setReport}}/>
                <Final {...{report, setReport}}/>
            </StepWizard>
    )
}

export default STDReportWizard