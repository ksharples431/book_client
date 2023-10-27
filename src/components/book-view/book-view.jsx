import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import './book-view.scss';

export const BookView = ({ books }) => {
  const { bookId } = useParams();

  const book = books.find((b) => b.id === bookId);

  return (
    <Card className="h-100" key={bookId}>
      <Card.Img variant="top" src={book.image} />
      <Card.Body>
        <Card.Text className="title">{book.title}</Card.Text>
        <Card.Text>Author: {book.author}</Card.Text>
        <Card.Text>Genre: {book.genre}</Card.Text>
        <Card.Text>Series: {book.series}</Card.Text>
        <Card.Text>Book: {book.seriesNumber}</Card.Text>
        <Card.Text>Description: {book.description}</Card.Text>
        <Card.Text>
          Favorite: {book.favorite}
          {/* <FontAwesomeIcon
            icon={faHeart}
            style={{
              // color: book.favorite ? 'red' : 'gray',
              marginLeft: '10px',
              cursor: 'pointer',
            }}
            onClick={handleClick}
          /> */}
        </Card.Text>
        <Link to={`/`}>
          <Button variant="success">Back</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

// BookView.propTypes = {
//   book: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     author: {
//       name: PropTypes.string.isRequired,
//     },
//   }).isRequired,
// };
