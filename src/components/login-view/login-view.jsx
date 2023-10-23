import React from 'react';
import { useState } from 'react';

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
        'http://localhost:8080/api/auth/login',
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
          localStorage.setItem('user', JSON.stringify(data.email));
          localStorage.setItem('token', data.token);
          onLoggedIn(data.email, data.token);
        } else {
          alert('Successful login, but user data not found.');
        }
      } else {
       console.error('Login request failed with status:', response.status);
       console.error('Response message:', response.statusText);
       alert('Something went wrong. Please check your login credentials.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
