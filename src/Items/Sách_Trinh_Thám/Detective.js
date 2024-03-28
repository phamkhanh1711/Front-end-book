import React, { useContext,useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import Swal from 'sweetalert2';

function Detective(props) {
  const user = useContext(UserContext)
  console.log(user)
  const [newProducts, setNewProducts] = useState({});
  const [dataFromApi, setApiData] = useState([]);
  const categoryId = props.categoryId;
  let navigate = useNavigate()
  useEffect(() => {
    axios.get(`http://localhost:8081/category/1`)
      .then((response) => {
        console.log(response);
        
          setApiData(response.data.Data);
       
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);



  // function addtocart(e) {
  //   let getID = e.target.id;
  //   console.log(getID);
  //   let obj = {};
  //   obj[getID] = { book_id: getID, quantity: 1 }; // Include book_id and quantity in the object
  //   console.log(obj);
  //   let a = 1;
  //   let xx = localStorage.getItem("khanhne");
  //   if (xx) {
  //     obj = JSON.parse(xx);
  //     Object.keys(obj).map(function (key, index) {
  //       console.log(obj[key].book_id); // Access book_id from the obj object
  //       if (obj[key].book_id === getID) {
  //         obj[key].quantity += 1;
  //         a = 2;
  //       }
  //     });
  //     if (a === 1) {
  //       obj[getID] = { book_id: getID, quantity: 1 }; // Include book_id and quantity in the object
  //     }
  //   }
  //   console.log(obj);
  //   let tongqty = Object.values(obj).reduce((total, item) => total + item.quantity, 0);
  //   user.loginContext(tongqty);
  //   localStorage.setItem("khanhne", JSON.stringify(obj));
  //   setNewProducts(obj);
  // }
  
  
function handleclick()
{
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Successful redirection",
    showConfirmButton: false,
    timer: 1500
  });
}
const renderData = () => {
  if (Object.keys(dataFromApi).length > 0) {
    return Object.keys(dataFromApi).map((key) => {
      const item = dataFromApi[key];  
    console.log(item.book_id)// Corrected: Access the item using the current key
      return (
        <div className="col-sm-4" key={key}>
          <div className="product-image-wrapper">
            <div className="single-products">
              <div className="productinfo text-center">
                <img src={`http://localhost:8081/public/upload/${item.image_path}`} alt={item.book_title} />
                <h2>{item.price}VND</h2>
                <p>{item.book_title}</p>
              
              </div>
              
              <Link className="btn btn-primary" onClick={handleclick} to={`/detective/detail/${item.book_id}`}>
                Read More
              </Link>
            </div>
            <div className="choose">
              <ul className="nav nav-pills nav-justified">
                <li>
                  <Link to="/wishlist">
                    <i className="fa fa-user" /> Wishlist
                  </Link>
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
      );
    });
  } else {
    return <p>Loading...</p>;
  }
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

export default Detective;
