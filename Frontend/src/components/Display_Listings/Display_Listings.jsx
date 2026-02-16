import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router'


const Display_Listings = () => {
  const [fetchdata, setfetchData] = useState([])
  //  const { id } = useParams()
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get('http://localhost:4000/listings')
        setfetchData(res.data.allListings)
        console.log(res, 'res')
      } catch (error) {
        console.log(error)
      }
    }
    fetchPost()
  }, [])

  return (
    <div className=''>
      <h2 className='text-center text-xl font-bold  mx-auto bg-yellow-400'>Learning FullStack</h2>
      <Link to="/listings/create_listing">

        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition duration-300 transform hover:-translate-y-1 active:scale-95 cursor-pointer">
          Create New Listing
        </button></Link>

      <p>
        {fetchdata.map((item) => (
          <ul key={item._id} className="p-4 border-b">
            <Link to={`/listings/${item._id}`} className="font-bold">{item.title}</Link>
            <li>{item.description}</li>
          </ul>
        ))}

      </p>
    </div>
  )
}

export default Display_Listings