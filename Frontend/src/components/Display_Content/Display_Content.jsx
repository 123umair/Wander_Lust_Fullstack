import React from 'react'
import axios from 'axios'
import {useState,useEffect} from 'react'
import { useParams } from 'react-router'
const Display_Content = () => {
    const { id } = useParams()
    const [content,setContent] = useState([])
   

    useEffect(() => {
       const fetchContent = async () =>{
      try {
           const res = await axios.get(`http://localhost:4000/listings/${id}`)
           setContent(res.data.listings)
      } catch (error) {
        console.log("error",error)
      }
    }
     fetchContent()
    }, [])
    
    return (
    <div>
     <p>Display_Content</p>
     {content.map((content)=>
     { return (
      <div>
       <p>{content.title}</p>
      <p>{content.description}</p>
      <p>{content.price}</p>
      <p>{content.location}</p>
      <p>{content.country}</p>
      </div>
     )})} 

    </div>
  )
}

export default Display_Content