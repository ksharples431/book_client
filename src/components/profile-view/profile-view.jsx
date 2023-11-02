import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import UserInfo from './user-info';
import FavoriteBooks from './favorite-books';
import UpdateUser from './update-user';

export const ProfileView = ({ user, token, books, onLoggedIn }) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);

  const favBooks = books.filter((book) => user.favorites.includes(book.id));

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(user)
    console.log(favBooks)

    const data = {
      username: username,
      email: email,
      password: password,
      birthday: birthday,
    };

    try {
      const response = await fetch(
        `https://radiant-taiga-50059-0319f39be885.herokuapp.com/api/users/id/${username}`, // use the id parameter from the URL
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
    <>
    <UserInfo name={user.username} email={user.email} />
    <UpdateUser user={user} handleSubmit={handleSubmit} />
    <FavoriteBooks books={favBooks} />
      
    </>
  );
};
