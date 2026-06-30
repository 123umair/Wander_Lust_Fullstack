import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, } from 'react-router-dom'
import { editFormSchema } from '../Form/FormSchema'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Loading from '../Loading/Loading'

const Edit_Listing = () => {
  const API = import.meta.env.VITE_API_URL
  const { register, formState, handleSubmit, reset, watch } = useForm({ resolver: zodResolver(editFormSchema) })
  const { errors } = formState
  const { id } = useParams()
  const navigate = useNavigate()
  const [existingImage, setExistingImage] = useState()
  const selectedImageFile = watch("listing.image")
  const [isLoading, setIsLoading] = useState(false)

  const categoryOptions = [
    "Trending", "Amazing pools", "Rooms", "Camping",
    "Castles", "Tropical", "Arctic", "New", "Design", "Cabins"
  ];

  useEffect(() => {
    const fetchContent = async () => {
      try {

        const res = await axios.get(`${API}/listings/${id}/edit`, { withCredentials: true })
        reset({ listing: res.data.listing })
        // 
        if (res.data.listing?.image?.url) {
          setExistingImage(res.data.listing.image.url)
        }


      } catch (error) {
        console.log("error", error)
      }

    }
    fetchContent()
  }, [id, reset])

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('listing[title]', data.listing.title)
      formData.append('listing[description]', data.listing.description)
      formData.append('listing[price]', Number(data.listing.price))
      formData.append('listing[country]', data.listing.country)
      formData.append('listing[location]', data.listing.location)
      formData.append('listing[category]', data.listing.category)
      // 🔥 2. FIXED: Nayi file ko append karne ka logic jo aap bhool gaye the
      if (data.listing.image instanceof FileList && data.listing.image.length > 0) {
        formData.append('listing[image]', data.listing.image[0])
      }
      await axios.patch(`${API}/listings/${id}`, formData, { withCredentials: true });
      alert("Listing updated successfully!");
      navigate(`/listings/${id}`);
    } catch (error) {
      console.log(error);
    }
    finally {
      setIsLoading(false)
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" encType='multipart/form-data'>
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-800">Title</label>
            <input
              // value={update.title || ""}
              // onChange={(e) => setUpdate({ ...update, title: e.target.value })}
              id="title"
              {...register('listing.title')}
              className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent transition-all"
            />
            {errors.listing?.title && <p className='text-red-600'>{errors.listing.title.message}</p>}

          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-800">Description</label>
            <textarea

              id="description"
              {...register('listing.description')}
              // value={update.description || ""}
              // onChange={(e) => setUpdate({ ...update, description: e.target.value })}
              rows="4"
              className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent transition-all"
            ></textarea>
            {errors.listing?.description && <p className='text-red-600'>{errors.listing.description.message}</p>}

          </div>
          {/* 🔥 NEW: Category Select Dropdown */}
          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-gray-800">Category</label>
            <select
              id="category"
              {...register('listing.category')}
              className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent transition-all text-gray-700 cursor-pointer"
            >
              <option value="">Select a category</option>
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.listing?.category && <p className='text-red-600 text-sm mt-1'>{errors.listing.category.message}</p>}
          </div>

          {/* Image URL / Upload Field */}
          <div>
            <label htmlFor="image" className="block text-sm font-semibold text-gray-800">
              Property Image
            </label>

            {/* 📸 IMAGE PREVIEW BOX */}
            <div className="mt-2 mb-4 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
              {selectedImageFile && selectedImageFile instanceof FileList && selectedImageFile.length > 0 ? (
                <div className="text-center">
                  <p className="text-xs text-green-600 font-semibold mb-1">New Image Preview:</p>
                  <img
                    src={URL.createObjectURL(selectedImageFile[0])}
                    alt="New Preview"
                    className="h-40 w-full object-cover rounded-md shadow-sm"
                  />
                </div>
              ) : existingImage ? (
                // ... baki components same rahenge : existingImage ? (
                // Agar nayi image select nahi ki, to Cloudinary wali purani image dikhao
                <div className="text-center">
                  <p className="text-xs text-gray-500 font-semibold mb-1">Current Image:</p>
                  <img
                    src={existingImage}
                    alt="Current Listing"
                    className="h-40 w-full object-cover rounded-md shadow-sm"
                  />
                </div>
              ) : (
                // Agar dono me se kuch nahi hai (Fallback)
                <p className="text-sm text-gray-400">No image available</p>
              )}
            </div>
          </div>
          {/* Image URL */}
          <div>
            <label htmlFor="image" className="block text-sm font-semibold text-gray-800">Upload a new Image</label>
            <input

              type='file'
              id="image"
              accept="image/*"
              {...register("listing.image")}

              className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent transition-all"
            />
            {errors.listing?.image && <p className='text-red-600'>{errors.listing.image.message}</p>}

          </div>

          {/* Price & Country Row */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-gray-800">Price ($)</label>
              <input
                type="number"
                {...register('listing.price', { valueAsNumber: true })}
                id="price"

                // value={update.price || ""}
                // onChange={(e) => setUpdate({ ...update, price: e.target.value })}
                className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent transition-all"
              />
              {errors.listing?.price && <p className='text-red-600'>{errors.listing.price.message}</p>}

            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-semibold text-gray-800">Country</label>
              <input

                {...register('listing.country')}
                id="country"
                // value={update.country || ""}
                // onChange={(e) => setUpdate({ ...update, country: e.target.value })}
                className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent transition-all"
              />
              {errors.listing?.country && <p className='text-red-600'>{errors.listing.country.message}</p>}

            </div>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-gray-800">Location</label>
            <input
              {...register('listing.location')}
              id="location"
              // value={update.location || ""}
              // onChange={(e) => setUpdate({ ...update, location: e.target.value })}
              className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent transition-all"
            />
            {errors.listing?.location && <p className='text-red-600'>{errors.listing.location.message}</p>}
          </div>



          {/* Update Button: Airbnb Red Theme */}
          {/* Update Button: Airbnb Red Theme */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-md text-lg font-bold text-white transition-all transform active:scale-95 ${isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#FF5A5F] hover:bg-[#E31C5F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]'
                }`}
            >
              {isLoading ? (
                <span className='flex items-center gap-2'>
                  {/* ✅ Spelling fixed: animate-spin */}
                  <Loader2 className='animate-spin h-5 w-5 text-white' />
                  Updating...
                </span>
              ) : (
                "Update Listing"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Edit_Listing