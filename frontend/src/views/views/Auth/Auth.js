import React, { Component, useContext, useState } from 'react';

import './Auth.css';
import authContext from '@src/context/auth-context';
import { Button, Input, Label } from 'reactstrap';

function AuthPage(){
  const [isLogin, setIsLogin] = useState(true)
  const [userData, setUserData] = useState({})
  const [error, setError] = useState("")

  const context = useContext(authContext)

  const emailEl = React.createRef();
  const passwordEl = React.createRef();

  const switchModeHandler = () => {
    setIsLogin(prevState => {
      return !prevState
    })
  }

  const submitHandler = event => {
    event.preventDefault();
    const email = userData.email
    const password = userData.password

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
          }
        }
      `,
      variables: {
        email: email,
        password: password
      }
    };

    if (!isLogin) {
      requestBody = {
        query: `
          mutation CreateUser($email: String!, $password: String!) {
            createUser(userInput: {email: $email, password: $password}) {
              _id
              email
            }
          }
        `,
        variables: {
          email: email,
          password: password
        }
      };
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
        setError(err)
        console.log(err);
      });
  };

  return (
    <div className="h-100 w-100 d-flex justify-content-center align-items-center">
      <form className="auth-form" onSubmit={(e) => submitHandler(e)}>
        <div className="form-control d-flex justify-content-between">
          <Label htmlFor="email">E-Mail</Label>
          <Input type="email" id="email" onChange={e => setUserData(userData => ({...userData, email: e.target.value}))} />
        </div>
        <div className="form-control d-flex justify-content-between">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" onChange={e => setUserData(userData => ({...userData, password: e.target.value}))} />
        </div>
        <div className="form-control d-flex justify-content-between">
          <Label htmlFor="sex">Sex</Label>
          <Input type="sex" id="sex" onChange={e => setUserData(userData => ({...userData, sex: e.target.value}))} />
        </div>
        <div className="form-actions d-flex justify-content-around m-50">
          <Button type="submit">Submit</Button>
          <Button type="button" onClick={() => switchModeHandler()}>
            {isLogin ? 'Signup' : 'Login'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AuthPage;
