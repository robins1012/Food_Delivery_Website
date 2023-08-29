import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Logout = () => {

    const { state, dispatch } = useContext(UserContext);

    const navigate = useNavigate();
    const [user, setUser] = useState({})
    const callLogoutPage = async (e) => {

        try {
            const response = await fetch('http://localhost:8000/user/logout', {
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
                //console.log("Error 2 Is: " + response.error)
                throw new Error(response.error)
            }
        } catch (error) {
            dispatch({ type: "USER", payload: false })
            //console.log("Error 3 is " + error)
            navigate('/login')
        }
    }
    useEffect(() => {
        //console.log("Calling page")
        callLogoutPage();
    }, [])


    return (
        <div>
            <h4>This is User logout page</h4>
        </div>
    )
}

export default Logout
