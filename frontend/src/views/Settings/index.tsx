import authContext from '@src/context/auth-context'
import { DEACTIVATE_USER, DELETE_USER } from '@src/sexs/graphql/users'
import { gql } from '@src/utility/hooks/useAxiosInstance'
import React, { useContext } from 'react'
import { useHistory } from "react-router-dom"

function Settings() {
  const history = useHistory()
  const {logout} = useContext(authContext)

  const handleDelete = () => {
    gql(DELETE_USER)
    window.location.reload()
  }
  const handleDeactivate = () => {
    gql(DEACTIVATE_USER)
    window.location.reload()
  }

  return (
    <div className='w-100 h-100 p-2 d-flex flex-column alighn-items-center'>
        <h1 className="w-100 my-3">Settings</h1>
        <ul className="list-group border-0">
            <li onClick={() => history.push("/settings/hidden")} className="list-group-item cursor-pointer">Hidden Users</li>
            <li onClick={() => logout()} className="list-group-item cursor-pointer">Log Out</li>
            <li className="list-group-item cursor-pointer" onClick={() => handleDeactivate()}>Deativate Account</li>
            <li className="list-group-item cursor-pointer" onClick={() => handleDelete()}>Delete Account</li>
        </ul>
    </div>
  )
}

export default Settings