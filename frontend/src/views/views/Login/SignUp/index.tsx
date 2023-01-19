import authContext from '@src/context/auth-context'
import React, { useContext, useEffect, useState } from 'react'
import StepWizard from 'react-step-wizard'
import Nav from './Wizard/Nav'
import UserCredentials from './Wizard/Steps/UserCredentials'
import UserInfo from './Wizard/Steps/UserInfo'
import UserImage from './Wizard/Steps/UserImage'
import IsCycleSteady from './CycleWizard/Steps/IsCycleSteady'
import PeriodSelect from './CycleWizard/Steps/PeriodSelect'
import MenstruationLength from './CycleWizard/Steps/MenstruationLength'
import { calcCycleData } from './CycleWizard/Steps/helpers'

function SignUp() {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        attributes: {
          birthdate: new Date(),
          name: {
            first_name: "",
            last_name: "",
          },
          gender: "",
          pronouns: ["", ""],
          user_images: [],
          verified: false
        }
    })
    
    const [cycleData, setCycleData] = useState(
        {
            cycle_data: {
                steady: null,
                cycle_length: null
            },
            menstruation_data: {
                menstruation_length: null
            },
            cycles: []
        }
    )
    
    const context = useContext(authContext)

    const [error, serError]:any = useState(null)
    const [wizardIndex, setWizardIndex] = useState(0)


    async function signUp() {
        const email = userData.email
        const password = userData.password

        if (email.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        let requestBody = {
            query: `
            mutation CreateUser(
                $email: String!,
                $password: String!
                $attributes: AttributesInput
                ) {
                createUser(userInput: {
                email: $email,
                password: $password,
                attributes: $attributes
                }) {
                _id
                email
                }
            }
            `,
            variables: {
            email: email,
            password: password,
            // birthdate: userData.birthdate,
            // sex: userData.sex,
            // gender: userData.gender,
            // pronouns: userData.pronouns,
            // user_images: userData.user_images
            // name: userData.name
            attributes: userData.attributes
            }
        }
        fetch('http://localhost:8000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
            throw new Error('Failed!');
            }
            console.log("return", res)
            return res.json();
        })
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
        })
        .catch(err => {
            serError(err)
            console.log(err);
        });
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        await signUp()
        window.location.reload()
    }
    useEffect(() => {
        localStorage.removeItem("userData")
    }, [])

    useEffect(() => {
        console.log("userData:", userData)
    }, [userData])
    useEffect(() => {
        const asyncEffect = async () => {
            console.log("cycleData: \n", cycleData)
            console.log("cycleData: \n", await calcCycleData({cycle: {...cycleData}}))
        }
        asyncEffect()
    }, [cycleData])
 
    return (
        <>
            {wizardIndex === 0 &&
                <StepWizard
                    className="w-100 h-100 d-flex justify-content-center align-items-center flex-column overflow-hidden"
                    nav={<Nav/>}
                    >
                    <UserCredentials {...{setUserData}}/>
                    <UserImage {...{setUserData}}/>
                    <UserInfo {...{userData, setUserData, handleSubmit, setWizardIndex}}/>
                </StepWizard>
            }
            {wizardIndex === 1 &&
                <StepWizard
                    className="w-100 h-100 d-flex justify-content-center align-items-center flex-column overflow-hidden"
                    nav={<Nav/>}
                    >
                    <IsCycleSteady {...{cycleData, setCycleData}}/>
                    <MenstruationLength {...{cycleData, setCycleData}}/>
                    <PeriodSelect {...{cycleData, setCycleData}}/>
                </StepWizard>
            }
        </>
    )
}

export default SignUp