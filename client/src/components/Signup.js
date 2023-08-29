import React, { useState } from 'react'
import './Login_Signup.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './Login_Signup.css'
import { Link, useNavigate } from 'react-router-dom'
const Signup = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: '', address: '', email: '', contact: '', password: '', cpassword: ''
    });
    const [isAdmin, setAdmin] = useState(false)
    const [secretKey, setSecretKey] = useState('')

    let name, value;
    const handleInputs = (e) => {
        //console.log(e)
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }

    const postData = async (e) => {
        const { name, address, email, contact, password, cpassword } = user;

        if (isAdmin === true && secretKey !== "Admin") {
            e.preventDefault();
            window.alert("Invalid admin");
        } else {

            e.preventDefault();

            try {
                const res = await fetch("http://localhost:8000/user/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        isAdmin: isAdmin,
                        name: name,
                        address: address,
                        email: email,
                        contact: contact,
                        password: password,
                        cpassword: cpassword
                    })
                });

                const data = await res.json();
                if (!data || data === '500')
                    throw new Error('invalid Credentials!')
                window.alert('Registration successfull')
                navigate('/login');
            } catch (err) {
                window.alert('Invalid credentials');
                setUser({ name: '', address: '', email: '', contact: '', password: '', cpassword: '' })
                setSecretKey('')
                setAdmin(false)
            }
        }
    }

    return (
        <div>
            <section className="signup">
                <div className="container mt-5">
                    <div className="signup-content row d-flex justify-content-center">
                        <div className="col-md-4 signup-desc">
                            <h2 className="form-title">Sign Up</h2>
                            <h4 className="form-desc">Create a new account</h4>
                            <h6 className='form-title'
                            >WELCOME TO THE EXPRESS DELIVERY</h6>
                            <p className='form-title'>Sign up for free and become our member</p>
                            <div className="signup_footer">
                                <p>Already have an account?</p>
                                <Link to='/login'>Sign In Now!</Link>
                            </div>
                        </div>
                        <div className="signup-form col-md-4">
                            <form method='POST' onSubmit={postData} className="register-form" id="register-form">

                                <div className='radio_btn'>
                                    <span> Register As</span>
                                    <input
                                        type="radio"
                                        name="UserType"
                                        value={false}
                                        onChange={(e) => { setAdmin(false) }}
                                    />
                                    <span>User</span>
                                    <input
                                        type="radio"
                                        name="UserType"
                                        value={true}
                                        onChange={(e) => { setAdmin(true) }}
                                    />
                                    <span>Admin</span>
                                </div>

                                {
                                    isAdmin === true ? (
                                        <div className="mb-3">
                                            <div className="form-group">
                                                <label htmlFor="password">
                                                    <i className="zmdi zmdi-lock material-icons-name"></i>
                                                </label>
                                                <input type="text" name='secretkey' id='secretkey' autoComplete='off' placeholder='Enter secret key' value={secretKey} onChange={(e) => { setSecretKey(e.target.value) }} />
                                            </div>
                                        </div>
                                    ) : null
                                }


                                <div className="form-group">
                                    <label htmlFor="fname">
                                        <i className="zmdi zmdi-account material-icons-name"></i>
                                    </label>
                                    <input type="text" required name='name' id='name' autoComplete='off' placeholder='Enter your name' value={user.name} onChange={handleInputs} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email material-icons-name"></i>
                                    </label>
                                    <input type="email" required name='email' id='email' autoComplete='off' placeholder='Enter email' value={user.email} onChange={handleInputs} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contact">
                                        <i className="zmdi zmdi-phone-in-talk material-icons-name"></i>
                                    </label>
                                    <input type="tel" pattern='[0-9]{10}' required name='contact' id='contact' autoComplete='off' placeholder='Enter contact no' value={user.contact} onChange={handleInputs} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username">
                                        <i className="zmdi zmdi-account material-icons-name"></i>
                                    </label>
                                    <input type="text" required name='address' id='address' autoComplete='off' placeholder='Enter your address' value={user.address} onChange={handleInputs} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">
                                        <i className="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type="password" required name='password' id='password' autoComplete='off' placeholder='Enter password' value={user.password} onChange={handleInputs} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cpassword">
                                        <i className="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type="password" required name='cpassword' id='cpassword' autoComplete='off' placeholder='Enter confirm password' value={user.cpassword} onChange={handleInputs} />
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" value="register" name='signup' id='signup' className='btn btn-primary form-submit' //onClick={postData} 
                                    />
                                </div>
                            </form>

                        </div>
                    </div>
                </div >
            </section >
        </div >
    )
}

export default Signup
