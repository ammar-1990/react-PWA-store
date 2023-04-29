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
        setCartLoading:(state)=>{
            state.isLoading=false
        }
     
        }
    }
)


export const {setCart, setCartLoading} = cartSlice.actions

export const getCart=(state)=>state.cart
export const getCartTotal = (state)=>state.cart.cart.reduce((initial,el)=>initial + el.quantity,0)
export default cartSlice.reducer