import './App.css'
import { Suspense, lazy } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'


const Footer = lazy(() => import("./components/Footer/Footer"))
const Display_Listings = lazy(() => import('./components/Display_Listings/Display_Listings'))
const Display_Content = lazy(() => import('./components/Display_Content/Display_Content'))
const Edit_Listing = lazy(() => import('./components/Edit_Listing/Edit_Listing'))
const SignupForm = lazy(() => import('./components/Form/SignupForm'))
const LoginForm = lazy(() => import('./components/Form/LoginForm'))
import Form from './components/Form/Form'

function App() {
  return (
    <div className="app-container">

      <Navbar />

      <Suspense fallback={<h2>Loading page...</h2>}>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Display_Listings />} />
            <Route path="/listings/:id" element={<Display_Content />} />
            <Route path="/listings/create_listing" element={<Form />} />
            <Route path="/listings/:id/edit" element={<Edit_Listing />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </main>
        <Footer />

      </Suspense>

    </div>
  )
}

export default App