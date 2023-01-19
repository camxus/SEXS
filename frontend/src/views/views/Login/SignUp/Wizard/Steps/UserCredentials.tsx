import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from "react"
import InputPasswordToggle from '@components/input-password-toggle'
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import AuthContext from '@src/context/auth-context';

// import '@styles/base/pages/page-auth.scss'


const UserCredentials = (props) => {
  const {userData, setUserData} = props
 
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
            <CardText className='mb-2'>Create Account</CardText>
            <Form className='auth-register-form mt-2' onSubmit={(e) => handleNext(e)}>
              <FormGroup>
                <Label className='form-label' for='register-email'>
                  E-Mail
                </Label>
                <Input onChange={(e) => setUserData(user => ({...user, email: e.target.value}))} type='text' id='register-email' placeholder='johndoe' autoFocus />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-password'>
                  Password
                </Label>
                <InputPasswordToggle onInput={(e) => setUserData(user => ({...user, password: e.target.value}))} className='input-group-merge' id='register-password' />
              </FormGroup>
              <Button color='primary' block>
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
