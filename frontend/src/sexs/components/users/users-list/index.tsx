import { USER_BY_ID } from '@src/sexs/graphql/users'
import { gql } from '@src/utility/hooks/useAxiosInstance'
import React, { useEffect, useMemo, useState } from 'react'
import {Card, Button} from "reactstrap"

interface User {
  id
  image
  firstName
}

interface IUserList{
  users: User[]
  selectedUsers?: any[],
  onClick?: (e: any) => any
}

function UsersList({users, selectedUsers, onClick}: IUserList) {

  const userSelected = (user) => {
    return selectedUsers?.find(_user => _user.id === user.id)
  }

  return (
    <div className='w-100'>
      <div className="d-flex flex-column justify-content-center overflow-scroll" style={{ gap: "1rem", scrollSnapType: "x mandatory" }}>
        {users?.length > 0 && users.map(user => 
          user.firstName && (
            <Card 
            className={`p-1 w-100 mb-0 shadow-none ${onClick && "cursor-pointer"} ${userSelected(user) && "bg-primary"}`} 
            onClick={() => onClick(user)}
            >
              <div className="d-flex justify-content-between align-items-center p w-100">
                <div className="rounded-circle overflow-hidden" style={{ width: "30px", height: "30px"}}>
                  <img className="profile-picture h-100 w-100" style={{objectFit: "cover"}} src={user.image}/>
                </div>
                <h5 className={`${userSelected(user) && "text-white"} m-1 my-0`} style={{flex: "auto"}}>{user.firstName}</h5>
              </div>
            </Card>
          )
        )}
      </div>
    </div>
  )
}

export default UsersList