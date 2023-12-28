import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Cookies from 'js-cookie';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import ListComment_TT from "./ListComment_TT";
import Comments from "./Comments";

function Detective_detail(props)
{
  let navigate = useNavigate()
  let params = useParams();
  console.log(params);
  const [showAllPages, setShowAllPages] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  
  const [getData, setData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [comments, setComments] = useState([]);
  useEffect(() => {
    // Fetch PDF data from API
    axios.get(`http://localhost:8081/detail_book/${params.id}`)
      .then(res => {
        console.log(res);
        setData(res.data.detail[0]);
       
        setComments(res.data.comments);
      
      })
      .catch(function (error) {
        console.log(error);
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
            {/* <PDFViewer idBook = {params.id}/> */}
          </div>
      )
    }
    function renderData() {
      if (getData && Object.keys(getData).length > 0) {
        return (
          <div className="col-sm-7">
          <div className="product-information">
            <h2>{getData.book_title}</h2>
            <p>Web ID: {getData.book_id}</p>
           
          <span>
            <span>{getData.quantity}</span>
        
         
            <Link
        to={`/cart/${getData.book_id}`}  // Pass book_id as a parameter
        type="button"
        className="btn btn-fefault cart"
      >
        <i className="fa fa-shopping-cart" />
        Add to cart
      </Link>
       
          </span>
            
          <p><b>Brand:</b> {getData.supplier_name}</p>
          <p><b>Author:</b> {getData.author}</p>
          <p><b>Category:</b> {getData.category_name}</p>
          <p><b>Publication Year:</b> {getData.publication_year}</p>
          <p><b>Price:</b> {getData.price} VND</p>
          <Link  to={`/pdf/${getData.book_id}`} className='btn btn-primary' style={{ color: "white", fontSize: "15px" }} >Read Book</Link>
          <div className='button-container'>
            <button style={{ color: 'white' }} className='btn btn-primary' onClick={toggleShowAllPages} >
           
           Payment 
            </button>
          </div> 
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
       
        <ListComment_TT comments={comments} />
        <Comments id_comment={params.id} book_id={getData.book_id} />

        
      </div>
    )
}
export default Detective_detail;