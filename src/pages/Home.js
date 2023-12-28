import { Link } from "react-router-dom";
import biathethao from '../image/biathethao.jpg'
import biasach from '../image/biasach.jpg'

import Onepiece from '../image/sachonepiece.jpg'


import book_white from '../image/book_white.png'
import book_black from '../image/book_black.png'
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
          <img src={book_black}/>
          </div>
          <div  className="title">      
          <h1 className="left-to-right show-on-scroll">Keep It Simple</h1>
          <p className="left-to-right show-on-scroll">
          Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
          </p>
        </div>
      </section>
 
</div>

<div className="Ngan_cach">

</div>
<div className="co_1">
 
  <section id="home_2" className="full-height_2">

  <div  className="title_2">      
  <h1 className="left-to-right show-on-scroll">Keep It Simple</h1>
          <p className="left-to-right show-on-scroll">
          Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
          </p>
        </div>
        <div className="img2">
          <img src={book_white}/>
          </div>
        
      </section>
</div>

<div id="team" className="full-height">
   

        <div className="person show-on-scroll zoom">
          <h3> Rosie Nguyễn</h3>
          <p>
          Mình nói gì khi nói về hạnh phúc?” là hành trình đi tìm hạnh phúc khác với khuôn mẫu xã hội, 
          là cuộc tìm kiếm từ bên ngoài vào bên trong, từ chốn đông người tới chỗ không người, tìm từ người khác đến tìm trong chính mình
            
          </p>
          <img className="img7" src={biasach}/>
        </div>
        <div className="person show-on-scroll zoom">
          <h3>Misaki</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In
            repudiandae sequi, ad cum aperiam odit eius earum molestiae voluptatem
          </p>
          <img className="img7" src={biathethao}/>
        </div>
        <div className="person show-on-scroll zoom">
        <h3>Oda Eiichiro</h3>
        <p>
        One Piece, từng được xuất bản tại Việt Nam dưới tên gọi Đảo Hải Tặc là bộ manga dành cho lứa tuổi thiếu niên của tác giả Oda Eiichiro, 
       
            
          </p>
          <img  className="img7"src={Onepiece}/>
         
        
        </div>
        <div>
    <h2>Sách Nổi Bật</h2>
    </div>
      </div>
     
</div> 
  );
  

}
export default Home;

