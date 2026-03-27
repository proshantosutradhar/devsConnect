import { createSlice } from "@reduxjs/toolkit";

export const requestSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers:{
        addRequests: (state, action)=>{
            return action.payload
        },
        removeRequests: (state, action)=>{
            const newArr = state.filter((r)=> r._id != action.payload)
            return newArr;
        }
        
    }
})

export const {addRequests, removeRequests} = requestSlice.actions;
export default requestSlice.reducer