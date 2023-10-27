import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

export const ProfileView = ({ user, token, onLoggedIn }) => {
  // console.log(user.username)
  const { id } = useParams();
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(user)

    const data = {
      username: username,
      email: email,
      password: password,
      birthday: birthday,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/users/id/${username}`, // use the id parameter from the URL
        // `http://localhost:5000/api/users/profile`, // use the id parameter from the URL
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // include the token in the request headers
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Update response: ', data);

        if (data) {
          localStorage.setItem('user', JSON.stringify(data.email));
          localStorage.setItem('token', data.token);
          onLoggedIn(data.user, data.token); // update the state of the parent component
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
    <Card>
      <Card.Header>Profile Information</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={user}
              onChange={(event) => setUsername(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={user}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter birthday"
              value={birthday}
              onChange={(event) => setBirthday(event.target.value)}
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};
