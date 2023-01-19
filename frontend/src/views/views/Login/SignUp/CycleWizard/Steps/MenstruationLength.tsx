import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from "react"
import InputPasswordToggle from '@components/input-password-toggle'
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import AuthContext from '@src/context/auth-context';
import SelectComponent from '@src/sexs/components/select';

// import '@styles/base/pages/page-auth.scss'


const UserCredentials = (props) => {
  const { cycleData, setCycleData } = props
  const [mensturationLength, setMensturationLength] = useState(0)
 
  useEffect(() => {
    setCycleData(cycleData => {
      return {
        ...cycleData,
        menstruation_data: {
          menstruation_length: mensturationLength
        }
      }
    })
  }, [mensturationLength])

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
              </div>
            </div>
            <CardText className='mb-2'>How long does your menstruation typically last?</CardText>
            <Form className='auth-register-form mt-2' onSubmit={(e) => handleNext(e)}>
              <div className="d-flex align-items-center justify-content-center mb-1" style={{gap: "1rem"}}>
                <Input autoFocus type="number" min="1" max="6" style={{width: "20%"}} onChange={e => setMensturationLength(menstruationLength => +e.target.value)}/>
                {mensturationLength === 1 ? <span>day</span> : <span>days</span>}
              </div>
              <Button color='primary' block disabled={cycleData.steady === null || cycleData.steady === undefined}>
                Next
              </Button>
            </Form>
          </CardBody>
        </div>
      </div>
    </div>
  )
}

export default UserCredentials
