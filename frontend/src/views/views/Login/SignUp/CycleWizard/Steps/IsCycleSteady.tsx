import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from "react"
import InputPasswordToggle from '@components/input-password-toggle'
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import AuthContext from '@src/context/auth-context';
import SelectComponent from '@src/sexs/components/select';

// import '@styles/base/pages/page-auth.scss'


const UserCredentials = (props) => {
  const { cycleData, setCycleData } = props

  const CYCLE_STEADY = [
    { value: true, label: "Yes" },
    { value: false, label: "No" }
  ]
 
  const handleCycleSteady = (e) => {
    setCycleData(cycleData => {
      return {
        ...cycleData,
        steady: e.value
      }
    })
  }

  const handleNext = async(e) => {
    e.preventDefault()
    props.nextStep()
  }

  return (
    <div className='auth-wrapper auth-v1 px-2'>
      <div className='auth-inner py-2 d-flex flex-column justify-content-center'>
        <div className='mb-0'>
          <CardBody>
            <div className="position-relative d-flex justify-content-center">
              <div className="position-relative">
              {/* <Link className='brand-logo position-absolute d-flex justify-content-center bg-white p-1'
                  style={{top: "1rem", zIndex: 1000, height: "65px", borderRadius: "100px"}}
                  to='/'>
                  <img className='brand-text font-weight-bold m-0 h-100 mx-2' src={require("@src/assets/images/icons/bionary-logo.png")}/>
              </Link> */}
              </div>
            </div>
            {/* <CardTitle tag='h4' className='mb-1'>
                Just one step away from your healthier life
            </CardTitle> */}
            <CardText className='mb-2'>Is your cycle steady?</CardText>
            <Form className='auth-register-form mt-2' onSubmit={(e) => handleNext(e)}>
              <SelectComponent
                className="mb-1"
                options={CYCLE_STEADY}
                onChange={(e) => handleCycleSteady(e)}
              />
              <Button color='primary' block disabled={cycleData.steady === null || cycleData.steady === undefined}>
                Next
              </Button>
            </Form>
            <p className='text-center mt-2'>
              {/* <span className='mr-25'>Haben Sie schon ein konto?</span> */}
              {/* <Link to='/'>
                <span>Sign In</span>
              </Link> */}
            </p>
          </CardBody>
        </div>
      </div>
    </div>
  )
}

export default UserCredentials
