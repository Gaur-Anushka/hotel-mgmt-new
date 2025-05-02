import React from 'react'
import six from '../images/six.png'
import categories from '../images/categories.png'
import seven from '../images/seven.png'
import eight from '../images/eight.png'
import nine from '../images/nine.png'
import collection_4 from '../images/collection_4.png'
import collection_5 from '../images/collection_5.png'
import collection_6 from '../images/collection_6.png'
import collection_7 from '../images/collection_7.png'
const Categories = () => {
  return (
      <div className="wrapper categories-section">
       <div className="wrapper-section ">
         <div className="categories-section">
           <div className="collection-heading">
             <h2>Discover Locations</h2>
           </div>
           <div className="categories-cards">
             <div className="categories-card">
               <div className='categories-card-img'>
                 <img src={six} alt="" />
               </div>
               <div className='categories-card-content'>
                 <div className="category-title">
                   <p>MIAMI, FL</p>
                 </div>
                 <div className="categories-card-name">
                   <h6>The Confidante Miami Beach</h6>
                 </div>
               </div>
             </div>
             <div className="categories-card">
               <div className='categories-card-img'>
                 <img src={seven} alt="" />
               </div>
               <div className='categories-card-content'>
                 <div className="category-title">
                   <p>MIAMI, FL</p>
                 </div>
                 <div className="categories-card-name">
                   <h6>The Confidante Miami Beach</h6>
                 </div>
               </div>
             </div>
             <div className="categories-card">
               <div className='categories-card-img'>
                 <img src={eight} alt="" />
               </div>
               <div className='categories-card-content'>
                 <div className="category-title">
                   <p>MIAMI, FL</p>
                 </div>
                 <div className="categories-card-name">
                   <h6>The Confidante Miami Beach</h6>
                 </div>
               </div>
             </div>
             <div className="categories-card">
               <div className='categories-card-img'>
                 <img src={collection_6} alt="" />
               </div>
               <div className='categories-card-content'>
                 <div className="category-title">
                   <p>MIAMI, FL</p>
                 </div>
                 <div className="categories-card-name">
                   <h6>The Confidante Miami Beach</h6>
                 </div>
               </div>
             </div>
           </div>
           <div className="categories-cards">
             <div className="categories-card">
               <div className='categories-card-img'>
                 <img src={collection_7} alt="" />
               </div>
               <div className='categories-card-content'>
                 <div className="category-title">
                   <p>MIAMI, FL</p>
                 </div>
                 <div className="categories-card-name">
                   <h6>The Confidante Miami Beach</h6>
                 </div>
               </div>
             </div>
             <div className="categories-card">
               <div className='categories-card-img'>
                 <img src={collection_5} alt="" />
               </div>
               <div className='categories-card-content'>
                 <div className="category-title">
                   <p>MIAMI, FL</p>
                 </div>
                 <div className="categories-card-name">
                   <h6>The Confidante Miami Beach</h6>
                 </div>
               </div>
             </div>
             <div className="categories-card">
               <div className='categories-card-img'>
                 <img src={collection_4} alt="" />
               </div>
               <div className='categories-card-content'>
                 <div className="category-title">
                   <p>MIAMI, FL</p>
                 </div>
                 <div className="categories-card-name">
                   <h6>The Confidante Miami Beach</h6>
                 </div>
               </div>
             </div>
             <div className="categories-card">
               <div className='categories-card-img'>
                 <img src={categories} alt="" />
               </div>
               <div className='categories-card-content'>
                 <div className="category-title">
                   <p>MIAMI, FL</p>
                 </div>
                 <div className="categories-card-name">
                   <h6>The Confidante Miami Beach</h6>
                 </div>
               </div>
             </div>
           </div>
         </div>
       
       </div>
     </div>
  )
}

export default Categories