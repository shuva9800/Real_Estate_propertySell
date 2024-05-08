import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  function changeHandler(event){
    setFormData(
    {
      ...formData,
      [event.target.id] : event.target.value,
    }
    )
  }

  async function submitHandler(event){
    event.preventDefault();
    setLoading(true);
    const response = await fetch('/api/v1/login',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',

      },
      body: JSON.stringify(formData),

    },
    );
    const data = await response.json();
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Login</h1>
      <form className='flex flex-col gap-4' onSubmit={submitHandler}>
        <input type='email' placeholder='email' className='p-3 border rounded-lg' id='email' onChange={changeHandler}/>
        <input type='password' placeholder='password' className='p-3 border rounded-lg' id='password' onChange={changeHandler}/>
        <button disabled={loading} className='p-3 text-white bg-slate-700 rounded-lg uppercase hover:opacity-95 disabled:bg-opacity-80'>
        {
          loading? 'Loading...' : 'Login'
        }
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have't an accunt?</p>
        <Link to='/signup'>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
      {/* <div>
        {error && <P className="text-red-600 mt-5">{error}</P>}
      </div> */}
  </div>
  )
}
