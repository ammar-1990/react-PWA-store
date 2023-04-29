import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../reduxSlices/userSlice";
import productsSlice from "../reduxSlices/productsSlice";
import cartSlice from "../reduxSlices/cartSlice";
import productSlice from "../reduxSlices/productSlice";



export const store = configureStore({
    reducer :{
user:userSlice,
products:productsSlice,
cart:cartSlice,
product:productSlice
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})