import React, { useEffect, useState } from 'react'

const Messages = () => {
    const [user, setUser] = useState([])

    const callAboutPage = async (e) => {
        try {
            const response = await fetch('http://localhost:8000/display/getAllMessages', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                },
                credentials: 'include'
            })
            const data = await response.json();
            setUser(data)

            if (!data)
                throw new Error("error")
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
        <div>
            <h1 style={{ marginTop: '2%', textAlign: 'center' }}>Messages</h1>

            <div className="user">
                {
                    user.length !== 0 ?
                        user.map((element) => {
                            return (
                                <>
                                    <div>
                                        <h5 style={{ fontWeight: 'bold', color: 'red', marginRight: '10px' }}>User Email: <span style={{ color: 'blue' }}> {element.email}</span></h5>
                                        <table>
                                            {
                                                element.messages.map((msg) => {
                                                    return (
                                                        <>
                                                            <tr>
                                                                <th style={{ paddingRight: '5px' }}>Date</th>
                                                                <td>{msg.date}</td>
                                                            </tr>
                                                            <tr>
                                                                <th style={{ paddingRight: '5px' }}>Message</th>
                                                                <td>{msg.message}</td>
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }
                                        </table>
                                    </div>
                                    <br />
                                </>
                            )
                        })
                        : ""
                }
            </div>
        </div>
    )
}

export default Messages
