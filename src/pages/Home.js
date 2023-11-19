import { Link } from "react-router-dom";
import biathethao from '../image/biathethao.jpg'
import biacaulong from '../image/biacaulong.jpg'
import biatheduc from '../image/biatheduc.jpg'
import Onepiece from '../image/sachonepiece.jpg'
import truyentranh from '../image/onepiece.jpg'
import thanhxuan from '../image/thanhxuan.jpg'
import thanhxuan_1 from '../image/thanhxuan_1.jpg'
import blog from '../image/discover_blog.jpg'
import { useEffect } from "react";
import { useState } from "react";
function Home(props)
{
  const [elToShow, setElToShow] = useState([]);

  const isElInViewPort = (el) => {
    let rect = el.getBoundingClientRect();
    let viewHeight = window.innerHeight || document.documentElement.clientHeight;

    return (
      (rect.top <= 0 && rect.bottom >= 0) ||
      (rect.bottom >= viewHeight && rect.top <= viewHeight) ||
      (rect.top >= 0 && rect.bottom <= viewHeight)
    );
  };

  const handleScroll = () => {
    elToShow.forEach((item) => {
      if (isElInViewPort(item)) {
        item.classList.add('start');
      } else {
        item.classList.remove('start');
      }
    });
  };

  useEffect(() => {
    const elements = document.querySelectorAll('.show-on-scroll');
    setElToShow(Array.from(elements));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [elToShow]);
  return (
   
    <div className="col-sm-9 padding-right">
<div className="features_items">

  <section id="home" className="full-height">
        <div className="img1">
          <img src={blog}/>
          </div>
          <div  className="title">      
          <h1 className="left-to-right show-on-scroll">Nodemy</h1>
          <p className="left-to-right show-on-scroll">
          Writing became such a process of discovery
Sharon O'Brien
          </p>
        </div>
      </section>
 
</div>

<div className="Ngan_cach">

</div>
<div className="co_1">
 
  <section id="home_2" className="full-height_2">

  <div  className="title_2">      
          <h1 className="left-to-right show-on-scroll">Nodemy</h1>
          <p className="left-to-right show-on-scroll">
          Writing became such a process of discovery
Sharon O'Brien
          </p>
        </div>
        <div className="img2">
          <img src={blog}/>
          </div>
        
      </section>
</div>

<div id="team" className="full-height">
   

        <div className="person show-on-scroll zoom">
          <h3>Person 1</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In
            
          </p>
          <img className="img7" src={Onepiece}/>
        </div>
        <div className="person show-on-scroll zoom">
          <h3>Person 2</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In
            repudiandae sequi, ad cum aperiam odit eius earum molestiae voluptatem
          </p>
          <img className="img7" src={biathethao}/>
        </div>
        <div className="person show-on-scroll zoom">
        <h3>Person 3</h3>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In
            
          </p>
          <img  className="img7"src={Onepiece}/>
         
        
        </div>
        <div>
    <h2>Sách Nổi Bật</h2>
    </div>
      </div>
      <div className="co_1">
  <div>
    <h3>Benefit Read Book</h3>
  </div>
  <section id="about" className="full-height">
        <div className="box show-on-scroll left-to-right">
          <h2>Title</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
            eveniet sequi. Nobis, dolorum culpa doloribus adipisci ut ab iure non
            voluptates vel exercitationem explicabo nam, sunt maxime error nemo
            assumenda.
          </p>
        </div>
        <div className="box show-on-scroll right-to-left">
          <h2>Title</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
            eveniet sequi. Nobis, dolorum culpa doloribus adipisci ut ab iure non
            voluptates vel exercitationem explicabo nam, sunt maxime error nemo
            assumenda.
          </p>
        </div>
      </section>
</div>
</div> 
  );
  

}
export default Home;

{/* */}