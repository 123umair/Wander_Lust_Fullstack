import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Display_Listings = () => {
  const API = import.meta.env.VITE_API_URL
  const [fetchdata, setfetchData] = useState([])
  const [loading, setLoading] = useState(true) // Ek loading state taake data aane se pehle empty message na dikhe

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${API}/listings`, { withCredentials: true })
        setfetchData(res.data.allListings || [])
      } catch (error) {
        console.log("Fetch error:", error)
      } finally {
        setLoading(false) // Data fetch hone ke baad loading false kar dein
      }
    }
    fetchPost()
  }, [API])


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 1. First Heading */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Listing Details</h1>

      {/* CONDITIONAL RENDERING LOGIC */}
      {loading ? (
        // A. Agar data load ho raha hai
        <div className="text-center py-12 <p>{item.Owner} sdfsdfsd</p> text-gray-500 font-medium">
          Loading listings...
        </div>
      ) : fetchdata.length > 0 ? (
        // B. If listing is available
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {fetchdata.map((item) => {
            const reviewsArray = item?.reviews || [];
            const totalReviews = reviewsArray.length || 0
            const averageRating = totalReviews > 0 ?
              (reviewsArray.reduce((acc, r) => acc + Number(r.rating), 0) / totalReviews).toFixed(1) : 0.0
            return (
              <Link
                to={`/listings/${item._id}`}
                key={item._id}
                className="group cursor-pointer flex flex-col space-y-2"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white">
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10"></div>
                  <img
                    src={item.image?.url || "https://images.unsplash.com/photo-1501785888041-af3ef285b470"}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-[15px] text-gray-900 truncate">
                      {item.location}, {item.country}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm">★</span>
                      <span className="text-sm text-gray-600">{averageRating}</span>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm truncate">{item.title}</p>
                  <p className="text-gray-500 text-sm">Added recently</p>

                  <p className="mt-1 text-sm text-gray-900">
                    <span className="font-bold">₹{item.price ? item.price.toLocaleString('en-IN') : '0'}</span> night
                  </p>
                </div>
              </Link>
            )
          })}
        </div>

      ) : (
        // C. Empty state
        <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
          <svg className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No Listings Available</h3>
          <p className="text-gray-500 text-sm text-center max-w-sm mb-5">
            Looks like there are no listings active right now. Be the first one to host and add a new listing!
          </p>
          <Link
            to="/listings/create_listing"
            className="inline-flex items-center px-4 py-2 bg-[#FF5A5F] hover:bg-[#e04f54] text-white text-sm font-semibold rounded-xl shadow-sm transition"
          >
            + Create New Listing
          </Link>
        </div>
      )}
    </div>
  )
}

export default Display_Listings