import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Testamonial = () => {
    return (
        <div class="container my-5">
            <h2 class="text-center">Testimonials</h2>
            <div class="row">
                <div class="col-md-4">
                    <blockquote class="blockquote text-center">
                        <p class="mb-0">A wonderful library with a fantastic selection of books.</p>
                        <footer class="blockquote-footer">John Doe</footer>
                    </blockquote>
                </div>
                <div class="col-md-4">
                    <blockquote class="blockquote text-center">
                        <p class="mb-0">A great place to find rare and unique books.</p>
                        <footer class="blockquote-footer">Jane Smith</footer>
                    </blockquote>
                </div>
                <div class="col-md-4">
                    <blockquote class="blockquote text-center">
                        <p class="mb-0">A library that truly cares about its readers.</p>
                        <footer class="blockquote-footer">Emily Johnson</footer>
                    </blockquote>
                </div>
            </div>
        </div>
    )
}

export default Testamonial;