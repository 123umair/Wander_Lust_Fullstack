
import './App.css'
import Display_Listings from './components/Display_Listings/Display_Listings'
import Display_Content from './components/Display_Content/Display_Content'
import Form from './components/Form/Form'
import { Routes, Route, } from 'react-router-dom'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Display_Listings />} />
        <Route path={`/listings/:id`} element={<Display_Content />} />
        <Route path={`/listings/create_listing`} element={<Form />} />

      </Routes>
    </>
  )
}

export default App
