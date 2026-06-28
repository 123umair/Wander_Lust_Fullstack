import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  Bed, Palmtree, Waves, Tent, Flame, Castle,
  Tv, Snowflake, Key, Compass,
} from 'lucide-react'
import { useHorizontalScroll } from '../hooks/useHorizontalScroll'
import Loading from '../Loading/Loading'
const Display_Listings = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)


  const [showTaxes, setShowTaxes] = useState(false)

  const scrollRef = useHorizontalScroll()


  const API = import.meta.env.VITE_API_URL
  const [fetchdata, setfetchData] = useState([])
  const [loading, setLoading] = useState(true)

  const categories = [
    { name: "Trending", icon: Flame },
    { name: "Amazing pools", icon: Waves },
    { name: "Rooms", icon: Bed },
    { name: "Camping", icon: Tent },
    { name: "Castles", icon: Castle },
    { name: "Tropical", icon: Palmtree },
    { name: "Arctic", icon: Snowflake },
    { name: "New", icon: Key },
    { name: "Design", icon: Compass },
    { name: "Cabins", icon: Tv },
  ];

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${API}/listings`, { withCredentials: true })
        setfetchData(res.data.allListings || [])
      } catch (error) {
        console.log("Fetch error:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [API])

  const filterData = selectedCategory ? fetchdata.filter((item) => item.category === selectedCategory) : fetchdata

  const handleCategoryClick = (categoryName) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null)
    } else {
      setSelectedCategory(categoryName)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Categories Bar */}
      {/* Responsive Categories Bar Container */}
      <div className="w-full bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div
            ref={scrollRef}
            className="flex items-center space-x-6 sm:space-x-8 overflow-x-auto py-4 
                    scrollbar-none  [-ms-overflow-style:none] [scrollbar-width:none]">

            {categories.map((cat, idx) => {
              const IconComponent = cat.icon;
              const isSelected = selectedCategory === cat.name;

              return (
                <div
                  onClick={() => handleCategoryClick(cat.name)}
                  key={idx}
                  className={`flex flex-col items-center space-y-1.5 pb-2 border-b-2 min-w-17.5 sm:min-w-20 
              cursor-pointer transition-all dynamic-touch-action select-none ${isSelected
                      ? 'border-gray-900 text-gray-900 font-semibold'
                      : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-200'
                    }`}
                >
                  {/* Icons ki size responsive: mobile par h-5 w-5, desktop par h-6 w-6 */}
                  <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 stroke-[1.6]" />
                  <span className="text-[10px] sm:text-xs tracking-tight whitespace-nowrap">
                    {cat.name}
                  </span>
                </div>
              )
            })}

          </div>
        </div>
      </div>


      <div className="flex justify-end mb-8">
        <div className="flex items-center space-x-4 border border-gray-300 rounded-xl px-4 py-3 shadow-sm bg-white hover:border-gray-400 transition cursor-pointer"
          onClick={() => setShowTaxes(!showTaxes)}>
          <span className="text-sm font-medium text-gray-700 select-none">
            Display total price incl. taxes
          </span>

          {/* Custom Tailwind Toggle Button */}
          <div className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${showTaxes ? 'bg-blue-700' : 'bg-gray-300'
            }`}>
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${showTaxes ? 'translate-x-6' : 'translate-x-0'
              }`} />
          </div>
        </div>
      </div>

      {/* CONDITIONAL RENDERING LOGIC */}
      {loading ? (
        <div className="text-center py-12 text-gray-500 font-medium ">
          <Loading className="w-12 h-12 animate-spin text-blue-600" text="all listings...." />
        </div>
      ) : filterData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterData.map((item) => {
            const reviewsArray = item?.reviews || [];
            const totalReviews = reviewsArray.length || 0
            const averageRating = totalReviews > 0 ?
              (reviewsArray.reduce((acc, r) => acc + Number(r.rating), 0) / totalReviews).toFixed(1) : 0.0

            // STEP 3: Tax calculation dynamic logic
            const basePrice = item.price || 0;
            const taxAmount = basePrice * 0.18; // 18% Tax Rate
            const totalPriceWithTax = basePrice + taxAmount;

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

                  {/*  STEP 4: Conditional Price Display */}
                  <p className="mt-1 text-sm text-gray-900 flex flex-wrap items-center gap-1">
                    <span className="font-bold">
                      ${showTaxes
                        ? totalPriceWithTax.toLocaleString('en-US')
                        : basePrice.toLocaleString('en-US')
                      }
                    </span>
                    night

                    {/* 🏷️ Tax Badge (Display none jab toggle off ho, 'inline-block' jab on ho) */}
                    <span className={`text-[11px] font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded ml-1 transition-all duration-200 ${showTaxes ? 'inline-block opacity-100' : 'hidden opacity-0'
                      }`}>
                      +18% tax included
                    </span>
                  </p>
                </div>
              </Link>
            )
          })}
        </div>

      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
          <svg className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No Listings Found</h3>
          <p className="text-gray-500 text-sm text-center max-w-sm mb-5">
            {selectedCategory
              ? `Currently, there are no available properties listed under the "${selectedCategory}" category.`
              : "Looks like there are no listings active right now."}
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