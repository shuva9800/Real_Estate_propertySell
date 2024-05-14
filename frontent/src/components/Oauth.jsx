import React from 'react'

export default function Oauth() {
  function handelGoogleClick(e){
    console.log(e)
  }
  return (
    <button onClick={handelGoogleClick} type='button' className='bg-red-700 text-white rounded-lg
    uppercase hover:opacity-95 p-3'>continue with Google</button>
  )
}

