import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
   const {currentUser,loading} = useSelector((state)=> state.user);
   const fileRef = useRef(null);
   const [file , setFile] = useState(undefined);
   console.log("file is:-",file);
   const [formData, setFormData] =useState({ });
   //current user id
   const userid = currentUser._id;

   function changeHandler(event) {
    setFormData({
      ...formData,
      [event.target.id] : event.target.value,
    });
   }
  async function submitHandler(event){
    event.preventDefault();
    // setLoading(true);
    formData.file = file;
    // const data = new FormData();
    
    console.log(formData)

    try{
      // dispatch(signInStart());
    const response = await fetch(`/api/v1/updateprofile/${userid}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',

        },
        body: JSON.stringify(formData),

      },
    );

    const data = await response.json();
    if(data.success === false){
      
      dispatch(signInFalior(data.message));
      return;
   
    }
    dispatch(signInSuccess(data.data));
    toast.success("login success")
    navigate("/");
    console.log(data)
    }
    catch(error){
      dispatch(signInFalior(error));
      return;
    }
   }
  return (
    <div className=' max-w-lg mx-auto p-3 '>
       <h1 className='text-3xl text-center font-semibold my-7'> Profile</h1>
      
      <form className='flex flex-col gap-4 ' onSubmit={submitHandler}>
        <input type='file' ref={fileRef} hidden accept='image/*'
          onChange={(e)=>setFile(e.target.files[0])}
        />
        <img onClick={()=>fileRef.current.click()} src={currentUser.avatar} className='h-24 w-24 object-cover rounded-full cursor-pointer self-center mt-2'/>

        <input type='text' placeholder="Username"className='p-3 border rounded-lg' id='username'  onChange={changeHandler} />
        <input type='email' placeholder='email' className='p-3 border rounded-lg' id='email'  onChange={changeHandler}/>
        <input type='password' placeholder='password' className='p-3 border rounded-lg' id='password' onChange={changeHandler}/>
        <button disabled={loading} className='p-3 text-white bg-slate-700 rounded-lg uppercase hover:opacity-95 disabled:bg-opacity-80'>
        {
          loading? 'Updating...' : 'Update'
        }
        </button> 
        {/* <button disabled={loading} className='p-3 text-white bg-green-700 rounded-lg uppercase hover:opacity-95 disabled:bg-opacity-80'>
          createListing
        </button>  */}
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer '>Delete account</span>
        <span className='text-red-700 cursor-pointer '>Sign out</span>
      </div>
     
    </div>
  )
}
