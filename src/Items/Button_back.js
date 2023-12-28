import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const ButtonBack = () => {
  const params = useParams();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const token = Cookies.get('Token');

  useEffect(() => {
    const queryParams = window.location.search;

    // Parse chuỗi query parameters
    const searchParams = new URLSearchParams(queryParams);

    // Lấy toàn bộ thông tin từ query parameters
    const vnpAmount = searchParams.get('vnp_Amount');
    const vnpBankCode = searchParams.get('vnp_BankCode');
    const vnpBankTranNo = searchParams.get('vnp_BankTranNo');
    const vnpCardType = searchParams.get('vnp_CardType');
    const vnpOrderInfo = searchParams.get('vnp_OrderInfo');
    const vnpPayDate = searchParams.get('vnp_PayDate');
    const vnpResponseCode = searchParams.get('vnp_ResponseCode');
    const vnpTmnCode = searchParams.get('vnp_TmnCode');
    const vnpTransactionNo = searchParams.get('vnp_TransactionNo');
    const vnpTransactionStatus = searchParams.get('vnp_TransactionStatus');
    const vnpTxnRef = searchParams.get('vnp_TxnRef');
    const vnpSecureHash = searchParams.get('vnp_SecureHash');

    // Gọi API success_payment
    axios
      .get(`http://localhost:8081/payment_success/${params.id}${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log('API Response:', res.data);

        // Update the payment status state
        setPaymentStatus(res.data);
      })
      .catch(function (error) {
        console.error('Error fetching payment status:', error);
      });
  }, [params.id, token]);

  return (
    <div>
      {paymentStatus ? (
        <div>
          {paymentStatus.data && (
            <div>
              <table style={{ borderCollapse: 'collapse', width: '50%', marginTop: '20px' }}>
                <thead style={{ background: "orange", height: "50px", color: "white" }}>
                  <tr>
                    <th style={{ paddingRight: "100px", textAlign: "center", fontSize: "16px", paddingBottom: "10px" }}>ID Sách</th>
                    <th style={{ paddingRight: "100px", textAlign: "center", fontSize: "16px", paddingBottom: "10px" }}>Giá Sách</th>
                    <th style={{ paddingRight: "100px", textAlign: "center", fontSize: "16px", paddingBottom: "10px" }}>Trạng Thái Thanh Toán</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center", fontSize: "16px", paddingBottom: "10px" }}>{paymentStatus.data.book_id}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center", fontSize: "16px", paddingBottom: "10px" }}>{paymentStatus.data.vnp_Amount}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center", fontSize: "16px", paddingBottom: "10px", color: paymentStatus.Message === 'Payment success' ? 'green' : 'red' }}>{paymentStatus.Message}</td>
                  </tr>
                </tbody>
              </table>
  
              <Link
                to={`/detective/detail/${paymentStatus.data.book_id}`}
                style={{ background: "orange", color: "white", marginLeft: "-6%", marginBottom: "34%", marginTop: "-13%" }}
                className="btn btn-default check_out"
              >
                Back
              </Link>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
  
  
};

export default ButtonBack;
