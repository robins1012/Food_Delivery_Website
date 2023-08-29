import React from 'react'

const Carousal = () => {
    return (
        <>
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: 'contain', marginBottom: '20px', marginTop: '43px' }}>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/300x300/?burger" className="d-block w-100" alt="error loading" style={{ filter: 'brightness(80%)', width: '500px', height: '500px' }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/300x300/?pizza" className="d-block w-100" alt="error loading" style={{ filter: 'brightness(80%)', width: '500px', height: '500px' }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/300x300/?pastry" className="d-block w-100" alt="error loading" style={{ filter: 'brightness(80%)', width: '500px', height: '500px' }} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>        </>
    )
}

export default Carousal
