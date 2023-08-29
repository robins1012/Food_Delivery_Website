import React, { useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo/truck.png'
import { UserContext } from '../../App';
function Navbar() {
    const tokenRef = useRef(null);
    const { state, dispatch } = useContext(UserContext);
    const RenderMenu = () => {
        if (!state) {
            //if (!state) {
            return (
                <>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/admin">Home</Link>
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
                        <Link className="nav-link active" aria-current="page" to="/admin">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/adminAbout">My Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/users">Users</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/userOrders">Orders</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/userMessages">Messages</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/foods">Foods</Link>
                    </li>
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
                        <img id='navLogo' src={logo} alt="" /> <span id="navLogoHead">Express Delivery</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <RenderMenu />
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
