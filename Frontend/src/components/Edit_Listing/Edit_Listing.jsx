import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Edit_Listing = () => {
  const [update, setUpdate] = useState({})
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/listings/${id}/edit`)
        setUpdate(res.data.listing)
      } catch (error) {
        console.log("error", error)
      }
    }
    fetchContent()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:4000/listings/${id}`, { listing: update });
      alert("Listing updated successfully!");
      navigate(`/listings/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Container: Responsive and Shadowed */}
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden p-6 sm:p-10 border border-gray-100">
        
        {/* Header Section */}
        <div className="mb-10 text-left">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Edit Your Listing</h2>
          <p className="text-gray-500 mt-2 text-base">Modify the details of your property below.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-800">Title</label>
            <input 
              type="text" 
              value={update.title || ""}
              onChange={(e) => setUpdate({...update, title: e.target.value})}
              name="listing[title]" 
              id="title"
              className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-800">Description</label>
            <textarea 
              name="listing[description]" 
              id="description" 
              value={update.description || ""}
              onChange={(e) => setUpdate({...update, description: e.target.value})}
              rows="4"
              className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent transition-all"
            ></textarea>
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="image" className="block text-sm font-semibold text-gray-800">Image URL</label>
            <input 
              type="text" 
              name="listing[image]"
              id="image"
              value={update.image?.url || ""}
              onChange={(e) => setUpdate({...update, image: {...update.image, url: e.target.value}})}
              className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent transition-all"
            />
          </div>

          {/* Price & Country Row */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-gray-800">Price ($)</label>
              <input 
                type="number" 
                name="listing[price]"
                id="price"
                value={update.price || ""}
                onChange={(e) => setUpdate({...update, price: e.target.value})}
                className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-semibold text-gray-800">Country</label>
              <input 
                type="text" 
                name="listing[country]"
                id="country"
                value={update.country || ""}
                onChange={(e) => setUpdate({...update, country: e.target.value})}
                className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-gray-800">Location</label>
            <input 
              type="text" 
              name="listing[location]"
              id="location"
              value={update.location || ""}
              onChange={(e) => setUpdate({...update, location: e.target.value})}
              className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent transition-all"
            />
          </div>

          {/* Update Button: Airbnb Red Theme */}
          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-md text-lg font-bold text-white bg-[#FF5A5F] hover:bg-[#E31C5F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F] transition-all transform active:scale-95"
            >
              Update Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Edit_Listing