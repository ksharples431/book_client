import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import './profile-view.scss';

function UpdateUser({ user, handleSubmit }) {


  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label className="form-fields">Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={user.username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label className="form-fields">Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter new password"
          value={user.password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label className="form-fields">Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={user.email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label className="form-fields">Birthday</Form.Label>
        <Form.Control
          type="date"
          placeholder="Enter birthday"
          value={user.birthday.slice(0, 10)}
          onChange={(event) => setBirthday(event.target.value)}
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

export default UpdateUser



