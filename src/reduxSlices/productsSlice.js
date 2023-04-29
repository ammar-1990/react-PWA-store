import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products:[],
    isLoading:true,
    error:'',
}


const productsSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        setProducts:(state,action)=>{
            // const products = action.payload.map((el)=>{
            //     return {...el,timestamp:el.timestamp.toLocalString}
            // })
            state.products=action.payload;
            state.isLoading=false;
            state.error=null
        },
        setProductsError:(state,action)=>{
            state.error=action.payload
        }
     
        }
    }
)


export const {setProducts, setProductsError} = productsSlice.actions

export const getProducts=(state)=>state.products
export default productsSlice.reducer