import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound({ }) {

    return (
        <div className="notfound-container">
            <h1>404</h1>
            <h2>Page not found</h2>
            <h3>The page you are looking for doesn't exist or another error ocurred.</h3>
            <Link to="/">
                <h4>Go back</h4>
            </Link>
        </div>
    )
}