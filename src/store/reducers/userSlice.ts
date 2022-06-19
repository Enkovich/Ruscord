import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IData } from "../../models/IData";
import { fetchUser } from "../actions/userAction";

const initialState:IData = {
    statusReg: null
} 

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUser.fulfilled.type]: (state, action: PayloadAction<IData>) => {   
            state.dataUser = action.payload.dataUser
            state.dataError = action.payload.dataError 
            state.statusReg = action.payload.statusReg
            state.statusAuth = action.payload.statusAuth
        },
        [fetchUser.rejected.type]: (state, action: PayloadAction<IData>) => {
            state.dataError = action.payload.dataError
            state.statusReg = false
        }
    }
})

export default userSlice.reducer;