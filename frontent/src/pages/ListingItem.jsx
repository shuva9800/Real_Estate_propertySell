

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

export default function ListingItem() {
  const {id} = useParams();
  const [listing, setListing] = useState(null);
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState(false)
  SwiperCore.use([Navigation]);
  useEffect(() =>{
   
    const fetchListing = async() =>{
      try{
    
        setLoading(true);
        const response = await axios.get(`/api/v1/listing/get/${id}`);
        const data = response.data;
        if(data.success === false){
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
        console.log(data)
      }
      catch(error){
        setError(true);
        setLoading(false);
      }
    
    }

    fetchListing();
  },[id])
 
  return (
    <main>
       {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {
        listing && !loading && !error && (
          <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[500px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          </div>
        )
      }
    </main>
  )
}
