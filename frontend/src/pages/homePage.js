import React from "react";
// import { Link } from "react-router-dom"
import Hero from "../components/Hero"
import FeaturedBooks from "../components/FeaturedBooks"
import CategoryBooks from "../components/CategoryBooks"
import Testamonial from "../components/Testamonial";

const Home = () => {
    return (
        <div className="containerHome">
            <Hero/>
            <FeaturedBooks/>
            <CategoryBooks/>
            <Testamonial/>
        </div>
    )
}

export default Home;