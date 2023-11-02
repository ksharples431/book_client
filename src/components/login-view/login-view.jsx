import React from 'react';
import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const LoginView = ({ onLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(
        'https://radiant-taiga-50059-0319f39be885.herokuapp.com/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Login response: ', data);

        if (data) {
          localStorage.setItem(
            'user',
            JSON.stringify(data.userInfo)
          );
          // localStorage.setItem('id', JSON.stringify(data.userInfo.id));
          // localStorage.setItem(
          //   'username',
          //   JSON.stringify(data.userInfo.username)
          // );
          // localStorage.setItem(
          //   'birthday',
          //   JSON.stringify(data.userInfo.birthday)
          // );
          localStorage.setItem('token', data.userInfo.token);
          onLoggedIn(data.userInfo, data.userInfo.token);
        } else {
          alert('Successful login, but user data not found.');
        }
      } else {
        console.error(
          'Login request failed with status:',
          response.status
        );
        console.error('Response message:', response.statusText);
        alert(
          'Something went wrong. Please check your login credentials.'
        );
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formLoginEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          minLength="3"
        />
      </Form.Group>
      <Form.Group controlId="formLoginPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
