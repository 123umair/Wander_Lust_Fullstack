import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom' // Ensure this is react-router-dom

const Display_Listings = () => {
  const [fetchdata, setfetchData] = useState([])

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get('http://localhost:4000/listings')
        setfetchData(res.data.allListings)
      } catch (error) {
        console.log("Fetch error:", error)
      }
    }
    fetchPost()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 1. First Heading */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Listing Details</h1>
      {/* Container for the Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {fetchdata.map((item) => (
          <Link 
            to={`/listings/${item._id}`} 
            key={item._id} 
            className="group cursor-pointer flex flex-col space-y-2"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white">
            {/* Image Container */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10"></div>
    
    <img 
      src={item.image?.url || "https://images.unsplash.com/photo-1501785888041-af3ef285b470"} 
      alt={item.title} 
      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
    />
  </div>

            {/* Content Section */}
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-[15px] text-gray-900 truncate">
                  {item.location}, {item.country}
                </h3>
                <div className="flex items-center space-x-1">
                   <span className="text-sm">★</span>
                   <span className="text-sm text-gray-600">4.9</span>
                </div>
              </div>
              
              <p className="text-gray-500 text-sm truncate">{item.title}</p>
              <p className="text-gray-500 text-sm">Added recently</p>
              
              <p className="mt-1 text-sm text-gray-900">
                <span className="font-bold">₹{item.price.toLocaleString('en-IN')}</span> night
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Display_Listings