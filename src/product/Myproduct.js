import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Myproduct()
{
    const [getproducts , setProducts] = useState([])
const navigate = useNavigate();
const handleAddNew = () => {
    navigate("/productaccount");
    };

    const Token = JSON.parse(localStorage.getItem("Token"));
    
    const url = "http://localhost:8081/form_add_book";
        console.log(url)
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
      
//       function handleDelete(productId)
//       {
//         const url = "http://localhost:8080/laravel8/public/api/user/product/delete/" + productId;

//         axios.get(url,config)
//         .then((res)=>{
//             console.log(res);
//              setProducts((prevProducts) =>
//         prevProducts.
       
// filter((product) => product.id !== productId)
//       );
//         })
//         .catch((error)=>{
//             console.log(error)
//         })
//       }
function renderProducts() {
    if (getproducts && Object.keys(getproducts).length > 0) {
      return Object.keys(getproducts).map((key) => {
        let arr = getproducts[key]["image"];
        let img = JSON.parse(arr);
        return (
          <tr key={key}>
            <td style={{ color: "skyblue", fontSize: "20px" }}>
              {getproducts[key].id}
            </td>
            <td style={{ color: "skyblue", fontSize: "20px" }}>
              {getproducts[key].name}
            </td>
            <td>
              <img
                style={{ width: "100%" }}
                src={"http://localhost:8080/laravel8/public/upload/product/" + getproducts[key].id_user + "/" + img[0]}
                alt="Product"
              />
            </td>
            <td style={{ color: "skyblue", fontSize: "20px", paddingLeft: "70px" }}>
              {getproducts[key].price}
            </td>
            <td>
              {/* <button  style={{marginLeft: "-40px"}}
                  onClick={() => handleDelete(getproducts[key].id)}>
                      X
              </button> */}
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
        <div class="login-form">
        <form action="#">
       <button style={{marginLeft:" 100%"}} type="submit" class="btn btn-default"  onClick={handleAddNew}> Add New</button>
        </form>
    </div>
    </div>


)
}
export default Myproduct;