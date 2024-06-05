import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductCard = ({ title, imageFileName, author, fileName }) => {
    return (
        <div className="card m-3" style={{ width: '18rem' }}>
            <img src={`/uploads/books/${imageFileName}`} className="card-img-top" alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text text-muted">{author}</p>
            </div>
            <a 
                href={`/uploads/books/${imageFileName}`} 
                className="btn btn-primary mt-2" 
                download
            >
            Download
            </a>
        </div>
    );
};

export default ProductCard;
