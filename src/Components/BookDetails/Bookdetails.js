import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookDetails.css';

const BookDetails = ({ setProgress }) => {
    const { key } = useParams();
    const [book, setBook] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setProgress(30); // Start loading
        const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
        const selectedBook = storedBookshelf.find(b => b.key === decodeURIComponent(key));
        setBook(selectedBook);
        setProgress(100); // End loading
    }, [key, setProgress]);

    const closeModal = () => {
        navigate('/');
    };

    return (
        <div className="book-details">
            {book ? (
                <div className="modal">
                    <span className="close" onClick={closeModal}><strong>&times;</strong></span>
                    <h2>{book.title}</h2>
                    <p>Author: {book.author_name ? book.author_name.join(', ') : 'N/A'}</p>
                    <p>Publisher: {book.publisher ? book.publisher.join(', ') : 'N/A'}</p>
                    <p>First Publish Year: {book.first_publish_year || 'N/A'}</p>
                    <p>Language: {book.language ? book.language.join(', ') : 'N/A'}</p>
                    <p>ISBN: {book.isbn ? book.isbn.join(', ') : 'N/A'}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default BookDetails;
