/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { CardTitle, CardText, Form, FormGroup, Label, Input, Button, Col, Row } from 'reactstrap'
import '@styles/react/pages/page-authentication.scss'
import { useContext, useState } from "react"
import AuthContext from '@src/context/auth-context';

import { useSkin } from '@src/utility/hooks/useSkin'


import Spinner from '@src/@core/components/spinner/Fallback-spinner'
import ComponentSpinner from '@src/@core/components/spinner/Loading-spinner'
import { gql } from '@src/utility/hooks/useAxiosInstance'
import { LOGIN } from '@src/sexs/graphql/auth'

const LoginV1 = ({setAuthState}) => {

    const history = useHistory()
    const {skin} = useSkin()

    const context = useContext(AuthContext)

    const [userData, setUserData]:any = useState({})
    const [message, setMessage]:any = useState(null)
    const [session, setSession]:any = useState(null)
    const [user, setUser]:any = useState(null)
    const [error, serError]:any = useState(null)

    const [loading, setLoading] = useState(false)

    const submitHandler = async (e) => {
      e.preventDefault()
      const email = userData.username
      const password = userData.password
      
      setLoading(true)
      if (email.trim().length === 0 || password.trim().length === 0) {
        setLoading(false)
        return;
      }
      const variables = {email: email, password: password}
      gql(LOGIN, variables)
      .then(resData => {
        if (resData.data){
          if (resData.data.login.token) {
            context.login(
              resData.data.login.token,
              resData.data.login.userId,
              resData.data.login.tokenExpiration
            );
          }
        } else {
          throw new Error('User already exists');
        }
        window.location.reload()
      })
      .catch(err => {
        setLoading(false)
        serError(err.message)
        console.log(err);
      });
    }

    const userInputHandler = (e) => {
        e.preventDefault()
        const userInput = userData
        userInput[e.target.id] =  e.target.value
        setUserData(userData => userInput)
    }

  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Col className='d-flex position-relative align-items-center justify-content-center auth-bg px-2 p-lg-5 m-0' lg='4' sm='12'>
            {/* <Link className='brand-logo position-absolute d-flex justify-content-center bg-white p-1'
                style={{top: "1rem", zIndex: 1000, height: "65px", borderRadius: "100px"}}
                to='/' onClick={e => e.preventDefault()}>
                <img className='brand-text font-weight-bold m-0 h-100 mx-2' src={require("@src/assets/images/icons/bionary-logo.png")}/>
            </Link> */}
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              Welcome Back
            </CardTitle>
            {/* <CardText className='mb-2'>Bitte melden Sie sich an</CardText> */}
            {loading ? <ComponentSpinner/> : 
              <>
                <Form className='auth-login-form mt-2' onSubmit={(e) => submitHandler(e)}>
                  <FormGroup>
                    <Label className='form-label' for='login-email'>
                      Email
                    </Label>
                    <Input onInput={userInputHandler} type='email' id='username' placeholder='john@bionary.com' autoFocus />
                  </FormGroup>
                  <FormGroup>
                    <div className='d-flex justify-content-between'>
                      <Label className='form-label' for='login-password'>
                        Password
                      </Label>
                      {/* <Link to='/pages/forgot-password-v1'>
                        <small>Forgot Password?</small>
                      </Link> */}
                    </div>
                    <InputPasswordToggle onInput={userInputHandler} id='password' className='input-group-merge' invalid={error}/>
                  </FormGroup>
                  {error && <span style={{ color: `red` }}>{error} </span>}
                  {/* <FormGroup>
                    <Input onChange={userInputHandler} type='checkbox' className='custom-control-Primary me-1' id='remember-me' label='Remember Me' />
                    <Label className='form-label' for='login-password'>
                    Remember Me
                    </Label>
                  </FormGroup> */}
                  <Button type='submit' color='primary' block>
                    Sign in
                  </Button>
                </Form>
                <p className='text-center mt-2'>
                  {/* <span className='me-25'>Sind Sie neu hier?</span> */}
                  <Link onClick={() => setAuthState(authState =>({type: "signUp"}))}>
                    <span>Create an Account</span>
                  </Link>
                </p>
              </>
            }
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default LoginV1
