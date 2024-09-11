import React, { useState } from 'react';
import axios from 'axios';
import { Alert, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; // For getting the token from the URL

function ResetPassword() {
  const { id} = useParams(); // Assuming token is passed as URL parameter
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  console.log(id)

  const handleChange = (e) => {
    if (e.target.name === 'newPassword') {
      setNewPassword(e.target.value);
    } else {
      setConfirmPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post(`http://localhost:8000/reset-password/${id}`, { newPassword });
      setMessage(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response.data.message || 'An error occurred');
      setMessage('');
    }
  };

  return (
    <div className='properties-container'>
      <h2>Reset Password</h2>
      <Form onSubmit={handleSubmit}>
        {message && <Alert variant='success'>{message}</Alert>}
        {error && <Alert variant='danger'>{error}</Alert>}
        <Form.Group controlId='formNewPassword'>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type='password'
            name='newPassword'
            placeholder='Enter new password'
            value={newPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId='formConfirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            name='confirmPassword'
            placeholder='Confirm new password'
            value={confirmPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Reset Password
        </Button>
      </Form>
    </div>
  );
}

export default ResetPassword;
