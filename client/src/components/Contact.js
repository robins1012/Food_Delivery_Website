import React, { useEffect, useState } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './Contact.css'
import { useNavigate } from 'react-router-dom';


const Contact = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: "", email: "", phone: "", message: "" })
    const callContactPage = async (e) => {
        try {
            const response = await fetch('http://localhost:8000/user/about', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                },
                credentials: 'include'
            })
            const data = await response.json();
            setUser({ ...user, name: data.name, email: data.email, phone: data.contactNo })
            if (response.status !== 200) {
                //console.log("Error 2 Is: " + response.error)
                throw new Error(response.error)
            }
        } catch (error) {
            //console.log("Error 3 is " + error)
            navigate('/login')
        }
    }
    useEffect(() => {
        //console.log("Calling page")
        callContactPage();
    }, [])

    //storing data in states
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value })
    }

    //sending data to backend
    const contactForm = async (e) => {
        e.preventDefault();
        const { name, email, phone, message } = user
        const res = await fetch('http://localhost:8000/user/contact', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({
                name: name, email: email, phone: phone, message: message
            })
        })
        const data = await res.json();
        console.log(data)
        if (!data || res.status !== 200) {
            console.log("message not send!");
        } else {
            alert("message send successfully!");
            setUser({ ...user, message: "" })
        }
    }

    return (
        <>
            <div className="container pt_80 contactus">
                <div className="row d-flex justify-content-center">
                    <div className="desc col-lg-4 col-12 section">
                        <h2><b>STAY IN TOUCH</b></h2>
                        <p>We were open to any suggestion</p>
                        <p>Feel free to contact</p>
                        <div className="detail">
                            Address:<address>
                                24E,
                                Rajiv Nagar
                                Road No 25B
                                Patna-800024
                            </address>
                            Email:<span>robins2001@gmail.com</span>
                            <br /><br />
                            Contact No:<span>+919988776655</span>
                        </div>
                        <div>
                            <p>Follow us here</p>
                            <div className="row">
                                <div className="col-md-3 a">
                                    FACEBOOK
                                </div>
                                <div className="col-md-3 a">
                                    INSTAGRAM
                                </div>
                                <div className="col-md-3 a">
                                    LINKEDIN
                                </div>
                                <div className="col-md-3 a">
                                    GITHUB
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-12 section">
                        <form method="POST" onSubmit={contactForm}>
                            <input type="text" name="name" id="name" value={user.name} onChange={handleInputs} className='textField' required />

                            <input type="email" name="email" id="email" value={user.email} onChange={handleInputs} className='textField' required />

                            <input type="phone" name="phone" id="phone" value={user.phone} onChange={handleInputs} className='textField' required />
                            <h3>Message:</h3>
                            <textarea name="message" id="message" value={user.message} onChange={handleInputs} cols="" className='textField' required></textarea><br />
                            <button className='btn btn-primary'>Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact
