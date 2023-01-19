export const SET_CAN_SEE = `
    mutation setCanSee($partnerId: ID!) {
        setCanSee(partnerId: $partnerId) {
            userId
            can_see {
                cycle
                health_status
            }
        }
    }
`