import React from 'react'
import {useEffect,useState} from 'react'
import axios from 'axios'
const FetchHook =  (url) => {
  const [data,setData]=useState('')
  const [loading,setLoading] = useState('')
  const [error,setError]=useState('')
  
  useEffect(() => {
  const fetchData = async()=>{
    const res = await axios.get(url)
    const data = res.data
    setData(data)
    
  }
  fetchData()

}, [url])

  
  return {loading,data,fetchData,error}
}

export default FetchHook