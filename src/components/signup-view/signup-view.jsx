import { useState } from 'react';

export const SignupView = ({ onSignedUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = async (event) => {
  event.preventDefault();

  const data = {
    username: username,
    email: email,
    password: password,
    birthday: birthday
  };

  try {
      const response = await fetch(
        'http://localhost:8080/api/auth/signup',
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
        console.log('Signup response: ', data);
        
        if (data) {
          localStorage.setItem('user', JSON.stringify(data.email));
          localStorage.setItem('token', data.token);
          onSignedUp(data.email, data.token);
        } else {
          alert('Successful signup, but user data not found.');
        }
      } else {
       console.error('Signup request failed with status:', response.status);
       console.error('Response message:', response.statusText);
       alert('Something went wrong. Please check your credentials.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
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
        Birthday:
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
