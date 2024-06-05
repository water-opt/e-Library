import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookCard from '../components/BookCardView';
import { useLogin } from '../components/IsLoginContext';
import { useRole } from '../components/RoleContext';
import axios from 'axios';

const BookView = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const { isLogin } = useLogin();
    const { role } = useRole();
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        try {
            const response = await axios.get('/api/books/data');
            if (response.status === 200) {
                setBooks(response.data);
                setLoading(false);
            } else {
                throw new Error('Book fetching error ..');
            }
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isLogin === true && role === "user") {
            getData();
        } else {
            setError("You are not authorized ..");
            navigate('/user/login');
        }  
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="container d-flex justify-content-center flex-wrap">
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            {loading ? (
                <div className="d-flex justify-content-center mt-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                Array.isArray(books) && books.map((book, index) => (
                    <BookCard
                        key={index}
                        title={book.title}
                        imageFileName={book.imageFileName}
                        author={book.author}
                        pdfFileName={book.pdfFileName}
                    />
                ))
            )}
        </div>
    );
};

export default BookView;
