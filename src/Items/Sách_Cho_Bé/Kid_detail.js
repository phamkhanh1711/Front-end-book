import axios from "axios";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PDFViewer from "../PDFViewer";
import AudioPlayer from 'react-audio-player';
import Comments_Kid from "./Comments_Kid";

function Kid_detail(props)
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
            <Link to={`/pdf/${getData.book_id}?audioPath=${getData.audio_path}`} style={{ color: "skyblue", fontSize: "20px" }}>Read PDF</Link>

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
        
        <Comments_Kid id_comment ={params.id}/>
       
      </div>
    )
}
export default Kid_detail;