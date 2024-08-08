import React, { useState } from "react";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from 'firebase/storage';
  import { app } from '../firebase';

export default function CreateListing() {
    //all state
    const [files, setFiles]= useState([ ]);
    const [formData, setFormData]= useState({
        imageUrls: [],
    });
    const [uploading, setUploading] = useState(false);
    const [imageUploadError, setImageUploadError] = useState(false);

    //file uploading function   
    const filesubmitHandler = (e)=>{
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploading(true);
            setImageUploadError(false);
            const promises = [];
      
            for (let i = 0; i < files.length; i++) {
              promises.push(storeImage(files[i]));
            }
            Promise.all(promises)
              .then((urls) => {
                setFormData({
                  ...formData,
                  imageUrls: formData.imageUrls.concat(urls),
                });
                setImageUploadError(false);
                setUploading(false);
              })
              .catch((err) => {
                setImageUploadError('Image upload failed (2 mb max per image)');
                setUploading(false);
              });
          } else {
            setImageUploadError('You can only upload 6 images per listing');
            setUploading(false);
          }
    }

    //firebase image  upload
    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
          const storage = getStorage(app);
          const fileName = new Date().getTime() + file.name;
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done`);
            },
            (error) => {
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
              });
            }
          );
        });
      };

     //delete images from listing
      const handleRemoveImage = (index) => {
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
      };
    
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-center text-3xl font-semibold my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1 ">
          <input
            type="text"
            placeholder="name"
            id="name"
            className="border p-3 rounded-lg"
            maxLength="60"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            id="description"
            className="border p-3 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="name"
            id="name"
            className="border p-3 rounded-lg"
            required
          />

          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                max="10"
                min="1"
                id="bedrooms"
                className=" p-3 border border-gray-300 rounded-lg"
                required
              />
              <p>Beds</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                max="10"
                min="1"
                id="bathrooms"
                className=" p-3 border border-gray-300 rounded-lg"
                required
              />
              <p>Baths</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                max="10"
                min="1"
                id="regularPrice"
                className=" p-3 border border-gray-300 rounded-lg"
                required
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                max="10"
                min="1"
                id="discountPrice"
                className=" p-3 border border-gray-300 rounded-lg"
                required
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal ml-2 text-gray-700">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
                <input
                type="file"
                id="images"
                onChange={(event)=>setFiles(event.target.files)}
                accept="image/*"
                multiple
                className="p-3 border border-gray-300 rounded w-full"
                />
                <button disabled={uploading} type="button" onClick={filesubmitHandler} className="text-green-700 p-3 border border-green-700 rounded hover:shadow-lg disabled:opacity-80">
                   {uploading?"Uploading...":"Upload" }   
                </button>
            </div>
                <p className='text-red-700 text-sm'>
                     {imageUploadError && imageUploadError}
                 </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
            <button className="p-3 bg-slate-800 rounded-lg border text-white uppercase hover:opacity-95 disabled:opacity-80">
                create listing
            </button>
        </div>
      </form>
    </main>
  );
}
