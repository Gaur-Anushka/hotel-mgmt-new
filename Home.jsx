import React from 'react'
import Banner from './Banner';
import Search from './Search';
import Feature from './Feature';
import Collection from './Collection';
import Categories from './Categories';
import Join from './Join';
import Faq from './Faq';
import Footer from './Footer';
import End from './End';
import Imagetext from './Imagetext'
import New from './New';
const Home = () => {
  return (
    <>
    
  <Banner/>
  <Search/>
  <Feature/>
  <Collection/>
  {/* <featuredCollection/> */}
  <Categories/>
  <Imagetext/>
  <Faq/>
  <Join/>
  <Footer/>
  <End/>
 
    </>
 
  )
}

export default Home