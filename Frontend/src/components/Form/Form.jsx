import { formSchema } from './FormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { Loader2 } from 'lucide-react';
import { useState } from 'react'
import axios from 'axios'



const Form = () => {

  // 🔥 Categories array for dropdown mapping
  const categoryOptions = [
    "Trending", "Amazing pools", "Rooms", "Camping",
    "Castles", "Tropical", "Arctic", "New", "Design", "Cabins"
  ];
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const API = import.meta.env.VITE_API_URL





  const onSubmit = async (data) => {
    try {
      console.log("Complete Data:", data);
      console.log("Category:", data.listing.category);
      setIsLoading(true)
      const formData = new FormData()  // a special object instance of the browser that allow raw files binary (images/videos) with plan text.
      //append the text fields
      formData.append('listing[title]', data.listing.title)
      formData.append('listing[description]', data.listing.description)
      formData.append('listing[price]', Number(data.listing.price))
      formData.append('listing[country]', data.listing.country)
      formData.append('listing[location]', data.listing.location)
      // 🔥 YAHAN CHECK KAREIN: Kya data.listing.category mein value aa rahi hai?
      console.log("Frontend selected category state:", data.listing.category)
      // Category data append 
      formData.append('listing[category]', data.listing.category)

      // check the image file and add in the formData
      if (data.listing.image && data.listing.image[0]) {
        formData.append('listing[image]', data.listing.image[0])
      }
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const res = await axios.post(`${API}/listings/create_listing`, formData, {
        withCredentials: true,

      })
      if (res) {
        navigate('/')
        return toast.success('Listing Successfully Added.!')

      }
      else {
        navigate('/login')
        toast.error(res.data.message)
        return
      }
    } catch (error) {
      console.error("Message:", error.response?.data || error.message)
      toast.error("Something went wrong during upload.")
    } finally {
      setIsLoading(false) // 🔥 Kaam khatam (Chaahe success ho ya error), loading band
    }


  }

  const { register, handleSubmit, formState } = useForm({ resolver: zodResolver(formSchema) })
  const { errors } = formState
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Container: Responsive width with Airbnb-style shadow */}
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden p-6 sm:p-10 border border-gray-100">

        {/* Header: Bold and LG size as requested */}
        <div className="mb-10 text-left">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Create New Listing
          </h2>
          <p className="text-gray-500 mt-2 text-base">
            Fill in the details below to share your place.
          </p>
        </div>

        {/* Keeping your exact format: action and method same */}
        <form onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-6" encType='multipart/form-data'>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-800">Title</label>
            <input
              type="text"
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
              rows="4"
              placeholder="Tell us more about the place..."
              id="description"
              {...register('listing.description')}
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

          {/* Image File Upload Input */}
          <div>
            <label htmlFor="image" className="block text-sm font-semibold text-gray-800">Upload Image File</label>
            <input
              type="file" // 🔥 Text ki jagah File input banaya
              id="image"
              accept="image/*" // Sirf images select karne ki permission dega
              {...register('listing.image')}
              className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent transition-all 
  file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold 
  file:bg-gray-300 file:text-black hover:file:bg-gray-400 file:cursor-pointer"
            />
            {errors.listing?.image && <p className='text-red-600 text-sm mt-1'>{errors.listing.image.message}</p>}
          </div>

          {/* Price & Country Row: Responsive Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-gray-800">Price ($)</label>
              <input

                id="price"
                placeholder="0.00"
                {...register('listing.price', { valueAsNumber: true })}
                className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent transition-all"
              />
              {errors.listing?.price && <p className='text-red-600'>{errors.listing.price.message}</p>}

            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-semibold text-gray-800">Country</label>
              <input
                id="country"
                placeholder="United States"
                {...register('listing.country')}
                className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent transition-all"
              />
              {errors.listing?.country && <p className='text-red-600'>{errors.listing.country.message}</p>}
            </div>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-gray-800">Location</label>
            <input
              id="location"
              placeholder="e.g. Malibu, California"
              {...register('listing.location')}
              className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent transition-all"
            />
            {errors.listing?.location && <p className='text-red-600'>{errors.listing.location.message}</p>}

          </div>

          {/* Submit Button: Airbnb color and named "Add" */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading} // 🔥 Uploading ke dauran button disabled rahega
              className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-md text-lg font-bold text-white bg-[#FF5A5F] hover:bg-[#E31C5F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F] transition-all transform active:scale-95"
            ${isLoading ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#FF5A5F] hover:bg-[#E31C5F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]'
                }`}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  {/* Lucide Spinner Icon */}
                  <Loader2 className="animate-spin h-5 w-5 text-white" />
                  Uploading Image...
                </span>
              ) : (
                "Add Listing"
              )}
            </button>

          </div>
        </form>

      </div>
    </div>
  );
}

export default Form;