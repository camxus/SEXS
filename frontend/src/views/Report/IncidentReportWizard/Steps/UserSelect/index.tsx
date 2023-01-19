import React, { useState } from 'react'
import { Button } from "reactstrap"
import UsersList from "@src/sexs/components/users/users-list"
import { useSelector } from 'react-redux'
import { gql } from '@src/utility/hooks/useAxiosInstance'
import { SUBMIT_INCIDENT_REPORT } from '@src/sexs/graphql/reports'

function Diagnosis(props) {
    const {report, setReport, nextStep} = props

    const [selectedUsers, setSelectedUsers] = useState([])

    const { me } = useSelector((state: any) => state.User)
    const { myPartners } = useSelector((state: any) => state.User)

    const userList = myPartners.map(partner => ({
        firstName: partner.attributes.name.first_name,
        image: partner.attributes.user_images[0],
        id: partner._id
    }))

    const handleSubmit = async () => {
        try {
            await Promise.all(selectedUsers.map(async user => {
                await gql(SUBMIT_INCIDENT_REPORT, {userId: user._id})
            }))
            nextStep()
        } catch (e) {
            console.warn(e.message)
        }
    }

    const handleSelectedUser = (user) => {
        const userSelected = selectedUsers?.find(_user => _user.id === user.id)
        if (userSelected) setSelectedUsers(selectedUsers => selectedUsers.map(_user => _user.id !== user.id ))
        if (!userSelected) setSelectedUsers(selectedUsers => [...selectedUsers, user])
    }

    return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center flex-column" style={{gap: "1rem"}}>
            <h2>Please choose the User below</h2>
            <UsersList {...{selectedUsers, users: userList, onClick: handleSelectedUser}}/>
            <Button onClick={() => handleSubmit}><span>Submit</span></Button>
        </div>
    )
}

export default Diagnosis