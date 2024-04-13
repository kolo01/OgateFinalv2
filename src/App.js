import { Route, Routes } from 'react-router-dom';
import './App.css';
import React  from 'react'
import NavBar from './components/NavBar/NavBar';
import LoginHome from './pages/Home/LoginHome';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import HomePage from './pages/Home/HomePage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function App() {
    return (
        <>
        <ToastContainer> </ToastContainer>
            <NavBar/>
            <Routes>
                <Route path='/' element={<LoginHome/>}/>
                <Route path='/home-page' element={<HomePage/>}/>
                <Route path='/sign-up' element={<SignUp/>}/>
                <Route path='/sign-in' element={<SignIn/>}/>
            </Routes>
           
        </>
    )
}