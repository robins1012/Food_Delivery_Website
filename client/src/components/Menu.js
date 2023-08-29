import React, { useEffect, useState } from 'react'
import Card from './Card'

const Menu = () => {

    const [foodCat, setFoodCat] = useState([])
    const [foodItem, setFoodItem] = useState([])
    const [search, setSearch] = useState('')

    const loadData = async () => {
        const response = await fetch('http://localhost:8000/display/foodData', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            },
            credentials: 'include'
        })
        const data = await response.json();
        setFoodCat(data[0])
        setFoodItem(data[1])
    }

    useEffect(() => {
        loadData()
    }, [])


    return (
        <>
            <div className="d-flex justify-content-center" style={{ width: '40rem', margin: 'auto' }}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => {
                    setSearch(e.target.value)
                }} />
            </div>

            <div className="container">
                {
                    foodCat !== []
                        ? foodCat.map((data) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
                                    <hr />
                                    {
                                        foodItem !== []
                                            ? foodItem.filter((item) =>
                                                (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))
                                            ).map((filterItems) => {
                                                return (
                                                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                        {/* <Card foodName={filterItems.name} options={filterItems.options[0]} img={filterItems.img} /> */}
                                                        <Card food={filterItems} options={filterItems.options[0]} />
                                                    </div>
                                                )
                                            }
                                            ) : <div>No Such Data Fund</div>
                                    }
                                </div>
                            )
                        }) : <div>""</div>
                }
            </div>


        </>
    )
}

export default Menu
