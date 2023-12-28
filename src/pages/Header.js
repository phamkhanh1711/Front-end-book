import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../image/91d93949fef52bab72e4 4.png'
import logo1 from '../image/image 19.png'
import banner from '../image/bookstackssmall.jpeg'
import Search from './Search';
import book_white from '../image/book_white.png'
import book_black from '../image/book_black.png'

function Header(props)
{ 
  const location = useLocation();
  const shouldShowHeaderMiddle = location.pathname == '/';
  const navigate = useNavigate();
  function renderLogin ()
  {
    var isloggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    if(isloggedIn)
    {
      return (
        <li><a onClick={logout}id='cart' ><i className='fa fa-shopping-cart' />  logout  </a> </li>
      )

    }else{

      return (
        <li><Link to="/login" ><i className='fa fa-shopping-cart'/>login  </Link> </li>
      )
    }
  }
  
function logout()
{
  localStorage.removeItem('isLoggedIn');
  navigate('/login')
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
      <li><Link to="/account"><i className="fa fa-user" /> Account</Link></li>
      
      <li><Link to="/wishlist"><i className="fa fa-user" /> Wishlist</Link></li>
      <li className="dropdown">
                    <a href="#">Book<i className="fa fa-angle-down" /></a>
                    <ul role="menu" className="sub-menu">
  <li id="products-link">
    <Link to="/detective">Products</Link>
  </li>
  <li id="checkout-link">
    <Link to="/checkout">Checkout</Link>
  </li>
  <li id="cart-link">
    <Link to="/cart">Cart</Link>
  </li>
</ul>
                  </li>
      <li><Link to="/cart"><i className="fa fa-user" /> Cart</Link></li>
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
        {/* <div className='header_poster'>
         
          </div> */}
         {shouldShowHeaderMiddle && (
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
      )}
         {/* <header id="fh5co-header" style={{backgroundImage: 'url(images/hero_bg_1.jpg)'}}>
        <div className="overlay" />
        <div className="container">
          <div className="row" style={{marginTop: '5em'}}>
            <div className="col-md-12 text-center">
              <h1 id="fh5co-logo" className="cursive-font"><a href="index.html">Show</a></h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <div className="intro">
                <h2>A free website template to showcase your work. Made with love by <a href="http://freehtml5.co" target="_blank">FreeHTML5.co</a></h2>
                <p>
                  <a href="#" className="btn btn-primary btn-lg btn-hardbound">Buy Hard Bound <span className="price">$12.99</span></a> <span className="fh5co-block">&nbsp;&nbsp;
                    or &nbsp;&nbsp;</span> <a href="#" className="btn-ebook">Buy the eBook</a>
                </p>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <figure className="fh5co-intro-img">
              <img src={book_black}/>               
              <img src={book_white}/>           
                 </figure>
            </div>
          </div>
        </div>
      </header> */}
      
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