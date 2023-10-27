import { useState, useEffect } from 'react';
import { BookCard } from '../book-card/book-card';
import { BookView } from '../book-view/book-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavBar } from '../nav-bar/nav-bar';
import { ProfileView } from '../profile-view/profile-view';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
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
    <BrowserRouter>
      <NavBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView
                      onSignedUp={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <ProfileView user={user} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/books/:bookId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : books.length === 0 ? (
                  <Col>There are no books in your library.</Col>
                ) : (
                  <Col md={8}>
                    <BookView books={books} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : books.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {books.map((book) => (
                      <Col className="mb-4" key={book.id} md={3}>
                        <BookCard book={book} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
