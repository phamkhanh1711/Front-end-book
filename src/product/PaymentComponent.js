import React, { useState } from 'react';

const PaymentComponent = () => {
  const [amount, setAmount] = useState(0); // Set initial amount
  const [orderDescription, setOrderDescription] = useState('');
  const [orderType, setOrderType] = useState('');
  const [language, setLanguage] = useState('');

  const createPayment = async () => {
    try {
      const response = await fetch('http://localhost:8081/create_payment_url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          orderDescription,
          orderType,
          language,
        }),
      });

      if (response.ok) {
        // Redirect to the VNPAY payment URL
        window.location.href = response.url; // assuming the response has the URL
      } else {
        console.error('Error creating payment URL:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating payment URL:', error.message);
    }
  };

  return (
    <div>
      <h2>Create Payment</h2>
      <label>
        Amount:
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </label>
      <br />
      <label>
        Order Description:
        <input type="text" value={orderDescription} onChange={(e) => setOrderDescription(e.target.value)} />
      </label>
      <br />
      <label>
        Order Type:
        <input type="text" value={orderType} onChange={(e) => setOrderType(e.target.value)} />
      </label>
      <br />
      <label>
        Language:
        <input type="text" value={language} onChange={(e) => setLanguage(e.target.value)} />
      </label>
      <br />
      <button onClick={createPayment}>Create Payment</button>
    </div>
  );
};

export default PaymentComponent;
