export const SUBMIT_STD_REPORT = `
    mutation submitSTDReport($diagnosis: String!) {
        submitSTDReport(diagnosis: $diagnosis)
    } 
`

export const SUBMIT_INCIDENT_REPORT = `
    mutation submitIncidentReport($userId: ID!) {
        submitIncidentReport(userId: $userId)
    } 
`

export const SUBMIT_TEST = `
    mutation submitTest{
        submitTest
    }
`