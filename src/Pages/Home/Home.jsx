import React from 'react'
import Header from '../../Component/Header/Header';
import Navbar from '../../Component/Navbar/Navbar';
import Featured from '../../Component/featured/Featured';
import PropertyList from '../../Component/propertyList/PropertyList'
import './home.css'
import FeaturedProperties from '../../Component/featuredProperties/FeaturedProperties';
import MailList from '../../Component/mailList/MailList';
import Footer from '../../Component/footer/Footer';
const Home = () => {
  return (
    <div>
  <Navbar/>
  <Header/>
  <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList/>
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  )
}

export default Home;