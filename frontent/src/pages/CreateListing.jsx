import React from 'react'

export default function CreateListing() {
  return (
   <main className='p-3 max-w-4xl mx-auto'>
    <h1 className='text-center text-3xl font-semibold my-7'>Create a Listing</h1>
    <form className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1 '>
            <input type='text' placeholder='name' id='name' className='border p-3 rounded-lg'maxLength='60' minLength='10' required/>
            <textarea type='text' placeholder='Description' id='description' className='border p-3 rounded-lg' required/>
            <input type='text' placeholder='name' id='name' className='border p-3 rounded-lg' required/>

            <div className='flex flex-wrap gap-6'>
                <div className='flex gap-2'>
                    <input type='checkbox' id='sell' className='w-5'/>
                    <span>Sell</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='rent' className='w-5'/>
                    <span>Rent</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='parking' className='w-5'/>
                    <span>Parking Spot</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='furnished' className='w-5'/>
                    <span>Furnished</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='offer' className='w-5'/>
                    <span>Offer</span>
                </div>
            </div>
            <div className='flex flex-wrap gap-6'>
                <div className='flex gap-2 items-center'>
                    <input type='number' max='10' min='1' id='bedrooms' className=' p-3 border border-gray-300 rounded-lg' required/>
                    <p>Beds</p>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type='number' max='10' min='1' id='bathrooms' className=' p-3 border border-gray-300 rounded-lg' required/>
                    <p>Baths</p>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type='number' max='10' min='1' id='regularPrice' className=' p-3 border border-gray-300 rounded-lg' required/>
                    <div className='flex flex-col items-center'>
                     <p>Regular Price</p>
                     <span className='text-xs'>($/month)</span>
                    </div>
                   
                </div>
                <div className='flex gap-2 items-center'>
                    <input type='number' max='10' min='1' id='discountPrice' className=' p-3 border border-gray-300 rounded-lg' required/>
                    <div className='flex flex-col items-center'>
                        <p>Discounted Price</p>
                        <span className='text-xs'>($/month)</span>
                    </div>
                  
                </div>
            </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
            <p className='font-semibold'>Images: 
            <span className='font-normal ml-2 text-gray-700'>The first image will be the cover (max 6)</span>
            </p>
            <div className='flex gap-4'>
                <input type='file' id='images' accept='image/*' multiple className='p-3 border border-gray-300 rounded w-full'/>
                <button className='text-green-700 p-3 border border-green-700 rounded hover:shadow-lg disabled:opacity-80'>Upload</button>
            </div>
            <button className='p-3 bg-slate-800 rounded-lg border text-white uppercase hover:opacity-95 disabled:opacity-80'>create listing</button>    
        </div>
       
    </form>
   </main>
  )
}
