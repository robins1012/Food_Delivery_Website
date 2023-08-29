import React, { useEffect, useState } from 'react'

export default function MyOrder() {

    const [orderData, setorderData] = useState([])

    const fetchMyOrder = async () => {
        let res = await fetch("http://localhost:8000/user/about", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            },
            credentials: 'include'
        })
        const dataEmail = await res.json();
        const userEmail = dataEmail.email
        await fetch("http://localhost:8000/display/myOrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                email: userEmail
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response.order_data)
            console.log("order;;" + response)
            console.log(response.email + "*************")
            console.log(response.order_data)
        })
    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div>
            <div className="container">
                <div className="row">
                    <h1 style={{ marginTop: '4rem', color: 'red', textAlign: 'center' }}>Previous Orders</h1>
                    {orderData.length !== 0 ? (
                        orderData.reverse().map((data, index) => (
                            <div key={index} style={{ marginBottom: '50px' }}>
                                <div className='m-auto'>
                                    <span style={{ color: 'red' }}>Date: {data.orderDate}</span>
                                    <hr />
                                </div>
                                {data.orderDetails.map((item, itemIndex) => (
                                    <div key={itemIndex}>
                                        {/* Render the details of each order item here */}
                                        <div className='col-12 col-md-6 col-lg-3' >
                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
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
                                ))}
                                <div className='m-auto'>
                                    <span style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>Total Price: {data.totalPrice}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No orders found.</p>
                    )}

                </div>
            </div>
        </div>
    )
}
