import { Link } from 'react-router-dom';

import { Container, Row, Col, Card, Button, Figure } from 'react-bootstrap';

import './profile-view.scss';

function FavoriteBooks({ books }) {
  return (
    <Card className="card-title">
      <Card.Header>
          <Row>
            <Col xs={12} className="fav-title">
              My Favorite Books
            </Col>
          </Row>
          </Card.Header>
        <div className="books">
          <Card.Body className="titles">
          <Row>
            {books.map((book) => {
              return (
                <Col
                  xs={12}
                  md={6}
                  lg={3}
                  key={book.id}
                  className="fav-book">
                  <Figure>
                    <Link to={`/books/${book.id}`}>
                      <Figure.Image src={book.image} alt={book.title} />
                      <Figure.Caption>{book.title}</Figure.Caption>
                    </Link>
                  </Figure>
                  <Button onClick={() => removeFavorite(book._id)}>
                    Remove
                  </Button>
                </Col>
              );
            })}
          </Row>
      </Card.Body>
        </div>
    </Card>
  );
}

export default FavoriteBooks;
