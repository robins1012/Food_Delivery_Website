import React, { useEffect, useState } from 'react'

const Orders = () => {
    const [user, setUser] = useState([])
    const callAboutPage = async (e) => {
        try {
            const response = await fetch('http://localhost:8000/display/getAllOrders', {
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
            <h1 style={{ marginTop: '2%', textAlign: 'center' }}>Orders</h1>

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
                                                element.order_data.reverse().map((order) => {
                                                    return (
                                                        <>
                                                            <tr>
                                                                <th style={{ paddingRight: '5px' }}>Date</th>
                                                                <td>{order.orderDate}</td>
                                                            </tr>
                                                            <tr>
                                                                <th style={{ paddingRight: '5px' }}>Price</th>
                                                                <td>₹{order.totalPrice}</td>
                                                            </tr>
                                                            {order.orderDetails.map((item, itemIndex) => (
                                                                <div className="">
                                                                    <div key={itemIndex} className='container'>
                                                                        {/* Render the details of each order item here */}
                                                                        <div className='row' >
                                                                            <div className="card mt-3 col-12 col-md-6 col-lg-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                                <img src={item.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                                                <div className="card-body">
                                                                                    <h5 className="card-title">{item.name}</h5>
                                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                                        <span className='m-1'>{item.qty}</span>
                                                                                        <span className='m-1'>{item.size}</span>
                                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                                            ₹{item.price}/-
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <br />
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

export default Orders
