
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const params = useParams();
  const [showAllPages, setShowAllPages] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const Token = Cookies.get('Token');
  console.log(Token);

  let navigate = useNavigate()

  const bookId = params.id;
  console.log(bookId);
  const url = `http://localhost:8081/cart/${bookId}`;

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        console.log('Cart API Response:', res);
         setCartItems(res.data.listcart[0]);
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
      });
  }, [bookId, Token]);



  const baseUrl = 'http://localhost:8081'; 
  const api = `${baseUrl}/create_payment_url/${params.id}`;

  const toggleShowAllPages = async () => {
    const Token = Cookies.get('Token');  // Retrieve the token from cookies
    const config = {
      headers: {
        Authorization: `Bearer ${Token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true, // Add this line
    };
    try {
      const res = await axios.post(api, {}, config);
      console.log(res.data);
      if (res.data.vnpUrl) {
        window.location.href = res.data.vnpUrl;
      }
      

      setTimeout(() => {
        console.log('Payment process completed');
        setIsLoading(false);
        setSuccessMessage('');
        console.log('Navigating back to PDF viewer page');
        navigate(`/pdf/${params.id}`);
        setShowAllPages(true);
      }, 2000);
    } catch (error) {

      console.log(error);
    }
  };


  
  function renderpayment()
    {
      const Token = Cookies.get('Token');
        if(Token)
        {
            return(
              <div className='button-container'>
                <button style={{ color: 'white' }} className='btn btn-primary' onClick={toggleShowAllPages} >
             
                Payment VNPAY 
              </button>
            </div> 
             
              
            )
        }else{
            return (
              <div>
                 
                <button  class="btn btn-primary" >   Payment VNPAY </button>
              </div>
                
            )
        }
    }
    function logoutpayment()
    {
        alert("Vui lòng đăng nhập để viết Thanh Toán");
       
    navigate("/login");
    }
    const baseUrll = 'http://localhost:8081'; 
    const apii = `${baseUrll}/cart/delete/${params.id}`;
    function handclick() {
      const Token = Cookies.get('Token');
      const config = {
        headers: {
          Authorization: `Bearer ${Token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        withCredentials: true,
      };
    
      axios.delete(apii, config)
        .then((response) => {
          console.log('Delete successful:', response);
    
          // Assuming the response.data.newData is an array of cart items
          const updatedCartItems = response.data.newData || [];
          setCartItems(updatedCartItems);
    
          const quantityValues = updatedCartItems.reduce((result, cartItem) => {
            result[cartItem.id] = cartItem.qty;
            return result;
          }, {});
    
          localStorage.setItem("khanhne", JSON.stringify(quantityValues));
        })
        .catch((error) => {
          console.error('Error deleting:', error);
          // Handle the error, e.g., display an error message to the user
        });
    }
    
    
  function renderData() {
    if (cartItems && typeof cartItems === 'object' && Object.keys(cartItems).length > 0) {
      return (
        <div className="table-responsive cart_info">
          <table className="table table-condensed">
            <thead style={{ background: 'orange', height: '50px', color: 'white' }}>
              <tr>
                <th style={{ paddingRight: '100px', textAlign: 'center', fontSize: '16px', paddingBottom: '10px' }}>ID</th>
                <th style={{ paddingRight: '100px', textAlign: 'center', fontSize: '16px', paddingBottom: '10px' }}>Name</th>
                <th style={{ paddingRight: '100px', paddingLeft: '70px', textAlign: 'center', fontSize: '16px', paddingBottom: '10px' }}>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontSize: '16px', paddingBottom: '10px' }}>{cartItems.book_id}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontSize: '16px', paddingBottom: '10px' }}>{cartItems.book_title}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', paddingLeft: '70px', textAlign: 'center', fontSize: '16px', paddingBottom: '10px' }}>{cartItems.price}</td>
                <td onClick={handclick} className="cart_delete">
                  <a className="cart_quantity_delete">
                    <i className="fa fa-times" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          {renderpayment()}
        </div>
      );
    } else {
      return <p>No items in the cart</p>;
    }
  }

  return (
    <div className="table-responsive cart_info">
      <h5>Shopping Cart</h5>
       {renderData()}
    </div>
  );
}

export default Cart;