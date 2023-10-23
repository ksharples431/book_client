import { useState, useEffect } from 'react';
import { BookCard } from '../book-card/book-card';
import { BookView } from '../book-view/book-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
            id: book._id,
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

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
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
        </Col>
      ) : selectedBook ? (
        <Col md={8} style={{ border: '1px solid black' }}>
          <BookView
            style={{ border: '1px solid green' }}
            book={selectedBook}
            onBackClick={() => setSelectedBook(null)}
          />
        </Col>
      ) : books.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {books.map((book) => (
            <Col className="mb-5" key={book.id} md={3}>
              <BookCard
                book={book}
                onBookClick={(newSelectedBook) => {
                  setSelectedBook(newSelectedBook);
                }}
              />
            </Col>
          ))}
        </>
      )}
    </Row>
  );
  }
