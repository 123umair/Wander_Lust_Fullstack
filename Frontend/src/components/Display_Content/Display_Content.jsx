import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

const Display_Content = () => {
  const { id } = useParams()
  const [content, setContent] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/listings/${id}`)
        setContent(res.data.listing)
      } catch (error) {
        console.log("error", error)
      }
    }
    fetchContent()
  }, [id])

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        const res = await axios.delete(`http://localhost:4000/listings/${id}`);
        if (res.status === 200) {
          alert("Listing deleted successfully!")
          navigate("/")
        }
      } catch (error) {
        console.error("Delete error:", error)
        alert("Failed to delete.")
      }
    }
  }

  if (!content) return <div className="text-center py-10 text-gray-500">Loading...</div>

  return (
    /* Parent padding kam kar di (py-6) */
    <div className="max-w-3xl mx-auto px-4 py-6">
      
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Listing Details</h1>

      <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
        
        {/* Image height kam kar di (h-64 to h-80) aur aspect ratio tight kiya */}
        <div className="w-full h-64 md:h-80 overflow-hidden">
          <img 
            src={content.image?.url || "https://images.unsplash.com/photo-1501785888041-af3ef285b470"} 
            alt={content.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Inner Padding kam kar di (p-5) aur spacing tight ki */}
        <div className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{content.title}</h2>
              <p className="text-gray-500 text-sm">
                {content.location}, {content.country}
              </p>
            </div>
            <div className="flex items-center space-x-1 text-sm font-semibold">
              <span className="text-[#FF5A5F]">★</span>
              <span>4.9</span>
            </div>
          </div>

          <hr className="my-4 border-gray-100" />

          <div className="mb-5">
            <h3 className="text-md font-bold text-gray-900 mb-1">About this place</h3>
            <p className="text-gray-600 text-sm leading-snug">
              {content.description}
            </p>
          </div>

          {/* Price aur Buttons area ko compact kiya */}
          <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-gray-900">₹{content.price?.toLocaleString('en-IN')}</span>
              <span className="text-gray-500 text-sm"> / night</span>
            </div>
            
            <div className="flex space-x-2">
              <Link to={`/listings/${content._id}/edit`}>
                <button className="bg-gray-900 hover:bg-black text-white text-sm font-bold px-4 py-2 rounded-lg transition active:scale-95">
                  Edit
                </button>
              </Link>

              <button 
                onClick={handleDelete}
                className="bg-[#FF5A5F] hover:bg-[#E31C5F] text-white text-sm font-bold px-4 py-2 rounded-lg transition active:scale-95"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Link to="/" className="text-gray-500 hover:text-black text-sm font-semibold flex items-center gap-1">
          ← Back to listings
        </Link>
      </div>
    </div>
  )
}

export default Display_Content