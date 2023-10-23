import { useState, useEffect } from 'react';
import { BookCard } from '../book-card/book-card';
import { BookView } from '../book-view/book-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('email'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/books', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        const booksFromApi = data.map((book) => {
          return {
            _id: book._id,
            title: book.title,
            image: book.imagePath,
            description: book.description,
            author: book.author.name,
          };
        });
        setBooks(booksFromApi);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView
          onSignedUp={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
      </>
    );
  }

  if (selectedBook) {
    return (
      <BookView
        book={selectedBook}
        onBackClick={() => setSelectedBook(null)}
      />
    );
  }

  if (books.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {books.map((book) => (
        <BookCard
          key={book._id}
          book={book}
          onBookClick={(newSelectedBook) => {
            setSelectedBook(newSelectedBook);
          }}
        />
      ))}
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}>
        Logout
      </button>
    </div>
  );
};
