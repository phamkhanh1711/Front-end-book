import axios from "axios";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PDFViewer from "./PDFViewer";
import AudioPlayer from 'react-audio-player';

function Detective_detail(props)
{
  let params = useParams();
  const [getData, setData] = useState([]);
  
  const [audioProgress, setAudioProgress] = useState(0);
  const audioRef = useRef(null);
  useEffect(() => {
    axios.get("http://localhost:8081/detail_book/" + params.id)
      .then(res => {
        console.log(res);
        setData(res.data.detail[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [params.id]);
  
 
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const newProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setAudioProgress(newProgress);
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
            <img src={`http://localhost:8081/public/upload/${getData.image_path}`} alt={getData.book_title} />
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
          <div className="col-sm-7">
          <div className="product-information">
            <h2>{getData.book_title}</h2>
            <p>Web ID: {getData.book_id}</p>
           
            <span>
              <span>{getData.quantity}</span>
              <label>Quantity:</label>
              <input type="text" defaultValue={1} />
              <button type="button" className="btn btn-fefault cart">
                <i className="fa fa-shopping-cart" />
                Add to cart
              </button>
            </span>
            
            <p><b>Brand:</b> {getData.supplier_name}</p>
            <p><b>Author:</b> {getData.author}</p>
            <p><b>Category:</b> {getData.category_name}</p>
            <p><b>Publication Year:</b> {getData.publication_year}</p>
            <p><b>Price:</b> {getData.price}.VND</p>
            <button class="read-book-button" onClick={() => window.open(`http://localhost:8081/public/upload/${decodeURIComponent(getData.file_path)}`)}>Read Book</button>
            <AudioPlayer
  src={`http://localhost:8081/public/upload/${getData.audio_path}`}
  autoPlayAfterSrcChange={false}
  controls
  ref={audioRef}
  onTimeUpdate={handleTimeUpdate}
  className="custom-audio-player"
>
  <div className="react-audio-player-progress custom-progress"></div>
</AudioPlayer>
           <div>
             
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
        
        <div className="category-tab shop-details-tab">{/*category-tab*/}
          <div className="col-sm-12">
            <ul className="nav nav-tabs">
              
              <li className="active"><a href="#reviews" data-toggle="tab">Reviews</a></li>
            </ul>
          </div>
          <div className="tab-content">
          
           
            <div className="tab-pane fade active in" id="reviews">
              <div className="col-sm-12">
                <ul>
                  <li><a href><i className="fa fa-user" />EUGEN</a></li>
                  <li><a href><i className="fa fa-clock-o" />12:41 PM</a></li>
                  <li><a href><i className="fa fa-calendar-o" />31 DEC 2014</a></li>
                </ul>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <p><b>Write Your Review</b></p>
                <form action="#">
                  <span>
                    <input type="text" placeholder="Your Name" />
                    <input type="email" placeholder="Email Address" />
                  </span>
                  <textarea name defaultValue={""} />
                  <b>Rating: </b> <img src="images/product-details/rating.png" alt="" />
                  <button type="button" className="btn btn-default pull-right">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>{/*/category-tab*/}
        <div className="recommended_items">{/*recommended_items*/}
          <h2 className="title text-center">recommended items</h2>
          <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="item active">	
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/recommend1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/recommend2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/recommend3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">	
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/recommend1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/recommend2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/recommend3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
              <i className="fa fa-angle-left" />
            </a>
            <a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
              <i className="fa fa-angle-right" />
            </a>			
          </div>
        </div>{/*/recommended_items*/}
      </div>
    )
}
export default Detective_detail;