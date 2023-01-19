import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { USER_BY_ID } from "@src/sexs/graphql/users"
import { gql } from "@src/utility/hooks/useAxiosInstance"
import { queryMe } from "@src/views/Index/helpers"

type IState = {
    me: { 
        partners: any[]
    },
    myPartners: any[]
}
const initialState = {
    me: {},
    myPartners: []
}

export const LabelingPageSlice = createSlice({
    name: "labeling_page",
    initialState,
    reducers: {
        removePartnerByID: (state: IState, action) => {
            state.me = {
                ...state.me,
                partners: state.me.partners.map(partner => partner.userId !==  action.payload)
            }
            state.myPartners = state.myPartners.map(partner => partner._id !== action.payload)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getMe.fulfilled, (state: any, action: any) => {
            // Add documents to the state knowledgebases.
            state.me = action.payload.me
            state.myPartners = action.payload.myPartners
        })
    }
})

export const { removePartnerByID } = LabelingPageSlice.actions

export default LabelingPageSlice.reducer
  

// async thunk -- side effects
export const getMe = createAsyncThunk("me", async () => {
    const me: any = await queryMe()
    const myPartners = await Promise.all(me.partners?.map(async partner => {
        try {
            if (partner?.userId) return (await gql(USER_BY_ID, {ID: partner.userId})).data.userById
        } catch (e) {
            console.warn(e.message)
        }
    }))
    return {me, myPartners}
})