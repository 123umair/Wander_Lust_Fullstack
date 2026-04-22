import React from 'react'
import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { reviewfromSchema } from './reviewFormSchema.js'



const Display_Content = () => {
  const { id } = useParams()
  const [content, setContent] = useState(null)
  const navigate = useNavigate()
  const API = import.meta.env.VITE_API_URL


  console.log(content, 'content')

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(`${API}/listings/${id}`)
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
        const res = await axios.delete(`${API}/listings/${id}`);
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(reviewfromSchema),
    defaultValues: {
      review: {
        rating: 3,
        comment: ""
      }
    }
  })
  const submitReview = useCallback(async (data) => {
    try {
      const res = await axios.post(
        `${API}/listings/${id}/reviews`,
        { review: data }
      )
      setContent((prev) => ({
        ...prev, reviews: [...prev.reviews, res.data.review]
      }))
      reset()
    }
    catch (error) {
      // Best practice: Log the actual error response from the server
      console.error('review error', error.response?.data || error.message)
    }

  }, [id, reset]); // These are the external variables the function actually depends on
  const handleDeleteReviews = async (reviewId) => {
    try {
      const res = await axios.delete(`${API}/listings/${id}/reviews/${reviewId}`)
      console.log(res, 'data')
      setContent((prev) => ({
        reviews: prev.reviews.filter(r => r._id !== reviewId)
      }))
    } catch (error) {
      console.error("review error", error.response?.data || error.message
      )
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
      <br />
      <hr className='bg-gray-500 h-0.5 border-none' />
      <div>

        <form action="" onSubmit={handleSubmit(submitReview)} method='POST'>
          <div className='mt-2'>
            <p className='mt-2'>Leave a Review</p>
            <div className='mt-2'>
              <label htmlFor="rating">Rating</label>
              <input type="range" min="1" max="5" id='Rating' name='review[rating]' className='cursor-pointer w-full'
                {...register('review.rating', { valueAsNumber: true })}
              />
            </div>
            <div className='mt-2'>
              <label htmlFor="comment">Comments</label>
              <textarea name="review[comment]" id="comment"
                {...register('review.comment')}
                className='w-full border border-gray-400 px-2 py-2 outline-none text-sm'
                cols={3}
                rows={5} >
              </textarea>
              {errors.review?.comment && <p className='text-red-600'>{errors.review?.comment.message}</p>}
            </div>
            <br />
            <button className="bg-white hover:bg-black text-black hover:text-white text-sm font-bold px-4 py-2 rounded-lg transition active:scale-95 cursor-pointer border"
              type='submit'
            >
              Submit
            </button>
          </div>
        </form>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">All Reviews</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.reviews.length > 0 ? (
              content.reviews.map((review) => (
                <div
                  key={review._id}
                  className="border border-gray-100  p-4 shadow-sm hover:shadow-md transition"
                >
                  {/* Header */}
                  <div className="mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold ">
                        U
                      </div>
                      <div>
                        <p className="text-sm font-semibold">User</p>
                        <p className="text-xs text-gray-500">
                          {new Date(review.createdAt).toDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="text-[10px] text-black pl-2 pt-2">
                      ⭐ {review.rating}
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700 text-sm leading-relaxed pl-2">
                    {review.comment}
                  </p>

                  <button className="bg-white hover:bg-red-500 text-red-500 hover:text-white text-sm font-bold px-4 py-2 rounded-lg transition active:scale-95 cursor-pointer border border-red-500 mt-5" onClick={() => (handleDeleteReviews(review._id))}>Delete</button>

                </div>

              ))
            ) : (
              <p className="text-gray-500">No reviews yet</p>
            )}

          </div>
        </div>
      </div>
    </div >
  )
}

export default Display_Content