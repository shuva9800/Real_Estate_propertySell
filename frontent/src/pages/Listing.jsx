import React, { useRef } from 'react'

export default function Listing() {
    const ref = useRef()
  return (
    <div>
        <p>inside listing page</p>
        <span>{ref}</span>
    </div>
  )
}
