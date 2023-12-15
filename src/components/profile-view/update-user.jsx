import { useState } from "react";

import { Button, Form } from 'react-bootstrap';

import './profile-view.scss';

export const UpdateUser  = ({ user, handleSubmit }) => {
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [birthday, setBirthday] = useState('');

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label className="form-fields">Username</Form.Label>
        <Form.Control
          type="text"
          placeholder={user.username}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label className="form-fields">Email</Form.Label>
        <Form.Control
          type="email"
          placeholder={user.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label className="form-fields">Birthday</Form.Label>
        <Form.Control
          type="date"
          placeholder={user.birthday}
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>
      <div className="btn-container">
        <Button className="update" type="submit" onClick={handleSubmit}>
          Update
        </Button>
        <Button className="delete" onClick={handleSubmit}>
          Delete Account
        </Button>
      </div>
    </Form>
  );
}



