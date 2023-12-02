import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    chatrooms : null,
    currentchat : null,
    messageSlt : null,
    searchResult : null,
    showSide : true
}
export const chatSlice = createSlice({
    name:"chat",
    initialState,
    reducers :{
        setchatrooms : (state,action)=>{
            state.chatrooms = action.payload
        },
        setcurrentChat : (state,action) =>{
            state.currentchat = action.payload
        },
        setsltmessage : (state,action) =>{
            state.messageSlt = action.payload
        },
        setSearchResult : (state,action) =>{
            state.searchResult = action.payload
        },
        setShow :(state,action) => {
            state.showSide = action.payload
        }
    }
});

export const {setchatrooms, setcurrentChat, setsltmessage, setSearchResult, setShow} = chatSlice.actions;
export default chatSlice.reducer;