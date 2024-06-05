import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const FeaturedBooks = () => {
    return (
        <div class="container">
            <h2 class="text-center">Featured Books</h2>
            <div class="row">
                <div class="col-md-4">
                    <div class="card">
                        <img src="book1.jpg" class="card-img-top" alt="Book 1" />
                        <div class="card-body">
                            <h5 class="card-title">Book Title 1</h5>
                            <p class="card-text">Short description of the book.</p>
                            <a href="#" class="btn btn-primary">Read More</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <img src="book2.jpg" class="card-img-top" alt="Book 2" />
                        <div class="card-body">
                            <h5 class="card-title">Book Title 2</h5>
                            <p class="card-text">Short description of the book.</p>
                            <a href="#" class="btn btn-primary">Read More</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <img src="book3.jpg" class="card-img-top" alt="Book 3" />
                        <div class="card-body">
                            <h5 class="card-title">Book Title 3</h5>
                            <p class="card-text">Short description of the book.</p>
                            <a href="#" class="btn btn-primary">Read More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturedBooks;