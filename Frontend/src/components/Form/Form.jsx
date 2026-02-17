import React from 'react';

const Form = () => {
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
        <form action="http://localhost:4000/listings/create_listing" method="POST" className="space-y-6">
          
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-800">Title</label>
            <input 
              type="text" 
              name="listing[title]" 
              id="title"
              placeholder="e.g. Cozy Beachfront Cottage" 
              className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-800">Description</label>
            <textarea 
              name="listing[description]" 
              id="description" 
              rows="4"
              placeholder="Tell us more about the place..."
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
              placeholder="https://images.unsplash.com/..." 
              className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent transition-all"
            />
          </div>

          {/* Price & Country Row: Responsive Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-gray-800">Price ($)</label>
              <input 
                type="number" 
                name="listing[price]"
                id="price"
                placeholder="0.00" 
                className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-semibold text-gray-800">Country</label>
              <input 
                type="text" 
                name="listing[country]"
                id="country"
                placeholder="United States" 
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
              placeholder="e.g. Malibu, California" 
              className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent transition-all"
            />
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