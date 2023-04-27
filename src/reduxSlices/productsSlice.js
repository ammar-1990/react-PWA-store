import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products:[],
    isLoading:true
}


const productsSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        setProducts:(state,action)=>{
            state.products=action.payload;
            state.isLoading=false
        },
     
        }
    }
)


export const {setProducts} = productsSlice.actions

export const getProducts=(state)=>state.products
export default productsSlice.reducer