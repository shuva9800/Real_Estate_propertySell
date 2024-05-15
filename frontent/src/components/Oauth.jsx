import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import { json } from 'react-router-dom';
import { response } from 'express';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';


export default function Oauth() {
  const dispatch = useDispatch()
 async function handelGoogleClick(e){
    try{
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth , provider);
      // console.log("google signin result is:-", result);
      const responce = await fetch('/api/v1/google',{
        method: 'POST',
        headers:{
          'content-type': 'application/json',
        },
        body: JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL})
      })
      const data = await response.json();
      dispatch(signInSuccess());
    }
    catch(error){
      console.log("error occure using signin using goole account", error)
    }
  }
  return (
    <button onClick={handelGoogleClick} type='button' className='bg-red-700 text-white rounded-lg
    uppercase hover:opacity-95 p-3'>continue with Google</button>
  )
}

