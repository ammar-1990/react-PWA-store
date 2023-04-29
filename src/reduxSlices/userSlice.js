import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null,
    isLoading:true,
    error:false
}


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload;
            state.isLoading=false
        },
        clearUser:(state)=>{
            state.user=null;
            state.isLoading=false
        }
        }
    }
)


export const {setUser, clearUser} = userSlice.actions

export const getUser=(state)=>state.user
export default userSlice.reducer