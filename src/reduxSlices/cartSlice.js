import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart:[],
    isLoading:true
}


const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        setCart:(state,action)=>{
            state.cart=action.payload;
            state.isLoading=false
        },
     
        }
    }
)


export const {setCart} = cartSlice.actions

export const getCart=(state)=>state.cart
export const getCartTotal = (state)=>state.cart.cart.reduce((initial,el)=>initial + el.quantity,0)
export default cartSlice.reducer