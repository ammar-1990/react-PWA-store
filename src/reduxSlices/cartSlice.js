import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart:[],
    isLoading:true,
    error:null,
}


const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        setCart:(state,action)=>{
            state.cart=action.payload;
         
        },
        setCartLoading:(state,action)=>{
            state.isLoading=action.payload
        },

        
     
        }
    }
)


export const {setCart, setCartLoading} = cartSlice.actions

export const getCart=(state)=>state.cart
export const getCartTotal = (state)=>state.cart.cart.reduce((initial,el)=>initial + el.quantity,0)
export const getCartTotalPrice = (state)=>state.cart.cart.reduce((initial,el)=>initial + el.quantity * el.price,0)
export default cartSlice.reducer