import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import '../pages/styles/BookView.css';

const CategoryContainer = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/books/data');
                if (response.status === 200) {
                    setBooks(response.data);
                } else {
                    throw new Error('Book fetching error ..');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const chunkSize = 4;
    const chunkedBooks = books.reduce((acc, _, i) =>
        i % chunkSize ? acc : [...acc, books.slice(i, i + chunkSize)], []);

    return (
        <div className="container my-5 book-view">
            <Carousel interval={3000} pause={false}>
                {chunkedBooks.map((chunk, index) => (
                    <Carousel.Item key={index}>
                        <div className="row">
                            {chunk.map((book, idx) => (
                                <div className="col-md-3" key={idx}>
                                    <img
                                        className="card-img-top"
                                        src={`/uploads/books/${book.imageFileName}`}
                                        alt={book.title}
                                        style={{ height: "400px" }}
                                    />
                                </div>
                            ))}
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default CategoryContainer;
