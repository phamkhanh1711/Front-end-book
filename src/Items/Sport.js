import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Sport(props) {
  const [dataFromApi, setApiData] = useState([]);
  const categoryId = props.categoryId;
  useEffect(() => {
    axios.get(`http://localhost:8081/category/2`)
      .then((response) => {
        console.log(response);
        
          setApiData(response.data.Data);
       
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const renderData = () => {
    if (dataFromApi.length === 0) {
      return <p>Loading...</p>;
    }

    return dataFromApi.map((item) => (
      <div className="col-sm-4" key={item.book_id}>
        <div className="product-image-wrapper">
          <div className="single-products">
            <div className="productinfo text-center">
            <img src={`http://localhost:8081/public/upload/${item.image_path}`} alt={item.book_title} />


              <h2>{item.price}.VND</h2>
              <p>{item.book_title}</p>
              <a href="#" className="btn btn-default add-to-cart">
                <i className="fa fa-shopping-cart" />
                Add to cart
              </a>
            </div>
            <div className="product-overlay">
              <div className="overlay-content">
                <h2>{item.price}.VND</h2>
                <p>{item.book_title}</p>
                <a href="#" className="btn btn-default add-to-cart">
                  <i className="fa fa-shopping-cart" />
                  Add to cart
                </a>
              </div>
            </div>
            <Link className="btn btn-primary" to={`/sport/detail/${item.book_id}`}>
              Read More
            </Link>
          </div>
          <div className="choose">
            <ul className="nav nav-pills nav-justified">
              <li>
                <a href="#">
                  <i className="fa fa-plus-square" /> Add to wishlist
                </a>
              </li>
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
  };

  return (
    <div className="col-sm-9 padding-right">
      <div className="features_items">
        <h2 className="title text-center">Features Items</h2>
        {renderData()}
      </div>
    </div>
  );
}

export default Sport;
