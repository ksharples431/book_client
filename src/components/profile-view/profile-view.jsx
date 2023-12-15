import { useState, useEffect } from 'react';

import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

import UserInfo from './user-info';
import FavoriteBooks from './favorite-books';
import {UpdateUser} from './update-user';

import './profile-view.scss';

export const ProfileView = ({ user, token, books, setUser }) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);

  // Filter Favorite Books
  const favBooks = books.filter((book) =>
    user.favorites.includes(book.id)
  );

  // Display Correct Birthday
  const originalDateString = user.birthday
  const originalDate = new Date(originalDateString);
  const day = (originalDate.getDate() + 1).toString().padStart(2, '0'); 
  const month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); 
  const year = originalDate.getFullYear();
  const newBirthday = `${month}-${day}-${year}`;


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: username,
      email: email,
      birthday: birthday,
    };

    try {
      const response = await fetch(
        `https://radiant-taiga-50059-0319f39be885.herokuapp.com/api/users/${username}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // include the token in the request headers
          },
          body: JSON.stringify(data),
        }
      );

      console.log(response)

      if (response.ok) {
        const data = await response.json();
        console.log('Update response: ', data);

        if (data) {
          localStorage.setItem('user', JSON.stringify(data.userInfo));
          localStorage.setItem('token', data.userInfo.token);
          // setUser(data.userInfo);
          setUsername(data.userInfo.username)
          setEmail(data.userInfo.email)
          setBirthday(data.userInfo.birthday)
          // onLoggedIn(data.user, data.token); // update the state of the parent component
        } else {
          throw new Error('Update failed');
        }
      }
    } catch (error) {
      console.error(
        'Error occurred while trying to update profile:',
        error
      );
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card className="cards">
            <Card.Header className="fav-title">My Info</Card.Header>
            <Card.Body>
              <UserInfo
                username={user.username}
                email={user.email}
                birthday={newBirthday}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="cards">
            <Card.Header className="fav-title">Update Profile</Card.Header>
            <Card.Body>
              <UpdateUser user={user} handleSubmit={handleSubmit} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <FavoriteBooks books={favBooks} />
    </Container>
  );
};
