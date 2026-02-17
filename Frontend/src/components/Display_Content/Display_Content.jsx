import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams , Link , useNavigate} from 'react-router-dom'
const Display_Content = () => {
  const { id } = useParams()
  const [content, setContent] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/listings/${id}`)
        console.log(res,'res')
        setContent(res.data.listing)
        
      } catch (error) {
        console.log("error", error)
      }
    }
    fetchContent()
  }, [id])

  const handleDelete = async() =>{
    try {
     const res = await axios.delete(`http://localhost:4000/listings/${id}`);
      if (res.status === 200)
      {
        alert ("Listing deleted successfully!")
        navigate("/")
      }
    } catch (error) {
      console.error("Delete error:",error)
      alert("Failed to delete.")
      
    }
  }
  return (
    <div>
      <p>Display_Content</p>
    
      {content && (
        <div>
          <p>{content.title}</p>
          <p>{content.description}</p>
          <p>{content.price}</p>
          <p>{content.location}</p>
          <p>{content.country}</p>
        </div>
      )}

<Link to={`/listings/${content._id}/edit`}>
   <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition duration-300 transform hover:-translate-y-1 active:scale-95 cursor-pointer">
  Edit this Listing
</button>

   </Link>
  
<Link to={`/listings/${content._id}`}>
   <button 
   onClick={handleDelete}
   className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition duration-300 transform hover:-translate-y-1 active:scale-95 cursor-pointer">
  Delete this Listing
</button>

   </Link>
    </div>
  )
}

export default Display_Content