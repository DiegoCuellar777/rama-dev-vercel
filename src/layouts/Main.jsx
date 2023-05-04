import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import { Outlet } from 'react-router-dom';

export default function Main() {
    const location = useLocation();
    const viewNav = location.pathname === '/' || location.pathname === '/author-form' || location.pathname === "/manga-form" || location.pathname === '/chapter-form' || location.pathname === '/LogIn';

    return (
        <div className="min-h-screen bg-black">
            {viewNav && <Nav />}
            <Outlet />
            <Footer />
        </div>
    );
}

