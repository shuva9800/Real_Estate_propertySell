import React from 'react'
import { useSelector } from 'react-redux'

export default function Home() {
  const {currentUser} = useSelector((state)=>state.user);
  return (
   
    <div>
      <p>{
       ( currentUser) &&(<span>{currentUser.email}</span>)
      
      }</p>
      <h1>hello bro</h1>
    </div>
  )
}
