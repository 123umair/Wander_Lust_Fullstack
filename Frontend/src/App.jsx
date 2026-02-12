
import './App.css'
import Display_Listings from './components/Display_Listings/Display_Listings'
import Display_Content from './components/Display_Content/Display_Content'
import { Routes, Route } from 'react-router'
function App() {

  return (
    <>
      <Display_Listings />
      <Routes>
        <Route path={`/listings/$:id`} element={<Display_Content />} />

      </Routes>
    </>
  )
}

export default App
