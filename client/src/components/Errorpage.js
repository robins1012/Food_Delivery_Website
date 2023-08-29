import React from 'react'
import { Link } from 'react-router-dom'
const Errorpage = () => {
    return (
        <>
            <div className="error" style={{ width: '500px', height: '600px', 'marginTop': '15%', marginLeft: '37%' }}>
                <div className="notfound">
                    <h1>404</h1>
                    <p>Sorry, this page is not found</p>
                </div>
                <div className="reason">
                    <p>the page you are looking for might have been removed, had its name changed or temporarily not available</p>
                </div>
                <Link to='/'>Back to Homepage</Link>
            </div>
        </>
    )
}

export default Errorpage
