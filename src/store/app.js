import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../reduxSlices/userSlice";
import productsSlice from "../reduxSlices/productsSlice";


export const store = configureStore({
    reducer :{
user:userSlice,
products:productsSlice
    }
})