import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const CategoryContainer = () => {
    return (
        <div class="container my-5">
            <h2 class="text-center">Categories</h2>
            <div class="row">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body text-center">
                            <h5 class="card-title">Fiction</h5>
                            <a href="#" class="btn btn-primary">Explore</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body text-center">
                            <h5 class="card-title">Non-Fiction</h5>
                            <a href="#" class="btn btn-primary">Explore</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body text-center">
                            <h5 class="card-title">Science</h5>
                            <a href="#" class="btn btn-primary">Explore</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryContainer;