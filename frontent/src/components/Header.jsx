import React from 'react'
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import "./Header.css"
import { useSelector } from 'react-redux';

export default function Header() {
    const {currentUser} = useSelector((state)=> state.user);
    console.log("header section " , currentUser)
  return (
    <header className='bg-slate-300 shadow-md '>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3 '>
            <Link to="/">
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-slate-500'>Sahan</span>
                    <span className='text-slate-700'>Estate</span>
                </h1>
            </Link>
            <form className='bg-slate-100 p-3 rounded-lg flex items-center cursor-pointer'>
                <input type='text' placeholder='Searching....' className='bg-transparent focus:outline-none w-24 sm:w-64 cursor-pointer'/>
                <FaSearch className='text-slate-600'/>
            </form>
            <ul className='flex gap-4'>
               <Link to="/"> <li className='hidden sm:inline text-slate-700 hover:underline '>Home</li></Link>
               <Link to="/about"> <li className='hidden sm:inline text-slate-700 hover:underline '>About</li></Link>
               <li>
                {
                    currentUser?(<Link to="/profile"><img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar}/></Link>):
                    (<Link to="/signup"><span>Sign Up</span></Link>)

                }
               </li>
            </ul>
        </div>
    </header>
  )
}
