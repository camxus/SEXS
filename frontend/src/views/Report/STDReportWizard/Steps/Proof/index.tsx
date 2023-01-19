import { SUBMIT_STD_REPORT } from '@src/sexs/graphql/reports'
import { gql } from '@src/utility/hooks/useAxiosInstance'
import { fileToDataUri } from '@src/utility/Utils'
import React, { useEffect, useState } from 'react'
import {Camera} from "react-feather"
import { Button } from 'reactstrap'

function Proof(props) {
    const {report, setReport} = props
    const [image, setImage] = useState(null)

    useEffect(() => {
        const asyncEffect = async () => {
            const image64 = await fileToDataUri(image)
            setReport(report => ({...report, proof_image: image64}))
        }
        asyncEffect()
    }, [image])
    
    const handleSubmit = async() => {
        // ocr image verify
        try {
            await gql(SUBMIT_STD_REPORT, {diagnosis: report.diagnosis})
        } catch (e) {
            console.error(e)
        }
        props.nextStep()
    }
    
    return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center flex-column" style={{gap: "1rem"}}>
            <h2>Please upload Proof below</h2>
            <div className="rounded-circle bg-white d-flex justify-content-center align-items-center position-relative overflow-hidden" style={{height: "100px", width: "100px"}}>
                <Camera/>
                <input className='opacity-0 w-100 h-100 position-absolute cursor-pointer' type="file" accept="image/*" alt="" onChange={(e) => setImage(e.target.files[0])}></input>
            </div>
            {image && <img src={report.proof_image} alt="" style={{width: "90%"}}/>}
            <Button onClick={() => handleSubmit()}>Sumbit</Button>
        </div>
    )
}

export default Proof