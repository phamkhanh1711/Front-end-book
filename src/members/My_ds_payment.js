import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";

function My_ds_payment() {
  const [getData, setData] = useState([]);
  const [error, setError] = useState(null);
  const baseUrl = 'http://localhost:8081';
  const Token = Cookies.get('Token');

  useEffect(() => {
    axios
      .get(`${baseUrl}/book-payment`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        console.log(res);
        const responseData = res.data.data || [];
        console.log(responseData);
        setData(responseData);
      })
      .catch((error) => {
        console.error('Error fetching PDF data:', error);
        setError(error);
      });
  }, [baseUrl, Token]);

  const renderData = () => {
    if (!getData) {
      return <p>Loading...</p>;
    }

    if (getData.length > 0) {
      return getData.map((item) => (
        <div className="col-sm-4" key={item.book_id}>
          <div className="product-image-wrapper">
            <div className="single-products">
              <div className="productinfo text-center">
                <img src={`${baseUrl}/${item.image}`} alt={item.book_title} />
                <p>{item.book_title}</p>
              </div>
            </div>
            <div className="choose">
              <ul className="nav nav-pills nav-justified">
                <Link className="btn btn-primary" to={`/pdf/${item.book_id}`}>
                  Read Book
                </Link>
                <li>
                  <a href="#">
                    <i className="fa fa-plus-square" /> Add to compare
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ));
    } else if (error) {
      return <p>Error: {error.message}</p>;
    } else {
      return <p>No data available.</p>;
    }
  };

  return (
    <div className="col-sm-9 padding-right">
      <div className="features_items">
        <h2 className="title text-center">Danh sách đã thanh toan</h2>
        <div className="row">
          {renderData()}
        </div>
      </div>
    </div>
  );
}

export default My_ds_payment;
