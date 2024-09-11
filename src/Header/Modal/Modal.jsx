import React, { useContext, useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { authenticate, authenticateLogin } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './modal.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const signUpValues = {
  name: '',
  email: '',
  password: '',
  phone: ''
};

const loginInitial = {
  email: '',
  password: ''
};

const RegisterModal = ({ show, handleClose }) => {
  const [view, setView] = useState('login');
  const [signUpFormData, setSignUpFormData] = useState(signUpValues);
  const [loginFormData, setLoginFormData] = useState(loginInitial);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgetPasswordModal, setShowForgetPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // For toggling password visibility
  const { account, setAccount } = useContext(DataContext);

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpFormData({ ...signUpFormData, [name]: value });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await authenticate(signUpFormData);
    setLoading(false);
    if (res.error) {
      setError(res.error);
      setSignUpFormData(signUpValues);
    } else {
      setAccount(res.data.message.name);
      localStorage.setItem('account', res.data.message.name);
      handleClose();
      setSignUpFormData(signUpValues);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await authenticateLogin(loginFormData);
    setLoading(false);
    if (!res.error) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('id', res.data.user._id);
      setAccount(res.data.user.name);
      setLoginFormData(loginInitial);
      handleClose();
    } else {
      setError('Login failed');
      setLoginFormData(loginInitial);
    }
  };

  const toggleView = () => {
    setView(view === 'login' ? 'register' : 'login');
  };

  const handleForgetPassword = () => {
    setShowForgetPasswordModal(true);
  };

  const handleForgetPasswordClose = () => {
    setShowForgetPasswordModal(false);
  };

  const handleForgotPasswordEmailChange = (e) => {
    setForgotPasswordEmail(e.target.value);
  };

  const handlePasswordReset = async () => {
    try {
      const response = await axios.post("http://localhost:8000/forgetPassword", { email: forgotPasswordEmail });
      handleForgetPasswordClose();
    } catch (error) {
      setError('Failed to send reset link. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg" className="custom-modal">
        <Modal.Body>
          <Row>
            <Col md={5} className="info-section">
              <div className="info-content">
                <h5>{view === 'login' ? 'Login' : 'Sign up'}</h5>
                <ul>
                  <li>Zero Brokerage.</li>
                  <li>Thousands of new listings daily.</li>
                  <li>100 Cr+ Brokerage saved monthly.</li>
                </ul>
              </div>
            </Col>
            <Col md={7}>
              {view === 'register' ? (
                <Form onSubmit={handleSignUpSubmit}>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form.Group controlId="formFirstName" className="mt-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={signUpFormData.name}
                      onChange={handleSignUpChange}
                      required
                      placeholder="Enter your name"
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail" className="mt-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={signUpFormData.email}
                      onChange={handleSignUpChange}
                      required
                      placeholder="Enter your email"
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type={passwordVisible ? 'text' : 'password'}
                        name="password"
                        value={signUpFormData.password}
                        onChange={handleSignUpChange}
                        required
                        placeholder="Enter your password"
                      />
                      <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                        {passwordVisible ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                      </Button>
                    </div>
                  </Form.Group>
                  <Form.Group controlId="formPhone" className="mt-3">
                    <Form.Label>Phone</Form.Label>
                    <div className="d-flex align-items-center">
                      <span className="country-code">+91</span>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={signUpFormData.phone}
                        onChange={handleSignUpChange}
                        required
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Continue'}
                  </Button>
                  <p className="terms mt-2">
                    By continuing, you agree to our <a href="/terms">Terms & Conditions</a>
                  </p>
                  <p className="toggle-view mt-2" onClick={toggleView} style={{ cursor: 'pointer', color: '#2878f0' }}>
                    Already have an account? Login
                  </p>
                </Form>
              ) : (
                <Form onSubmit={handleLoginSubmit}>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form.Group controlId="formEmail" className="mt-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={loginFormData.email}
                      onChange={handleLoginChange}
                      required
                      placeholder="Enter your email"
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type={passwordVisible ? 'text' : 'password'}
                        name="password"
                        value={loginFormData.password}
                        onChange={handleLoginChange}
                        required
                        placeholder="Enter your password"
                      />
                      <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                        {passwordVisible ? 'Hide' : 'Show'}
                      </Button>
                    </div>
                  </Form.Group>
                  <div className="d-flex justify-content-between align-items-center">
                    <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
                      {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
                    </Button>
                    <Link to="#" className="mt-3 mb-0 ms-3" style={{ textDecoration: 'none' }} onClick={handleForgetPassword}>
                      Forget Password
                    </Link>
                  </div>
                  <p className="terms mt-2">
                    By continuing, you agree to our <a href="/terms">Terms & Conditions</a>
                  </p>
                  <p className="toggle-view mt-2" onClick={toggleView} style={{ cursor: 'pointer', color: '#2878f0' }}>
                    Don't have an account? Register
                  </p>
                </Form>
              )}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      {/* Forgot Password Modal */}
      <Modal show={showForgetPasswordModal} onHide={handleForgetPasswordClose} centered size="md">
        <Modal.Body>
          <Form>
            <Form.Group controlId="forgotPasswordEmail">
              <Form.Label>Enter your registered email</Form.Label>
              <Form.Control
                type="email"
                value={forgotPasswordEmail}
                onChange={handleForgotPasswordEmailChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>
            <Button variant="primary" onClick={handlePasswordReset} className="mt-3">
              Send Reset Link
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegisterModal;
