import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Bookshelf.css';

const Bookshelf = ({ setProgress }) => {
    const [bookshelf, setBookshelf] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setProgress(30); // Start loading
        const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
        setBookshelf(storedBookshelf);
        setProgress(100); // End loading
    }, [setProgress]);

    const openBookDetails = (book) => {
        setProgress(30); // Start loading
        localStorage.setItem('selectedBook', JSON.stringify(book));
        navigate(`/book/${encodeURIComponent(book.key)}`);
        setProgress(100); // End loading
    };

    return (
        <div className="bookshelf">
            <h1>My Bookshelf</h1>
            <div className="book-container">
                {bookshelf.map((book) => (
                    <div key={book.key} className="book-card">
                        <h3>{book.title}</h3>
                        <p>Author: {book.author_name ? book.author_name.join(', ') : 'N/A'}</p>
                        <button onClick={() => openBookDetails(book)}>Show Details</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Bookshelf;
