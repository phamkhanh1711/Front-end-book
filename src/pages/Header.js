import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../image/91d93949fef52bab72e4 4.png'
import logo1 from '../image/image 19.png'
import banner from '../image/bookstackssmall.jpeg'
import Search from './Search';
import book_white from '../image/book_white.png'
import book_black from '../image/book_black.png'
import hero_bg_1 from '../image/hero_bg_1.jpg'
import { useContext } from 'react';
import { UserContext } from "../UserContext";
import Cookies from 'js-cookie';
function Header(props)
{ 
  const user = useContext(UserContext)
  console.log(user)
  const location = useLocation();
  const shouldShowHeaderMiddle = location.pathname == '/';
  const navigate = useNavigate();
  function renderLogin ()
  {
    const Token = Cookies.get('Token');
    if(Token)
    {
      return (
        <>
        <li>
          <Link to="/account">
            <i className="fa fa-user" /> Account
          </Link>
        </li>
        <li>
          <a onClick={logout} id='cart'>
            <i className="fa fa-user" /> Logout
          </a>
        </li>
        
      </>
      )

    }else{

      return (
        <li><Link to="/login" ><i className="fa fa-user" />login  </Link> </li>
      )
    }
  }
  
function logout()
{
  Cookies.remove('Token');
  Cookies.remove('Auth');

  // Redirect to the login page after logout
  navigate("/login");

 
}

    return(
      
      <header id="header">{/*header*/}
        <div className="header_top">{/*header_top*/}
            <img src={logo}/>
            <img  className='img1' src={logo1}/>

            <div className="menu-overlay">
    <ul className="nav navbar-nav">
      <li>
          <Link to="/" className="active">
            Home
          </Link>
      </li>       
   
      
     
      <li className="dropdown">
                    <a href="#">Book<i className="fa fa-angle-down" /></a>
                    <ul role="menu" className="sub-menu">
  <li id="products-link">
    <Link to="/detective">Products</Link>
  </li>
  
  
</ul>
               </li>
      <li><Link to="/cart"><i className='fa fa-shopping-cart'/> Cart</Link>
      {user.tongqty}
      </li>
      {renderLogin()}
      <li><Link to="/register"><i className="fa fa-lock" /> Register</Link></li>
    </ul>
  </div>
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                
              </div>
              <div className="col-sm-6">
                <div className="social-icons pull-right">
                  <ul className="nav navbar-nav">
                    <li><a href><i className="fa fa-facebook" /></a></li>
                    <li><a href><i className="fa fa-twitter" /></a></li>
                    <li><a href><i className="fa fa-linkedin" /></a></li>
                    <li><a href><i className="fa fa-dribbble" /></a></li>
                    <li><a href><i className="fa fa-google-plus" /></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>{/*/header_top*/}
        {/* { <div className='header_poster'>
         
          </div> } */}
         {/* {shouldShowHeaderMiddle && (
        <div className="header-middle">
          <div className="container">
            <div className="row">
              <div className="col-md-4 clearfix">
                <div className="logo pull-left">
                  <a href="index.html"><img className='banner' src={banner} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
 {shouldShowHeaderMiddle ? (
      <header id="fh5co-header" style={{ backgroundImage: `url(${hero_bg_1})` }}>
        <div className="overlay" />
        <div className="container">
          <div className="row" style={{ marginTop: '5em' }}>
            <div className="col-md-12 text-center">
              <h1 id="fh5co-logo" className="cursive-font"><a href="index.html">Vintage BookStore</a></h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <div className="intro">
                <h1>Benefit Read Book</h1>
                <h2>Reading books helps improve understanding</h2>
                <h2>Enhance thinking, analytical and concentration skills</h2>
                <h2>Reading books helps train memory</h2>
                <h2>Reading books helps reduce stress</h2>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <figure className="fh5co-intro-img">
                <img className="img-1" src={book_black} alt="Book Black" />
                <img className="img-2" src={book_white} alt="Book White" />
              </figure>
            </div>
          </div>
        </div>
      </header>
    ) : null}
      
       <div className="header-bottom">
        <div className="container">
          <div className="row">
            <div className="col-sm-9">
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle"
                  data-toggle="collapse"
                  data-target=".navbar-collapse"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
              </div>
              {/* <div className="mainmenu pull-left">
                <ul className="nav navbar-nav collapse navbar-collapse">
                  <li>
                    <Link to="/" className="active">
                      Home
                    </Link>
                  </li>
                  <li className="dropdown">
                    <a href="#">Book<i className="fa fa-angle-down" /></a>
                    <ul role="menu" className="sub-menu">
                      <li>
                        <Link to="/detective">Products</Link>
                      </li>
                      <li>
                        <Link to="/productdetail">Product Details</Link>
                      </li>
                      <li>
                        <Link to="/checkout">Checkout</Link>
                      </li>
                      <li>
                        <Link to="/cart">Cart</Link>
                      </li>
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="dropdown">
                    <a href="#">Blog<i className="fa fa-angle-down" /></a>
                    <ul role="menu" className="sub-menu">
                      <li>
                        <Link to="/blog">Blog List</Link>
                      </li>
                      <li>
                        <Link to="/blog_detail">Blog Single</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="404.html">404</a>
                  </li>
                  <li>
                    <a href="contact-us.html">Contact</a>
                  </li>
                </ul>
              </div> */}
            </div>
            <Search /> 
          </div>
        </div>
      </div>
      </header>
          );
    
}
export default  Header;