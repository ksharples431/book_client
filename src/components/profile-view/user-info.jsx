import React from 'react';

function UserInfo({ email, username, birthday }) {
  return (
    <>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Birthday: {birthday}</p>
    </>
  );
}

export default UserInfo;
