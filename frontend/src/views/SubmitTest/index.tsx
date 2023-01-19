import { SUBMIT_STD_REPORT, SUBMIT_TEST } from '@src/sexs/graphql/reports'
import { gql } from '@src/utility/hooks/useAxiosInstance'
import { fileToDataUri } from '@src/utility/Utils'
import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import { Camera } from "react-feather"
import { Button } from 'reactstrap'

function SubmitTest() {
    const history = useHistory()

    const [image, setImage] = useState(null)

    const handleUpload = async (image) => {
        setImage(await fileToDataUri(image))
    }
    
    const handleSubmit = async() => {
        // ocr image verify
        try {
            await gql(SUBMIT_TEST)
        } catch (e) {
            console.error(e)
        }
        history.back()
    }
    
    return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center flex-column" style={{gap: "1rem"}}>
            <h2>Please upload Proof with Date below</h2>
            <div className="rounded-circle bg-white d-flex justify-content-center align-items-center position-relative overflow-hidden" style={{height: "100px", width: "100px"}}>
                <Camera/>
                <input className='opacity-0 w-100 h-100 position-absolute cursor-pointer' type="file" accept="image/*" alt="" onChange={(e) => handleUpload(e.target.files[0])}></input>
            </div>
            {image && <img src={image} alt="" style={{width: "90%"}}/>}
            <Button onClick={() => handleSubmit()}>Sumbit</Button>
        </div>
    )
}

export default SubmitTest