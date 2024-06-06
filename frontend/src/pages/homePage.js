import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from "../components/Hero";
import FeaturedBooks from "../components/FeaturedBooks";
import CategoryBooks from "../components/CategoryBooks";
import Testamonial from "../components/Testamonial";

const Home = () => {
    const [books, setBooks] = useState([]);

    const getData = async () => {
        try {
            const response = await axios.get('/api/books/featured');
            if (response.status === 200) {
                setBooks(response.data);
            } else {
                throw new Error('Book fetching error ..');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="containerHome" style={{ marginTop: "50px", marginBottom: "50px" }}>
            <Hero />
            <h2 className="text-center">Featured Books</h2>
            <FeaturedBooks featuredBooks={books} />
            <h2 className="text-center" style={{ marginTop: "50px", marginBottom: "50px" }}>Categories</h2>
            <CategoryBooks />
            <Testamonial />
        </div>
    );
};

export default Home;
