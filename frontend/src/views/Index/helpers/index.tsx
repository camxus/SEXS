import axios from "axios";
import { axiosInstance } from "@hooks/useAxiosInstance"
import { removePartnerByID } from "@src/redux/User/User";

export const queryMe = async() => {
    let requestBody = {
        query: `
            query {
                me {
                    _id
                    attributes {
                        username
                        verified
                        user_images
                        name {
                            first_name
                            last_name
                        }
                        age
                        gender
                        sex
                        pronouns
                    }
                    partners {
                        userId
                        request {
                            status
                        }
                        hidden {
                            value
                        }
                        blocked {
                            value
                        }
                        can_see {
                            cycle
                            health_status
                        }
                    }
                    violations {
                        userId
                    }
                    health {
                        tested
                        history {
                            std_id
                        }
                    }
                    deactivated
                }
            }
        `
    };

    try {
        const res = await axiosInstance.post('', JSON.stringify(requestBody))
        const {data: {data: {me}}} = res

        if (res.status !== 200 && res.status !== 201) {
            throw new Error('Failed!')
        }
        return me
    } catch (e) {
        console.log(e)
    }
}

export const queryPartner = async(userId) => {
    let requestBody = {
        query: `
            query ($userId: ID){
                user (userId: $userId){
                    _id
                    username
                    name
                    user_images
                    violations {
                        userId
                    }
                    health {
                        tested
                        history {
                            release_date
                        }
                    }
                    deactivated
                }
            }
        `,
        variables: {
            userId: userId,
        }
    }

    try {
        const res = await axiosInstance.post('', JSON.stringify(requestBody))
        const {data: {data: {user}}} = res

        if (res.status !== 200 && res.status !== 201) {
            throw new Error('Failed!')
        }
        return user
    } catch (e) {
        console.log(e)
    }
}

export const queryUser = async(username) => {
    let requestBody = {
        query: `
            query ($username: String){
                user (username: $username){
                    _id
                    attributes {
                        username
                        verified
                        user_images
                        name {
                            first_name
                            last_name
                        }
                        age
                        gender
                        sex
                        pronouns
                    }
                    partners {
                        userId
                        request {
                            status
                        }
                        can_see {
                            cycle
                            health_status
                        }
                    }
                    violations {
                        userId
                    }
                    health {
                        tested
                        history {
                            release_date
                        }
                    }
                    deactivated
                }
            }
        `,
        variables: {
            username: username,
        }
    };

    try {
        const res = await axiosInstance.post('', JSON.stringify(requestBody))
        const {data: {data: {user}}} = res

        if (res.status !== 200 && res.status !== 201) {
            throw new Error('Failed!')
        }
        return user
    } catch (e) {
        console.log(e)
    }
}


export const handlePartnersAddRemove = async(dispatch, id, action: "add" | "remove", setPartnerStatus) => {
    const userId = id

    let requestBody
    if (action === "add") {
      requestBody = {
        query: `
            mutation addPartner($partnerId: ID!) {
                addPartner(partnerId: $partnerId) {
                    _id
                    partners {
                        userId
                        request { 
                            status
                        }
                    }
                }
            } 
        `,
        variables: {
            partnerId: userId,
        }
      };
    } else if (action === "remove") {
      requestBody = {
        query: `
            mutation removePartner($partnerId: ID!) {
                removePartner(partnerId: $partnerId) {
                    _id
                    partners {
                        userId
                        request { 
                            status
                        }
                    }
                }
            } 
        `,
        variables: {
            partnerId: userId,
        }
      }
    } else { return }

    try {
      const res = await axiosInstance.post('', JSON.stringify(requestBody))
      const {data: {data}} = res

      let resultUser
      if (data.addPartner) resultUser = data.addPartner
      if (data.removePartner) resultUser = data.removePartner

      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!')
      }

      const partner = resultUser.partners.find(partner => partner.userId === userId)
      if (action === "remove") dispatch(removePartnerByID(partner.userId))
      setPartnerStatus(partnerStatus => partner.request?.status)
    } catch (e) {
      console.error(e)
    }
  }