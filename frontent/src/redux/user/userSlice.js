import { createSlice } from '@reduxjs/toolkit'


const initialState = {
   currentUser:null,
   error:null,
   loading:false,
  };

   const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signInStart: (state)=>{
            state.loading = true;
        },
        signInSuccess: (state,action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFalior: (state,action) =>{
            state.error = action.payload;
            state.loading = false;
        },
        deleteUserStart: (state)=>{
            state.loading = true;
        },
        deleteUserSuccessful:(state)=>{
            state.loading = false;
            state.currentUser= null;
            state.error = null;
        },
        deleteUserfaliors: (state,action)=>{
            state.loading = false;
            state.error= action.payload;
        }
    }
  })

  export const { signInStart, signInSuccess, signInFalior,deleteUserStart, deleteUserSuccessful,deleteUserfaliors} = userSlice.actions;

  export default userSlice.reducer



 