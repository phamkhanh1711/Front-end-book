import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
function Myproduct()
{
    const [getproducts , setProducts] = useState([])
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
            setProducts(res.data.listBooK);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

      function handleDelete(productId) {
        const Token = Cookies.get('Token');
        if (!Token || typeof Token !== 'string') {
          console.error('Invalid or missing token');
          return;
        }
        const config = {
          headers: {
            Authorization: `Bearer ${Token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
        };

        const deleteUrl = `http://localhost:8081/remove_book/${productId}`;
      
        axios
          .delete(deleteUrl, config)
          .then((res) => {
            console.log(res);
      
            // Update the state to remove the deleted book
            setProducts((prevProducts) =>
  prevProducts.filter((product) => product.book_id !== productId)
);
console.log('Updated State:', getproducts);
          })
          .catch((error) => {
            console.log(error);
          });
      }

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
            {/* Add your delete button here */}
            <button
                style={{ marginLeft: '-40px' ,color: 'black' }}
                onClick={() => handleDelete(book.book_id)}>
                X
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

  
return  (
    <div class="col-sm-4">
        <table>
            <thead style={{ background: "orange", height: "50px", color: "white" }}>
                <tr>
                    <th style={{paddingRight: "150px" } } >ID </th>
                    <th style={{paddingRight: "150px"}}> Name</th>
                    <th style={{paddingRight: "150px"}}> Image</th>
                    <th  style={{paddingRight: "150px" , paddingLeft: "70px" }}> Price</th>

                </tr>
            </thead>
            <tbody>
            {renderProducts()}
          </tbody>
        </table>
        <div class="form-add-book">
        <form action="#">
       <button style={{marginLeft:" 100%" , marginTop:"30%"}} type="submit" class="btn btn-default"  onClick={handleAddNew}> Add New</button>
        </form>
    </div>
    </div>


)
}
export default Myproduct;