

import React from 'react'
import { useParams } from 'react-router-dom'

export default function ListingItem() {
  const {id} = useParams();
  return (
    <div>list id is:- {id}</div>
  )
}
