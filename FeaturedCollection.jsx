import React from 'react'
import collection_img from '../images/collection_img.png'
import six from '../images/six.png'
const FeaturedCollection = () => {
  return (
    <div className="wrapper collection-section">
    <div className="wrapper-section ">
      <div className="collection-section">
        <div className="collection-heading">
          <h2>Discover Locations</h2>
        </div>
        <div className="collection-cards">
          <div className="collection-card">
            <div className='collection-card-img'>
              <img src={six} alt="" />
            </div>
            <div className='collection-card-content'>
              <div className="explore">
                <button>Explore</button>
              </div>
              <div className="card-name">
                <h4>California</h4>
              </div>
            </div>
          </div>
          <div className="collection-card">
            <div className='collection-card-img'>
              <img src={six} alt="" />
            </div>
            <div className='collection-card-content'>
              <div className="explore">
                <button>Explore</button>
              </div>
              <div className="card-name">
                <h4>California</h4>
              </div>
            </div>
          </div>
          <div className="collection-card">
            <div className='collection-card-img'>
              <img src={collection_img} alt="" />
            </div>
            <div className='collection-card-content'>
              <div className="explore">
                <button>Explore</button>
              </div>
              <div className="card-name">
                <h4>California</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="collection-cards">
          <div className="collection-card">
            <div className='collection-card-img'>
              <img src={collection_img} alt="" />
            </div>
            <div className='collection-card-content'>
              <div className="explore">
                <button>Explore</button>
              </div>
              <div className="card-name">
                <h4>California</h4>
              </div>
            </div>
          </div>
          <div className="collection-card">
            <div className='collection-card-img'>
              <img src={collection_img} alt="" />
            </div>
            <div className='collection-card-content'>
              <div className="explore">
                <button>Explore</button>
              </div>
              <div className="card-name">
                <h4>California</h4>
              </div>
            </div>
          </div>
          <div className="collection-card">
            <div className='collection-card-img'>
              <img src={collection_img} alt="" />
            </div>
            <div className='collection-card-content'>
              <div className="explore">
                <button>Explore</button>
              </div>
              <div className="card-name">
                <h4>California</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  </div>
  )
}

export default FeaturedCollection