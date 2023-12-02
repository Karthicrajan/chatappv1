import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user:null
}
export const userAuthSlice = createSlice({
    name:"userAuth",
    initialState,
    reducers :{
        setUser:(state,action) =>{
            state.user = action.payload;
        },
        logoutUser:(state,action) =>{
            state.user = null;
            
        },
    }
})
export const { setUser,logoutUser } = userAuthSlice.actions;
export default userAuthSlice.reducer;