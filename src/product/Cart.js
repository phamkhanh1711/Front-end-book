import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const params = useParams();
  const Token = Cookies.get('Token');
  console.log(Token);

  const config = {
    headers: {
      
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  const url = `http://localhost:8081/add_cart/${params.id}`;

  useEffect(() => {
    axios
      .post(url, null, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setCartItems(res.data.newData);
        // Handle the response as needed
      })
      .catch((error) => {
        console.error('Error adding item to cart:', error);
        // Handle errors if necessary
      });
  }, []);
  function renderData() {
    if (Object.keys(cartItems).length > 0) {
      return (
        <div className="table-responsive cart_info">
          <table className="table table-condensed">
            <thead style={{ background: "orange", height: "50px", color: "white" }}>
              <tr>
                <th style={{ paddingRight: "100px", textAlign: "center", fontSize: "16px", paddingBottom: "10px" }}>ID</th>
                <th style={{ paddingRight: "100px", textAlign: "center", fontSize: "16px", paddingBottom: "10px" }}>Name</th>
                {/* <th style={{ paddingRight: "100px", textAlign: "center", fontSize: "16px", paddingBottom: "10px" }}>Image</th> */}
                <th style={{ paddingRight: "100px", paddingLeft: "70px", textAlign: "center", fontSize: "16px", paddingBottom: "10px" }}>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center", fontSize: "16px", paddingBottom: "10px" }}>{cartItems.book_id}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center", fontSize: "16px", paddingBottom: "10px" }}>{cartItems.book_title}</td>          
   
                <td style={{ border: "1px solid #ddd", padding: "8px", paddingLeft: "70px", textAlign: "center", fontSize: "16px", paddingBottom: "10px" }}>{cartItems.price}</td>
                <td  className="cart_delete">
  <a className="cart_quantity_delete">
    <i className="fa fa-times" />
  </a>
</td>
              </tr>
            </tbody>
          </table>
          <Link to={"/payment"} style={{ background: "orange", color: "white" }} className="btn btn-default check_out" >Check Out</Link>
        </div>
      );
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
