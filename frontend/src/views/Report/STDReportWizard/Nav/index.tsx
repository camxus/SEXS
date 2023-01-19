import React from 'react'
import { Button, Progress } from "reactstrap"
import { ChevronLeft } from "react-feather"
import { useHistory } from "react-router-dom"

function Nav(props) {
  const {currentStep, totalSteps} = props
  const history = useHistory()
  const handleBackPress = () => {
    console.log(currentStep)
    if (currentStep === 1) {
      history.push("/report")
      return
    }
    props.previousStep()
  }
  
  return (
    <div className="position-fixed w-100 d-flex justify-content-around align-items-center px-1" style={{top: 0}}>
      <Button
        onClick={() => handleBackPress()}
        className="d-flex justify-content-center align-items-center" color="transparent">
          <ChevronLeft className="position-absolute" style={{left: "0.5rem"}}/>
          <span>Back</span>
      </Button>
      <Progress color="black" className="w-100" style={{height: "3px"}} value={((currentStep - 1) / totalSteps) * 100}/>
    </div>
  )
}

export default Nav