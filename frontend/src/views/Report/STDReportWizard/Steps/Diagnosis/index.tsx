import SelectComponent from '@src/sexs/components/select'
import React, { useEffect, useState } from 'react'
import { Button } from "reactstrap"
import { gql } from "@hooks/useAxiosInstance"
import { STDS } from '@src/sexs/graphql/stds'

function Diagnosis(props) {
    const {report, setReport, nextStep} = props

    const [STDOptions, setSTDOptions] = useState(null)

    useEffect(() => {
        async function asyncEffect() {
            const {data: {stds}} : any = await gql(STDS)
            console.log(stds)
            setSTDOptions(stds.map(std => ({value: std.label, label: std.name})))
        }
        asyncEffect()
    }, [])

    return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center flex-column" style={{gap: "1rem"}}>
            <h2>Please Select your Diagnosis below</h2>
            <SelectComponent {...{options: STDOptions, onChange: (e) => setReport(report => ({...report, diagnosis: e.value}))}}/>
            <Button disabled={!report?.diagnosis} onClick={() => nextStep()}><span>Next</span></Button>
        </div>
    )
}

export default Diagnosis