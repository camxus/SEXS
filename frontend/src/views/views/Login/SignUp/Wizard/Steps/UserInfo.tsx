import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from "react"
import InputPasswordToggle from '@components/input-password-toggle'
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import AuthContext from '@src/context/auth-context';
import SelectComponent from '@src/sexs/components/select';

// import '@styles/base/pages/page-auth.scss'

// ^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$

const UserCredentials = (props) => {
  const {userData, setUserData, handleSubmit, setWizardIndex} = props

  const [pronouns, setPronouns] = useState([])

  const SEXES = [{value: "male", label: "Male"}, {value: "female", label: "Female"}]
  const GENDER = [{value: "man", label: "Man"}, {value: "woman", label: "Woman"}, {value: "non-conforming", label: "Non-conforming"}]
  const PRONOUNS = [{value: "he", label: "He"}, {value: "she", label: "She"}, {value: "they", label: "They"}]
  const FPRONOUNS = [{value: "him", label: "Him"}, {value: "her", label: "Her"}, {value: "them", label: "Them"}]
 
  const handleNext = async(e) => {
    e.preventDefault()
    props.nextStep()
  }

  const handlePronouns = (targetIndex, value) => {
    let index
    try {
      switch (targetIndex) {
        case 0:
          index = targetIndex
          break;
        case 1:
          index = targetIndex
          break;
        default:
          throw new Error('Invalid target');
      }
    } catch (e) {
      console.error(e.message)
    }
    setPronouns(pronouns => {
      pronouns[index] = value
      return pronouns
    })
  }

  useEffect(() => {
    setUserData(user => ({...user, attributes: {...user.attributes, pronouns: pronouns}}))
  }, [pronouns])

  const handleContinue = (e) => {
    if (userData.attributes.sex === "female") {
      setWizardIndex(1)
    }
    else {
      handleSubmit(e)
    }
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
            <CardText className='mb-2'>User Information</CardText>
            <Form className='auth-register-form mt-2' onSubmit={(e) => handleNext(e)}>
              <FormGroup>
                <Label className='form-label' for='first_name'>
                  First Name
                </Label>
                <Input onChange={(e) => setUserData(user => ({...user, attributes: {...user.attributes, name: {...user.attributes.name, first_name: e.target.value}}}))} type='text' id='first_name' placeholder='John' autoFocus />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='last_name'>
                  Last Name
                </Label>
                <Input onChange={(e) => setUserData(user => ({...user, attributes: {...user.attributes, name: {...user.attributes.name, last_name: e.target.value}}}))} type='text' id='last_name' placeholder='Doe' autoFocus />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='username'>
                  Username
                </Label>
                <Input onChange={(e) => setUserData(user => ({...user, attributes: {...user.attributes, username: e.target.value}}))} type='text' id='last_name' placeholder='Doe' autoFocus />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='sex'>
                  Sex
                </Label>
                <SelectComponent {...{options: SEXES}} onChange={e => setUserData(user => ({...user, attributes: {...user.attributes, sex: e.value}}))}/>
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='pronouns'>
                  Pronouns
                </Label>
                <SelectComponent {...{options: PRONOUNS}} onChange={e => handlePronouns(0, e.value)}/>
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='further_pronouns'>
                  Further Pronouns
                </Label>
                <SelectComponent {...{options: FPRONOUNS}} onChange={e => handlePronouns(1, e.value)}/>
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='birthdate'>
                  Birthdate
                </Label>
                <Input onChange={(e) => setUserData(user => ({...user, attributes: {...user.attributes, birthdate:  e.target.value}}))} type='date' id='birthdate' placeholder='DD/MM/YYYY' autoFocus />
              </FormGroup>
              <Button color='primary' block onClick={(e) => handleContinue(e)}>
                Sign Up
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
