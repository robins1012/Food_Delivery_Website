import React, { useEffect, useState } from 'react'

const Card = (props) => {

    const deleteFood = async (id) => {
        let confirm = window.confirm("Do you want to delete?");
        if (confirm) {
            try {
                const res = await fetch(`http://localhost:8000/food/delete/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: 'include'
                });

                const data = await res.json();
                if (!data || res.status !== 200)
                    throw new Error('invalid Credentials!')
                window.alert('Deleted Successfully')

            } catch (err) {
                window.alert('Invalid credentials');
                console.log(err)
            }
        }
    }
    const updateFood = async (id) => {

        try {
            const res = await fetch(`http://localhost:8000/food/update/${id}`, {
                method: "UPDATE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                    name: 'jk',
                    img: '',
                    options: [

                    ]
                }),
                credentials: 'include'
            });

            const data = await res.json();
            if (!data || res.status !== 200)
                throw new Error('invalid Credentials!')
            window.alert('Updated Successfully')

        } catch (err) {
            window.alert('Invalid credentials');
            console.log(err)
        }
    }

    let options = props.options
    let price = Object.keys(options)
    let fooditems = props.food
    return (
        <>

            <div className="card mb-3" style={{ width: '18rem', height: '340px' }}>
                <img src={fooditems.img} className="card-img-top" alt="" style={{ height: '120px', objectFit: 'fill' }} />
                <div className="card-body">
                    <h5 className="card-title">{fooditems.name}</h5>
                    <div className="container w-100 " style={{ marginTop: '40px' }}>
                        <table>
                            <tr>
                                <th>Quantity</th>
                                <th>Cost</th>
                            </tr>{
                                price.filter((item) => item !== '_id'
                                ).map((data) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{data}</td>
                                                <td>{options[data]}</td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </table>
                        <span className="editFood" style={{ marginTop: '10px', marginRight: '40px' }}><i className="zmdi zmdi-edit zmdi-hc-lg"></i></span>
                        <span className="editFood" style={{ marginTop: '10px', marginRight: '40px' }}><i className="zmdi zmdi-delete zmdi-hc-lg" onClick={() => deleteFood(fooditems._id)}></i></span>
                    </div>
                </div>
            </div>
        </>
    )
}


const Foods = () => {
    const [foodCat, setFoodCat] = useState([])
    const [foodItem, setFoodItem] = useState([])

    const [food, setFood] = useState({
        name: '', img: '', desc: ''
    })
    const [category, setCategory] = useState('')
    const [foodOption, setFoodOption] = useState({})
    const [price1, setPrice1] = useState({ half: '', full: '' })
    const [price2, setPrice2] = useState({ regular: '', medium: '', large: '' })
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setFood({ ...food, [name]: value });
    }

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
    })

    const postData = async (e) => {
        e.preventDefault();
        try {
            if (category === 'Pizza')
                await setFoodOption({
                    "regular": price2.regular,
                    "medium": price2.medium,
                    "large": price2.large
                })
            else
                await setFoodOption({
                    "half": price1.half,
                    "full": price1.full
                })
            const res = await fetch("http://localhost:8000/food", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    CategoryName: category,
                    name: food.name,
                    img: food.img,
                    options: [
                        foodOption
                    ],
                    description: food.desc
                })
            });

            const data = await res.json();
            if (!data || data === '500')
                throw new Error('invalid Credentials!')
            window.alert('Food added successfully')
        } catch (err) {
            window.alert('Invalid credentials');
        }
    }

    return (
        <>
            <div className="container" id='content'>
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
            </div >
            <hr />
            <div>
                <div className="container" id='food_form' style={{ backgroundColor: 'whitesmoke' }}>
                    <div className="row">
                        <h1 style={{ color: 'red' }}>Add Food Items</h1>
                        <div className="container-fluid" style={{ backgroundColor: 'white' }}>
                            <div className="row">
                                <div className="col-md-6">
                                    <form method='POST' onSubmit={postData}>
                                        <div className='radio_btn'>
                                            <input
                                                type="radio"
                                                name="foodType"
                                                value="Pizza"
                                                onChange={(e) => { setCategory('Pizza') }}
                                            />
                                            <span style={{ color: 'black' }}>Pizza</span>
                                            <input
                                                type="radio"
                                                name="foodType"
                                                value="Biryani/Rice"
                                                onChange={(e) => { setCategory('Biryani/Rice') }}
                                            />
                                            <span style={{ color: 'black' }}>Biryani/Rice</span>
                                            <input
                                                type="radio"
                                                name="foodType"
                                                value="Starter"
                                                onChange={(e) => { setCategory('Starter') }}
                                            />
                                            <span style={{ color: 'black' }}>Starter</span>
                                        </div>
                                        <label htmlFor="name">Food name<input type="text" value={food.name} id='name' name='name' onChange={handleInputs} className='form-control' /></label>
                                        <label htmlFor="img">Image Link <input type="text" onChange={handleInputs} id='img' value={food.img} name='img' className='form-control' /></label>
                                        {
                                            category === 'Pizza' ? <div>
                                                <label htmlFor="regular">Regular Size: Rs.<input type="text" value={price2.regular} onChange={(e) => setPrice2({ ...price2, "regular": e.target.value })} name="regular" id="regular" className='form-control' /></label>
                                                <label htmlFor="medium">Medium Size: Rs.<input type="text" value={price2.medium} onChange={(e) => setPrice2({ ...price2, "medium": e.target.value })} className='form-control' name="medium" id="medium" /></label>
                                                <label htmlFor="large">Large Size: Rs.<input type="text" value={price2.large} onChange={(e) => setPrice2({ ...price2, "large": e.target.value })} className='form-control' name="large" id="large" /></label>
                                            </div> : <div>
                                                <label htmlFor="half">Half Plate: Rs.<input type="text" value={price1.half} onChange={(e) => setPrice1({ ...price1, "half": e.target.value })} className='form-control' name="half" id="half" /></label>
                                                <label htmlFor="full">Full Plate: Rs.<input type="text" value={price1.full} onChange={(e) => setPrice1({ ...price1, "full": e.target.value })} className='form-control' name="full" id="full" /></label>
                                            </div>
                                        }
                                        <label htmlFor="text-field"><textarea placeholder='Enter description' id='desc' name='desc' onChange={handleInputs} value={food.desc} className='form-control'></textarea></label>
                                        <button className='btn btn-primary'>submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Foods
