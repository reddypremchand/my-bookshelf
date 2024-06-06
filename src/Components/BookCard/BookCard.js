import React, { useState } from 'react';
import './BookCard.css';

const BookCard = ({ book, addToBookshelf, isInBookshelf }) => {
    const [addedToBookshelf, setAddedToBookshelf] = useState(false);

    const handleAddToBookshelf = () => {
        addToBookshelf(book);
        setAddedToBookshelf(true);
    };

    return (
        <div className="book-card">
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">Author: {book.author_name}</p>
            <p className="book-publisher">Publisher: {book.publisher}...</p>
            <p className="book-edition">Edition: {book.edition_count}</p>
            {isInBookshelf || addedToBookshelf ? (
                <button className="added-button" disabled>Added in Bookshelf</button>
            ) : (
                <button className="add-button" onClick={handleAddToBookshelf}>Add to Bookshelf</button>
            )}
        </div>
    );
};

export default BookCard;
