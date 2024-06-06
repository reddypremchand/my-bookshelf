import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';
import './Booksearch.css';

const BookSearch = ({ addToBookshelf, setProgress }) => {
    const [query, setQuery] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [bookshelf, setBookshelf] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
        setBookshelf(storedBookshelf);
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const fetchBooks = async () => {
                try {
                    setProgress(30); // Start loading
                    const response = await axios.get(`https://openlibrary.org/search.json?q=${searchQuery}&limit=10&page=${currentPage}`);
                    setBooks(response.data.docs);
                    setProgress(100); // End loading
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setProgress(0); // Reset progress on error
                }
            };

            fetchBooks();
        }
    }, [searchQuery, currentPage, setProgress]);

    const handleSearch = () => {
        setCurrentPage(1); // Reset to first page on new search
        setSearchQuery(query);
        setProgress(0); // Reset progress before new search
    };

    const isBookInBookshelf = (book) => {
        return bookshelf.some(b => b.key === book.key);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <div className="book-search">
            <h1>Find Your Book of Choice</h1>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a book"
            />
            <button onClick={handleSearch}>Search</button>
            <div className="book-cards-container">
                {books.map((book) => (
                    <BookCard
                        key={book.key}
                        book={book}
                        addToBookshelf={addToBookshelf}
                        isInBookshelf={isBookInBookshelf(book)}
                    />
                ))}
            </div>
            {books.length > 0 && (
                <div className="pagination-buttons">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>&larr;Previous</button>
                    <button onClick={handleNextPage}>Next &rarr;</button>
                </div>
            )}
        </div>
    );
};

export default BookSearch;
