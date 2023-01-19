import React, {useState} from 'react'
import StepWizard from "react-step-wizard";
import Diagnosis from "./Steps/Diagnosis"
import Proof from "./Steps/Proof"
import Nav from "./Nav"
import Submitted from './Steps/Submitted';

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
                <Diagnosis {...{report, setReport}}/>
                <Proof {...{report, setReport}}/>
                <Submitted {...{report, setReport}}/>
            </StepWizard>
    )
}

export default STDReportWizard