import { formSchema } from './FormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
const Form = () => {
  const navigate = useNavigate()
  const API = import.meta.env.VITE_API_URL
  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${API}/listings/create_listing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      if (!res.ok) {
        throw new Error(`Create failed with status ${res.status}`)
      }

      navigate('/')
      toast.success('Listing Successfully Added.!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // transition: {Bounce},
      });

    } catch (error) {
      console.log(error)
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
        <form onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-6">

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


          {/* Image URL */}
          <div>
            <label htmlFor="image" className="block text-sm font-semibold text-gray-800">Image URL</label>
            <input

              id="image"
              {...register('listing.image.url')}
              placeholder="https://images.unsplash.com/..."
              className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent transition-all"
            />
            {errors.listing?.image?.url && <p className='text-red-600'>{errors.listing.image.url.message}</p>}
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
              className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-md text-lg font-bold text-white bg-[#FF5A5F] hover:bg-[#E31C5F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F] transition-all transform active:scale-95"
            >
              Add Listing
            </button>

          </div>
        </form>

      </div>
    </div>
  );
}

export default Form;