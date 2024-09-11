import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmailVerification = () => {
    const { token } = useParams();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {   
            try {
                const response = await axios.get(`http://localhost:8000/verify/${token}`);
                console.log(response)
                setMessage(response.data.message);

                setTimeout(() => {
                    navigate('/');
                }, 3000);

            } catch (error) {
                setMessage(error.response.data.message || 'Verification failed. Please try again.');
            }
        };

        verifyEmail();
    }, [token, history]);

    return (
        <div>
            <h2>Email Verification</h2>
            <p>{message}</p>
        </div>
    );
};

export default EmailVerification;
