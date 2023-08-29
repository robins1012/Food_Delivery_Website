import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo/truck.png'
import './Navbar_Footer.css'
const Footer = () => {
    return (
        <div className="container-fluid">
            <footer className="py-3 my-4">
                <div id="footer_logo">
                    <img id='navLogo' src={logo} alt="" /> <span id="navLogoHead">Express Delivery</span>
                </div>
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">Github</Link></li>
                    <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">LinkedIn</Link></li>
                    <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">Instagram</Link></li>
                    <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">Facebook</Link></li>
                </ul>
                <p className="text-center text-muted px-2 font_black">© Express Delivery, 2023</p>
            </footer>
        </div>
    )
}

export default Footer
