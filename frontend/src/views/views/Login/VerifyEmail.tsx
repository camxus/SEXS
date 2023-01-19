import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import InputPasswordToggle from '@src/@core/components/input-password-toggle'
import { Button, Card, CardBody, Form, FormGroup, Input } from 'reactstrap'

function VerifyEmail({user}) {
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [userInput, setUserInput] = useState({
        username: "",
        code: "",
        new_password: "",
        repeat_password: ""
    })
    
    const handleSubmit = async(e) => {   
        e.preventDefault()
    }

    useEffect(() => {
        localStorage.removeItem("userData")
    }, [])
    return (
        <div className="verify-email-containter d-flex justify-content-center align-items-center w-100 h-100">
            <Card>
                <CardBody>
                    <div className="header mb-1"> Geben Sie bitte ein neues Password ein: </div>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Input onChange={(e) => setUserInput(userInput =>({...userInput, username: e.target.value}))} type='text' placeholder='john@bionary.com' id='username'/>
                        </FormGroup>
                        {/* <FormGroup>
                            <Input onChange={(e) => setUserInput(userInput =>({...userInput, code: e.target.value}))} placeholder='Altes Kennwort' id='code'/>
                        </FormGroup> */}
                        <FormGroup>
                            <InputPasswordToggle onChange={(e) => setUserInput(userInput =>({...userInput, new_password: e.target.value}))} placeholder='Neues Kennwort' id='new-password'/>
                        </FormGroup>
                        <FormGroup>
                            <InputPasswordToggle onChange={(e) => setUserInput(userInput =>({...userInput, repeat_password: e.target.value}))} placeholder='Kennwort Wiederholen' id='repeat-password'/>
                        </FormGroup>
                        <Button disabled={loading} color='primary' type='submit'>Passwort festlegen</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default VerifyEmail