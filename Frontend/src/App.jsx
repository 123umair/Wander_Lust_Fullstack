
import './App.css'
import Display_Listings from './components/Display_Listings/Display_Listings'
import Display_Content from './components/Display_Content/Display_Content'
import { Routes, Route } from 'react-router-dom'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Display_Listings />} />
        <Route path={`/listings/:id`} element={<Display_Content />} />

      </Routes>
    </>
  )
}

export default App
