import './App.css'
import Navbar from './components/Navbar/Navbar' // Import your new Navbar
import Footer from './components/Footer/Footer' // Import your new Footer
import Display_Listings from './components/Display_Listings/Display_Listings'
import Display_Content from './components/Display_Content/Display_Content'
import Edit_Listing from './components/Edit_Listing/Edit_Listing'
import Form from './components/Form/Form'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Display_Listings />} />
          <Route path="/listings/:id" element={<Display_Content />} />
          <Route path="/listings/create_listing" element={<Form />} />
          <Route path="/listings/:id/edit" element={<Edit_Listing />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App