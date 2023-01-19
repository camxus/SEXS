import UsersList from '@src/sexs/components/users/users-list'
import React from 'react'
import { useSelector } from 'react-redux'

function Settings_HiddenUsers() {
  const { me } = useSelector((state: any) => state.User)
  const hiddenUsers = me.partners?.filter(partner => partner.hidden?.value === true)

  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center p-3">
        {hiddenUsers ? <UsersList {...{users: hiddenUsers}}/> : <p>No hidden Users</p>}
    </div>
  )
}

export default Settings_HiddenUsers