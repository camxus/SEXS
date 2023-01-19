export const USER_BY_ID = `
    query ($ID: ID!) {
        userById (ID: $ID) {
            _id
            attributes {
                username
                name {
                    first_name
                    last_name
                }
                user_images
            }
            health {
                tested
                history {
                    std_id
                    release_date
                }
            }
        }
    }
`

export const DELETE_USER = `
    mutation deleteUser {
        deleteUser
    } 
`

export const DEACTIVATE_USER = `
    mutation deactivateUser {
        deactivateUser
    } 
`