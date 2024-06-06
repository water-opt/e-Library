import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FeaturedBooks = ({ featuredBooks }) => {
    return (
        <div className="container" style={{ maxWidth: '900px', marginTop: '50px' }}>
            <div className="row">
                {featuredBooks.map((book, index) => (
                    <div className="col-md-4 d-flex" key={index}>
                        <div className="card flex-fill d-flex flex-column">
                            <img src={`/uploads/books/${book.imageFileName}`} className="card-img-top" alt={book.featuredBookName} />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{book.featuredBookName}</h5>
                                <p className="card-text">{book.description}</p>
                                <a href="/user/bookstore" className="btn btn-primary mt-auto">Read More</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedBooks;
