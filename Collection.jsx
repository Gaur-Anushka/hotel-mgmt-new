import React from 'react'
import collection_img from '../images/collection_img.png'
import one from '../images/one.png'
import two from '../images/two.png'
import three from '../images/three.png'
import four from '../images/four.png'
import five from '../images/five.png'
const Collection = () => {
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
                  <img src={one} alt="" />
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
                  <img src={two} alt="" />
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
                  <img src={three} alt="" />
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
                  <img src={four} alt="" />
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
                  <img src={five} alt="" />
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

export default Collection;