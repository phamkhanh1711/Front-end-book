import React, { useState } from 'react';
import CheckError from '../members/CheckError';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Payment() {
  const params = useParams();
  const [formData, setFormData] = useState({
    orderDescription: '',
    orderType: 'topup',
    language: 'vn',
    amount: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorsSubmit = {};
    let flag = true;

    // Validation checks
    if (formData.orderDescription === '') {
      errorsSubmit.orderDescription = 'Vui lòng nhập mô tả đơn hàng';
      flag = false;
    }

    if (formData.amount === '') {
      errorsSubmit.amount = 'Vui lòng nhập số tiền';
      flag = false;
    } else if (formData.amount <= 0) {
      errorsSubmit.amount = 'Số tiền phải lớn hơn 0';
      flag = false;
    }

    if (!flag) {
      setErrors(errorsSubmit);
      setSuccessMessage('');
      alert('Vui lòng kiểm tra lại thông tin');
    } else {
      setErrors({});
      setIsLoading(true);

      // Simulate API call to create payment URL
      axios
        .post(`http://localhost:8081/create_payment_url/${params.id}` , {
          amount: formData.amount,
          orderDescription: formData.orderDescription,
          orderType: formData.orderType,
          language: formData.language,
        })
        .then((response) => {
          console.log('Payment URL:', response);
          window.open(response.data);
          setSuccessMessage('Đang chờ xác nhận thanh toán...');

          // Simulate payment process completion
          setTimeout(() => {
            setIsLoading(false);
            setSuccessMessage('');

            // Navigate back to the PDF viewer page
            navigate(`/pdf/${params.id}`);
          }, 2000);
        })
        .catch((error) => {
          console.error('Error creating payment URL:', error);
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="col-sm-4 col-sm-offset-1">
      <div className="login-form">
        <h2>Điền Thông Tin Thanh Toán</h2>
        <form onSubmit={handleSubmit}>
          {/* Order description input */}
          <label htmlFor="orderDescription">Mô tả đơn hàng:</label>
          <input
            type="text"
            name="orderDescription"
            placeholder="Nhập mô tả đơn hàng"
            value={formData.orderDescription}
            onChange={handleChange}
          />
          {errors.orderDescription && <p className="error-message">{errors.orderDescription}</p>}

          {/* Order type selection */}
          <label htmlFor="orderType">Loại đơn hàng:</label>
          <select name="orderType" value={formData.orderType} onChange={handleChange}>
            <option value="topup">Nạp tiền điện thoại</option>
            <option value="billpayment">Thanh toán hóa đơn</option>
            <option value="fashion">Thời trang</option>
          </select>

          {/* Language selection */}
          <label htmlFor="language">Ngôn ngữ:</label>
          <select name="language" value={formData.language} onChange={handleChange}>
            <option value="vn">Tiếng Việt</option>
            <option value="en">English</option>
          </select>

          {/* Amount input */}
          <label htmlFor="amount">Số tiền:</label>
          <input
            type="number"
            name="amount"
            placeholder="Số tiền"
            value={formData.amount}
            onChange={handleChange}
          />
          {errors.amount && <p className="error-message">{errors.amount}</p>}

          {/* Submit button */}
          <button type="submit" className="btn btn-default" disabled={isLoading}>
            {isLoading ? 'Đang xử lý...' : 'Thanh Toán VNPAY'}
          </button>

          {/* Success message */}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </form>

        {/* Display validation errors */}
        <CheckError errors={errors} />
      </div>
    </div>
  );
}

export default Payment;
