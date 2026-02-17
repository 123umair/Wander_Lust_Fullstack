import React from 'react'
import axios from 'axios'
import {useState,useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
const Edit_Listing = () => {
const [update,setUpdate]=useState({})
const { id } = useParams()
const navigate = useNavigate()
 useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/listings/${id}/edit`)
        console.log(res,'res')
        setUpdate(res.data.listing)
      } catch (error) {
        console.log("error", error)
      }
    }
    fetchContent()
  }, [id])



   // Update your handleSubmit in React:
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.patch(`http://localhost:4000/listings/${id}`, { listing: update });
        alert("Post updated successfully");
        navigate(`/listings/${id}`);
    } catch (error) {
        console.log(error);
    }
}


  return (
    <div>
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Create New Listing</h2>
          <p className="text-gray-500">Fill in the details below to share your place.</p>
        </div>

        <form action="" onSubmit={handleSubmit} method="POST" className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input 
              type="text" 
              value = {update.title || ""}
              onChange={(e)=>{
                setUpdate({...update,title:e.target.value})
              }}
              name="listing[title]" 
              id="title"
              className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea 
              name="listing[description]" 
              id="description" 
              value = {update.description || ""}
               onChange={(e)=>{
                setUpdate({...update,description:e.target.value})
              }}
              rows="4"
              className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
            <input 
              type="text" 
              name="listing[image]"
              id="image"
              value={update.image?.url || ""}
               onChange={(e)=>{
                setUpdate({...update,image:{...update.image,url:e.target.value}})
              }}
              className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Price & Country Row */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
              <input 
                type="number" 
                name="listing[price]"
                id="price"
                value={update.price || ""}
                 onChange={(e)=>{
                setUpdate({...update,price:e.target.value})
              }}
                className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
              <input 
                type="text" 
                name="listing[country]"
                id="country"
                value={update.country || ""}
                 onChange={(e)=>{
                setUpdate({...update, country:e.target.value})
              }}
                className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input 
              type="text" 
              name="listing[location]"
              id="location"
              value={update.location || ""}
              onChange={(e)=>{
                setUpdate({...update,location:e.target.value})
            }}
              
              className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button 
              type="submit" 
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
             Update Listing
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Edit_Listing