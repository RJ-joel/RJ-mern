import { useState, useEffect } from 'react';
import './App.css';
import './index.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import AddParcel from './components/AddParcel';
import EditParcel from './components/EditParcel';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Bounce } from 'react-toastify';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className='bg-gray-200 p-6'>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/addparcel" element={<AddParcel />} />
            <Route path="/editparcel/:id" element={<EditParcel />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false}
          closeOnClick={true} transition={Bounce} theme="colored" />
      </BrowserRouter>
    </>
  );
}

export default App;
