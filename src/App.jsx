import { useState } from 'react'
import { BrowserRouter , Routes,Route } from 'react-router-dom';
import Header from './Header/Header'
import Home from './Pages/Home';
import Slider from './Slider/Slider';
import DataProvider from './context/DataProvider';
import Footer from './footer/Footer';
// import './App.css'
import Property from './Pages/property/Property';
import EmailVerification from './Pages/verification/Verify';
import Form from './Pages/PropertyForm/Form';
import IdListing from './ListingPages/IdListing';
import ForgetPassword from './Forget/ForgetPassword';

function App() {
  

  return (
    <>
    
    
    {/* <Router>
      
         
         <Header />
         
        <Routes>
          <Route path="/xyz"  component={<Home />} />
        </Routes>
     

    </Router> */}

   <BrowserRouter>
   <DataProvider>
    
            <Header/>
            <div >

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/listing/properties/form" element={<Form/>}/>
                <Route path="/listing/properties" element={<Property/>}/>
                <Route path="/verify/:token" element={<EmailVerification/>}/>
                 <Route path ="/listing/properties/:id" element={<IdListing/>}/>
                 <Route path="/reset-password/:id" element={<ForgetPassword/>} />
            </Routes>
            </div>
            <Footer/>
   </DataProvider>
   </BrowserRouter>

    </>
  )
}

export default App
