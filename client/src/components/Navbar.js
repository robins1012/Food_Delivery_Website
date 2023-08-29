import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo/truck.png'
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './Navbar_Footer.css'
import { UserContext } from '../App'
import { useCart } from './reducer/ContextReducer'
import Modal from '../Modal'
import Cart from './Cart'
function Navbar() {

    const [cartView, setCartView] = useState(false)
    const loadCart = () => {
        setCartView(true)
    }
    const items = useCart();

    const tokenRef = useRef(null);

    const { state, dispatch } = useContext(UserContext);
    const RenderMenu = () => {
        if (!state) {
            return (
                <>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup">Sign up</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                </>
            )
        } else {
            return (
                <>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/menu">Menu</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">My Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/contact">Contact us</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/order">My Orders</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" onClick={loadCart}><i className="zmdi zmdi-hc-lg zmdi-shopping-cart"><span class="badge badge-danger badge-pill" style={{ color: "red", fontSize: '1.1rem', marginLeft: '0', paddingLeft: '0' }}>{items.length}</span></i></Link>
                    </li>
                    {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
                    <li className="nav-item">
                        <Link className="nav-link" to="/logout">Logout</Link>
                    </li>
                </>
            )
        }
    }
    useEffect(() => {
        // To get a specific cookie
        function getCookie(name) {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + '=')) {
                    return cookie.substring(name.length + 1);
                }
            }
            return null;
        }

        // Usage
        tokenRef.current = getCookie('token');
        console.log("token in browser is " + tokenRef);
        if (tokenRef.current) {
            dispatch({ type: "USER", payload: tokenRef.current });
        } else {
            dispatch({ type: "USER", payload: null });
        }
    });



    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img id='navLogo' src={logo} alt="logo not loaded" /> <span id="navLogoHead">Express Delivery</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <RenderMenu />
                        </ul>
                    </div>
                </div>
            </nav >


        </>
    )
}

export default Navbar
