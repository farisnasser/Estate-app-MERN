//This file defines a slice for the user state specficially for user auth
//it contains functions to update that state (reducers)
// it also contains the initial state of the user
// it also contains the actions that can be dispatched to update the state

import { createSlice } from "@reduxjs/toolkit";

const initialState = { //this is the initial state of the user, it is an object with 3 properties
    currentUser: null, //this is the current user, it is null because the user is not logged in 
    loading: false, //this is the loading state, it is false because the user is not loading
    error: null, //this is the error state, it is null because the user is not error
}

const userSlice = createSlice({
    name: "user",//slice name which prefixes the action types (e.g. user/signup)
    initialState, 
    reducers: {//these are functions that change the state when an action is dispatched
        signinStart: (state) => {
            state.loading = true;
        },
        signinSuccess: (state, action) => {
            state.currentUser = action.payload;//store the data passed in action.payload to the currentUser property
            state.loading = false;
            state.error = null;
        },
        signinFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const {signinStart, signinSuccess, signinFailure} = userSlice.actions;//this pulls the actions from the slice and exports them to be used in components
export default userSlice.reducer;//exports the reducer function to be used in the store