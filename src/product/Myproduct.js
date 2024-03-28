import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Myproduct() {
  const [getproducts, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleAddNew = () => {
    navigate("/productaccount");
  };

  const Token = Cookies.get('Token');

  const url = "http://localhost:8081/form_add_book";

  const config = {
    headers: {
      Authorization: "Bearer " + Token,
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  };

  useEffect(() => {
    axios
      .get(url, config)
      .then((res) => {
        console.log(res);
        setProducts(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (productId) => {
    const Token = Cookies.get('Token');
    
    const config = {
      headers: {
        Authorization: `Bearer ${Token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    };

    const deleteUrl = `http://localhost:8081/remove_book/${productId}`;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(deleteUrl, config)
          .then((res) => {
            console.log(res);
            setProducts((prevProducts) =>
              prevProducts.filter((product) => product.book_id !== productId)
            );
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  function renderProducts() {
    if (getproducts && getproducts.length > 0) {
      return getproducts.map((book, index) => {
        return (
          <tr key={index}>
            <td style={{ color: 'black', fontSize: '14px' }}>{book.book_id}</td>
            <td style={{ color: 'black', fontSize: '14px' }}>{book.book_title}</td>
            <td>
              <img
                style={{ width: '60%' }}
                src={`http://localhost:8081/public/upload/${book.image_path}`}
                alt="Product"
              />
            </td>
            <td style={{ color: 'black', fontSize: '14px', paddingLeft: '70px' }}>{book.price}</td>
            <td>
              <button
                style={{ marginLeft: '-40px', color: 'black', fontSize: '25px' }}
                onClick={() => handleDelete(book.book_id)}
              >
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
            </td>
          </tr>
        );
      });
    } else {
      // Handle the case when data is not available (e.g., loading indicator)
      return <tr><td>Loading...</td></tr>;
    }
  }

  return (
    <div class="col-sm-4">
      <div style={{ border: '1px solid #ddd', padding: '10px', marginRight: '-135%', overflowY: 'auto', maxHeight: '450px' }}>
        <table>
          <thead style={{ background: 'orange', height: '50px', color: 'white' }}>
            <tr>
              <th style={{ paddingRight: '150px' }}>ID </th>
              <th style={{ paddingRight: '150px' }}> Name</th>
              <th style={{ paddingRight: '150px' }}> Image</th>
              <th style={{ paddingRight: '150px', paddingLeft: '70px' }}> Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {renderProducts()}
          </tbody>
        </table>
      </div>
      <div class="form-add-book">
        <form action="#">
          <button style={{ marginLeft: '155%', marginTop: '10%' }} type="submit" class="btn btn-default" onClick={handleAddNew}>
            Add New
          </button>
        </form>
      </div>
    </div>
  );
}

export default Myproduct;
