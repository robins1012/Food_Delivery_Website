import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './Login_Signup.css'

import { UserContext } from '../App'

const Login = () => {

    const { state, dispatch } = useContext(UserContext);

    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userValidate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8000/user/signin', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })

            const data = await res.json();
            if (!data || data === '500')
                throw new Error('Invalid Credentials')
            //console.log(data.userLogin.isAdmin)

            dispatch({ type: "USER", payload: true })
            window.alert('Login Successfull')
            if (data.userLogin.isAdmin === true) {
                navigate('/admin')
            } else {
                navigate('/')
            }
        } catch (err) {
            window.alert('Invalid Credentials');
            setEmail('')
            setPassword('')
        }
    }

    return (
        <>
            <section className="signin">
                <div className="container mt-5">
                    <div className="signup-content row justify-content-center">
                        <div className="signup-form col-md-4" id='signin-form'>
                            <h2 className="form-title">Sign in</h2>
                            <h6 className='form-desc'>Login to your account</h6>
                            <form className="register-form" id="register-form">
                                <div className="form-group">
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email material-icons-name"></i>
                                    </label>
                                    <input type="email" required name='email' id='email' autoComplete='off' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">
                                        <i className="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type="password" required name='password' id='password' autoComplete='off' placeholder='Enter password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" value="Login" name='signin' id='signin' className='btn btn-primary form-submit' onClick={userValidate} />
                                </div>
                            </form>
                            <div className="login_footer">
                                <p>Not a registered User?</p>
                                <Link to='/signup'>Sign Up Now!</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
