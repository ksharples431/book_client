import React from "react";
import { Link } from 'react-router-dom';

function FavoriteBooks({ books }) {
  console.log(books)
  return (
    <div>
      <h2>My Favorite Books</h2>
      {books.map((book)=> {
        return (
          <div key={book.id}>
            <img src={book.image} />
            <Link to={`/books/${book.id}`}>
              <h4>{book.title}</h4>
            </Link>
            <button variant="secondary" onClick={()=> removeFavorite(book._id)}>Remove from Favorites</button>
          </div>
        )
      })}
    </div>
  )
}

export default FavoriteBooks