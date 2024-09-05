import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccessPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(-3);
        }, 10000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Payment Successful!</h1>
            <p>Your payment was successful. A confirmation email has been sent to your registered email address. Please check your inbox for further details.</p>
            <p>You will be redirected to the home page shortly.</p>
        </div>
    );
};

export default PaymentSuccessPage;
