
import { useEffect, useState } from 'react'
import Carousal from './Carousal'
const Home = () => {
    const [foodCat, setFoodCat] = useState([])
    const [foodItem, setFoodItem] = useState([])
    const loadData = async () => {
        const response = await fetch('http://localhost:8000/display/foodData', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            },
            credentials: 'include'
        })

        //console.log("Response is :" + response)
        const data = await response.json();
        //console.log("Data is: " + data)
        setFoodCat(data[0])
        setFoodItem(data[1])
        //console.log(data[0])
        //console.log(data[1])
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <>
            <Carousal />
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
                                                (item.CategoryName === data.CategoryName)
                                            ).map((filterItems) => {
                                                return (
                                                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                        {/* <Card foodName={filterItems.name} options={filterItems.options[0]} img={filterItems.img} /> */}
                                                        <div className="card mb-3" style={{ width: '18rem', height: '300px' }}>
                                                            <img src={filterItems.img} className="card-img-top" alt="" style={{ height: '120px', objectFit: 'fill' }} />
                                                            <div className="card-body">
                                                                <h5 className="card-title">{filterItems.name}</h5>
                                                                <p className="card-text">{filterItems.description}</p>
                                                            </div>
                                                        </div>
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

export default Home
