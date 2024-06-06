import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookCard from '../components/BookCardView';
import { useLogin } from '../components/IsLoginContext';
import { useRole } from '../components/RoleContext';
import axios from 'axios';

const categories = [
    'Sci-fi', 
    'Action and Adventure', 
    'Kids', 
    'Non-Fiction', 
    'Thriller', 
    'Mystery', 
    'Horror', 
    'Adult'
];

const BookView = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [error, setError] = useState(null);
    const { isLogin } = useLogin();
    const { role } = useRole();
    const [loading, setLoading] = useState(true);
    const [searchTitle, setSearchTitle] = useState('');
    const [searchAuthor, setSearchAuthor] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const getData = async () => {
        try {
            const response = await axios.get('/api/books/data');
            if (response.status === 200) {
                setBooks(response.data);
                setFilteredBooks(response.data);
                setLoading(false);
            } else {
                throw new Error('Book fetching error ..');
            }
        } catch (error) {
            console.error(error);
            setError(error.response.data.message || 'An error occurred');
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
    }, [isLogin, role, navigate]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        filterBooks();
    }, [searchTitle, searchAuthor, selectedCategory]);

    const filterBooks = () => {
        let filtered = books.filter(book => 
            book.title.toLowerCase().includes(searchTitle.toLowerCase()) && 
            book.author.toLowerCase().includes(searchAuthor.toLowerCase()) &&
            (selectedCategory === '' || book.category.toLowerCase() === selectedCategory.toLowerCase())
        );
        setFilteredBooks(filtered);
    };

    return (
        <div className="container">
            <div className="row my-3">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by author"
                        value={searchAuthor}
                        onChange={(e) => setSearchAuthor(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <select 
                        className="form-control" 
                        value={selectedCategory} 
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="d-flex justify-content-center flex-wrap">
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
                    Array.isArray(filteredBooks) && filteredBooks.map((book, index) => (
                        <BookCard
                            key={index}
                            title={book.title}
                            imageFileName={book.imageFileName}
                            author={book.author}
                            pdfFileName={book.pdfFileName}
                            category={book.category}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default BookView;
