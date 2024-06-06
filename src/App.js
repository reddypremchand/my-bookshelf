// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookSearch from './Components/BookSearch/Booksearch';
import Bookshelf from './Components/BookShelf/Bookshelf';
import Navbar from './Components/Navbar/Navbar';
import LoadingBar from 'react-top-loading-bar';
import BookDetails from './Components/BookDetails/Bookdetails';

const App = () => {
    const [bookshelf, setBookshelf] = useState([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
        setBookshelf(storedBookshelf);
    }, []);

    const addToBookshelf = (book) => {
        if (!bookshelf.some(b => b.key === book.key)) {
            const newBookshelf = [...bookshelf, book];
            setBookshelf(newBookshelf);
            localStorage.setItem('bookshelf', JSON.stringify(newBookshelf));
        }
    };

    return (
        <Router>
           
            <Navbar />
            <LoadingBar color='#f11946' progress={progress} height={3} />
            
            <Routes>
                <Route path="/" element={<BookSearch addToBookshelf={addToBookshelf} setProgress={setProgress} />} />
                <Route path="/bookshelf" element={<Bookshelf bookshelf={bookshelf} setProgress={setProgress} />} />
                <Route path="/book/:key" element={<BookDetails setProgress={setProgress} />} />
            </Routes>
        </Router>
    );
};

export default App;
