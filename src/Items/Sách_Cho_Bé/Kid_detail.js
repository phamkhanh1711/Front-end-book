import axios from "axios";
import { useContext,useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Cookies from 'js-cookie';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';



import { UserContext } from "../../UserContext";
import Swal from "sweetalert2";
import Comments_Kid from "./Comments_Kid";
import ListComment_kid from "./ListComment_kid";

function Kid_detail (props)
{
  const user = useContext(UserContext)
   console.log(user)
  let navigate = useNavigate()
  let params = useParams();
  console.log(params);
  const [newProducts, setNewProducts] = useState({});
  const [showAllPages, setShowAllPages] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  
  const [getData, setData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
 
  // const [comments, setComments] = useState([]);
  useEffect(() => {
   
    axios.get(`http://localhost:8081/detail_book/${params.id}`)
        .then(res => {
            console.log(res);
            setData(res.data.detail[0]);
          
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Handle the error, e.g., display an error message to the user
        });
}, [params.id]);

  const baseUrl = 'http://localhost:8081'; 
  const url = `${baseUrl}/create_payment_url/${params.id}`;

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
      const res = await axios.post(url, {}, config);
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

  function renderLogin()
    {
      const Token = Cookies.get('Token');
        if(Token)
        {
            return(
              <div className='button-container'>
              <a
                href="#"
                onClick={addtocart}
                id={getData.book_id} // Pass book_id as a parameter
                type="button"
                className="btn btn-fefault cart"
                style={{
                  borderRadius:"10px",
                  marginLeft:"10%",
                  
                  color: 'white',
                  fontSize: '15px',
                  marginRight: '10px',
                  padding: '10px 15px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <i className="fa fa-shopping-cart" />
                Add to cart
              </a>
              <Link
                to={`/pdf/${getData.book_id}`}
                className='btn btn-primary'
                style={{
                  borderRadius:"10px",
                  marginTop:"0%",
                  marginLeft:"18%",
                 
                  color: 'white',
                  fontSize: '15px',
                  marginRight: '10px',
                  padding: '10px 15px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Read Book
              </Link>
            </div>
            
             
              
            )
        }else{
            return (
              <div>
                  <button onClick={logout} class="btn btn-primary" style={{
                  borderRadius:"10px",
                  marginTop:"0%",
                  marginLeft:"20%",
                 
                  color: 'white',
                  fontSize: '15px',
                  marginRight: '10px',
                  padding: '10px 15px',
                  border: 'none',
                  cursor: 'pointer'
                }} >Read Book</button>
                  <button onClick={logoutcart}  style={{
                  borderRadius:"10px",
                  marginLeft:"0%",
                  
                  color: 'white',
                  fontSize: '15px',
                  marginRight: '10px',
                  padding: '10px 15px',
                  border: 'none',
                  cursor: 'pointer'
                }}class="btn btn-primary" > Add to cart</button>
              </div>
                
            )
        }
    }

    function logout()
    {
    
         
          navigate("/login");
      
    
    }
    function logoutcart()
    {
      
          // Chuyển hướng đến trang mong muốn
          navigate("/login");
        
    }
  
    // function addtocart(e) {
       
    // let getID = e.target.id;
    // console.log(getID);
    // let obj = {};
    // obj[getID] = { book_id: getID, quantity: 1 }; // Include book_id and quantity in the object
    // console.log(obj);
    // let a = 1;
    // let xx = localStorage.getItem("khanhne");
    // if (xx) {
    //   obj = JSON.parse(xx);
    //   Object.keys(obj).map(function (key, index) {
    //     console.log(obj[key].book_id); // Access book_id from the obj object
    //     if (obj[key].book_id === getID) {
    //       obj[key].quantity += 1;
    //       a = 2;
    //     }
    //   });
    //   if (a === 1) {
    //     obj[getID] = { book_id: getID, quantity: 1 }; // Include book_id and quantity in the object
    //   }
    // }
    // console.log(obj);
    // let tongqty = Object.values(obj).reduce((total, item) => total + item.quantity, 0);
    // user.loginContext(tongqty);
    // localStorage.setItem("khanhne", JSON.stringify(obj));
    // setNewProducts(obj);
 
  
    //   navigate(`/cart/${getData.book_id}`);
    // }
    const [cartItems, setCartItems] = useState([]);
    const Token = Cookies.get('Token');
  console.log(Token);
    function addtocart(e) {
      const getID = e.target.id;
      console.log(getID);
    
      axios.post(
        `http://localhost:8081/add_cart/${getID}`,
        null,
        {
          params: { book_id: getID },
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
    
       
        navigate(`/cart/${getID}`);
      })
      .catch((error) => {
        console.error('Error adding item to cart:', error);
      });
    }
    
    function fetchData()
    {
        return (
          
            <div className="col-sm-5">
            <div className="view-product">
           
              <a href="images/product-details/1.jpg" rel="prettyPhoto"><h3>ZOOM</h3></a>
            </div>
            <div id="similar-product" className="carousel slide" data-ride="carousel">
              
            <div className="carousel-inner">
            <div className="item active">
            {<img src={`http://localhost:8081/public/upload/${getData.image_path}`} alt={getData.book_title} />}
              <img src="images/product-details/similar2.jpg" alt="" />
              <img src="images/product-details/similar3.jpg" alt="" />
            </div>
            <div className="item">
              <img src="images/product-details/similar1.jpg" alt="" />
              <img src="images/product-details/similar2.jpg" alt="" />
              <img src="images/product-details/similar3.jpg" alt="" />
            </div>
            <div className="item">
              <img src="images/product-details/similar1.jpg" alt="" />
              <img src="images/product-details/similar2.jpg" alt="" />
              <img src="images/product-details/similar3.jpg" alt="" />
            </div>
          </div>
            
              <a className="left item-control" href="#similar-product" data-slide="prev">
                <i className="fa fa-angle-left" />
              </a>
              <a className="right item-control" href="#similar-product" data-slide="next">
                <i className="fa fa-angle-right" />
              </a>
            </div>
            
          </div>
      )
    }
    function renderData() {
      if (getData && Object.keys(getData).length > 0) {
        return (
          <div className="col-sm-7" >
          <div className="product-information">
            <h2>{getData.book_title}</h2>
            <p>Web ID: {getData.book_id}</p>
           
          <span>
            <span>{getData.quantity}</span>
          
       
          </span>
            
          <p><b>Brand:</b> {getData.supplier_name}</p>
          <p><b>Author:</b> {getData.author}</p>
          <p><b>Category:</b> {getData.category_name}</p>
          <p><b>Publication Year:</b> {getData.publication_year}</p>
          <p><b>Price:</b> {getData.price} VND</p>
          { renderLogin()}
        
          </div>
        </div>
        );
      } else {
        return <div>Loading...</div>; // You can display a loading message or handle this case as needed
      }
    }
    
    return(
        <div className="col-sm-9 padding-right">
        <div className="product-details">{/*product-details*/}
            {fetchData()}
            {renderData()}
       
        
        </div>{/*/product-details*/}
       
        <ListComment_kid book_id={getData.book_id} />
        <Comments_Kid id_comment={params.id} book_id={getData.book_id} />

        
      </div>
    )
}
export default Kid_detail;