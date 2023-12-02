import { configureStore } from '@reduxjs/toolkit'
import userAuthSlice from './features/userAuth/userAuthSlice'
import chatSlice from './features/userAuth/chat'
export const store = configureStore({
    reducer:{
        userAuth: userAuthSlice,
        chat: chatSlice
    }
})