import './App.css'
import { Suspense, lazy, useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { LoaderCircle } from 'lucide-react';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

const Footer = lazy(() => import("./components/Footer/Footer"))
const Display_Listings = lazy(() => import('./components/Display_Listings/Display_Listings'))
const Display_Content = lazy(() => import('./components/Display_Content/Display_Content'))
const Edit_Listing = lazy(() => import('./components/Edit_Listing/Edit_Listing'))
const SignupForm = lazy(() => import('./components/Form/SignupForm'))
const LoginForm = lazy(() => import('./components/Form/LoginForm'))
import Form from './components/Form/Form'

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_URL;

  // REFRESH PAR SESSION ZINDA RAKHNE KE LIYE
  useEffect(() => {
    const userChecked = async () => {
      try {
        const res = await axios.get(`${API}/check-auth`, { withCredentials: true });
        if (res.data && res.data.user) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log("error", error)
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    userChecked();
  }, [API]);

  if (loading) return <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>  <LoaderCircle></LoaderCircle></h2>;

  return (
    <div className="app-container">
      {/* 1. Navbar ko direct props pass kiya */}
      <Navbar user={user} setUser={setUser} />

      <Suspense fallback={<h2>Loading page...</h2>}>
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Display_Listings />} />
            <Route path="/listings/:id" element={<Display_Content />} />
            {/* <Route path="/listings/create_listing" element={<Form />} /> */}
            {/* <Route path="/listings/:id/edit" element={<Edit_Listing />} /> */}
            <Route path="/signup" element={<SignupForm setUser={setUser} />} />
            <Route path="/login" element={<LoginForm setUser={setUser} />} />


            <Route
              path="/listings/create_listing"
              element={
                <ProtectedRoute user={user}>
                  <Form />
                </ProtectedRoute>
              } />

            <Route
              path="/listings/:id/edit"
              element={
                <ProtectedRoute user={user}>
                  <Edit_Listing />
                </ProtectedRoute>
              } />


          </Routes>

        </main>
        <Footer />
      </Suspense>
    </div>
  )
}

export default App;