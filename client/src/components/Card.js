import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './reducer/ContextReducer'

const Card = (props) => {

    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();

    let options = props.options
    let price = Object.keys(options)
    let fooditems = props.food

    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")

    const handleAddToCart = async () => {

        let food = []
        for (const item of data) {
            if (item.id === fooditems._id) {
                food = item;

                break;
            }
        }
        console.log(food)
        console.log(new Date())
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: fooditems._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: fooditems._id, name: fooditems.name, price: finalPrice, qty: qty, size: size, img: fooditems.img })
                console.log(data)
                console.log("Size different so simply ADD one more to the list")
                return
            }
            return
        }

        await dispatch({ type: "ADD", id: fooditems._id, name: fooditems.name, price: finalPrice, qty: qty, size: size, img: fooditems.img })
    }
    const finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (
        <>
            <div className="card mb-3" style={{ width: '18rem', height: '400px' }}>
                <img src={fooditems.img} className="card-img-top" alt="" style={{ height: '120px', objectFit: 'fill' }} />
                <div className="card-body">
                    <h5 className="card-title">{fooditems.name}</h5>
                    <p className="card-text">{fooditems.description}</p>
                    <div className="container w-100">
                        <select name="" id="" className="m-2 h-100 bg-light rounded" onChange={(e) => setQty(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                        <select className="m-2 h-100 bg-light rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {
                                price.filter((item) => item !== '_id'
                                ).map((data) => {
                                    return (
                                        <option value={data} key={data}>{data}</option>
                                    )
                                })
                            }
                        </select>
                        <div className='d-inline h-100 fs-8'>
                            Rs.{finalPrice}/-
                        </div>
                    </div>
                    <hr />

                    <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </>
    )
}

export default Card
