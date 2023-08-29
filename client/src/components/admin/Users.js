import React, { useEffect, useState } from 'react'
import './Users.css'

const Users = () => {
    let sno1 = 1
    const [user, setUser] = useState([])
    const callAboutPage = async (e) => {
        try {
            const response = await fetch('http://localhost:8000/user/getAll', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                },
                credentials: 'include'
            })
            const data = await response.json();
            console.log(data)
            if (!data)
                throw new Error("error")
            setUser(data)
            //console.log(user)

            if (response.status !== 200) {
                throw new Error(response.error)
            }
        } catch (error) {
        }
    }
    useEffect(() => {
        callAboutPage();
    }, [])


    return (
        <>
            <h2 className='userHeading'>Users</h2>
            <div className="user">
                <table class="table">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">ContactNo</th>
                            <th scope="col">Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user.map((element) => {
                                if (element.isAdmin !== true) {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{sno1++}</th>
                                                <td>{element.name}</td>
                                                <td>{element.email}</td>
                                                <td>{element.contactNo}</td>
                                                <td>{element.address}</td>
                                            </tr>
                                        </>
                                    )
                                } else {
                                    return ""
                                }
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Users
