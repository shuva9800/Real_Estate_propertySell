import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
  const [formData , SetFormData] = useState({ });
  const [loading , setLoading] = useState(false);
  const [error, setError] = useState(null);

  function changeHandler(event){
    SetFormData({
      ...formData,
      [event.target.id] : event.target.value,
    });
  };
  

  async function submitHandler(event){
    event.preventDefault();
    setLoading(true);
    const response = await fetch('/api/v1/signup',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',

        },
        body: JSON.stringify(formData),

      },
    );

    const data = await response.json();
    if(data.success === false){
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false)
    console.log(data)

  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'> Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit={submitHandler}>
        <input type='text' placeholder='username' className='p-3 border rounded-lg' id='username' onChange={changeHandler}/>
        <input type='email' placeholder='email' className='p-3 border rounded-lg' id='email' onChange={changeHandler}/>
        <input type='password' placeholder='password' className='p-3 border rounded-lg' id='password' onChange={changeHandler}/>
        <button disabled={loading} className='p-3 text-white bg-slate-700 rounded-lg uppercase hover:opacity-95 disabled:bg-opacity-80'>
        {
          loading? 'Loading...' : 'Sign Up'
        }
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an accunt?</p>
        <Link to='/login'>
          <span className='text-blue-700'>Login</span>
        </Link>
      </div>
    </div>
  )
}
