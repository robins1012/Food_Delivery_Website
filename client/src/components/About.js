import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './About.css'

const About = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({})
    const callAboutPage = async (e) => {

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
            setUser(data)
            if (response.status !== 200) {
                throw new Error(response.error)
            }
        } catch (error) {
            navigate('/login')
        }
    }
    useEffect(() => {
        callAboutPage();
    }, [])

    return (
        <>
            <div className="about_content">
                <h1>Hi {user.name}</h1>
                <h5>This is your Profile Page</h5>
            </div>
            <div className="container about">
                <div className="row d-flex justify-content-center">
                    <div>
                        <h2 style={{ textAlign: 'center' }}>My Profile</h2>
                    </div>
                    <hr style={{ marginTop: '30px' }} />
                    <div className="col-md-6" style={{ marginTop: '30px' }}>
                        <table className='about_table'>
                            <tr className='about_row'>
                                <th className='about_head'>Name</th>
                                <td>{user.name}</td>
                            </tr >
                            <tr className='about_row'>
                                <th className='about_head'>Email</th>
                                <td>{user.email}</td>
                            </tr>
                            <tr className='about_row'>
                                <th className='about_head'>Contact</th>
                                <td>{user.contactNo}</td>
                            </tr>
                            <tr className='about_row'>
                                <th className='about_head'>Address</th>
                                <td>{user.address}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div >
        </>
    )
}

export default About
