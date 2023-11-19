import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { useContext } from 'react';
import { UserContext } from '../../UserContext';


function Detective(props) {
  // Use the useContext hook to access the value provided by UserContext
  const user = useContext(UserContext)
 console.log(user);
  const [dataFromApi, setApiData] = useState([]);
  const [page, setPage] = useState(0);
  const pageSize = 9;
  const categoryId = props.categoryId;

  useEffect(() => {
    axios.get(`http://localhost:8081/category/1?page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        console.log(response);
        setApiData(response.data.Data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [page]);

  function handlePageClick(data) {
    const selectedPage = data.selected;
    setPage(selectedPage);
  }

  function addtocart(e)
  {

  }
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
              <a href="#" onClick={addtocart} id={item.book_id} className="btn btn-default add-to-cart">
                <i className="fa fa-shopping-cart" />Add to cart
              </a>
            </div>
            <div className="product-overlay">
              <div className="overlay-content">
                <h2>{item.price}.VND</h2>
                <p>{item.book_title}</p>
                <a href="#" onClick={addtocart} id={item.book_id} className="btn btn-default add-to-cart">
                  <i className="fa fa-shopping-cart" />Add to cart
                </a>
              </div>
            </div>
            <Link className="btn btn-primary" to={`/detective/detail/${item.book_id}`}>
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
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={Math.ceil(dataFromApi.length / pageSize)} // Tính pageCount dựa trên số lượng sản phẩm
        previousLabel="< previous"
        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName='pagination'
        activeClassName='active'
      />
    </div>
  );
}

export default Detective;
