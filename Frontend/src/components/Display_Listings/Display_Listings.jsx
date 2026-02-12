import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link , useParams } from 'react-router'


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
  },[])

  return (
<div className=''>
      <h2 className='text-center text-xl font-bold  mx-auto bg-yellow-400'>Learning FullStack</h2>
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