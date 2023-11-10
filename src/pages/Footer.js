import paper from '../image/Paper Text Picture Frame Brown Pattern - Medieval European Border Background Transparent PNG 1.png'
function Footer ()
{
    return (
      <div className="footer-bg">
  
     <footer id="footer">{/*Footer*/}
          <img src={paper}/>

          <div className="footer-top">
            <div className="container">
              <div className="row">
                <div className="col-sm-2">
                  <div className="companyinfo">
                    <h2><span>Vt</span>.BookStore</h2>     
                  </div>
                </div>
             
              </div>
            </div>
          </div>

          <div className="footer-widget">
            <div className="container">
              <div className="row">
                <div className="col-sm-2">
                  <div className="single-widget">
                    <h2>Service</h2>
                    <ul className="nav nav-pills nav-stacked">
                      <li><a href="#">Online Help</a></li>
                      <li><a href="#">Contact Us</a></li>
                      <li><a href="#">Order Status</a></li>
                      <li><a href="#">Change Location</a></li>
                      <li><a href="#">FAQ’s</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-2_1">
                  <div className="single-widget">
                    <h2>Quock Shop</h2>
                    <ul className="nav nav-pills nav-stacked">
                      <li><a href="#">Sách Thể Thao</a></li>
                      <li><a href="#">Sách Thời Trang</a></li>
                      <li><a href="#">Sách Đời Sống</a></li>
                      <li><a href="#">Sách Chính Trị</a></li>
                      <li><a href="#">Sách Ẩm Thực</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-2_2">
                  <div className="single-widget">
                    <h2>Policies</h2>
                    <ul className="nav nav-pills nav-stacked">
                      <li><a href="#">Terms of Use</a></li>
                      <li><a href="#">Privecy Policy</a></li>
                      <li><a href="#">Refund Policy</a></li>
                      <li><a href="#">Billing System</a></li>
                      <li><a href="#">Ticket System</a></li>
                    </ul>
                  </div>
                </div>
              
                <div className="col-sm-3 ">
                  <div className="single-widget">
                    <h2>About Vt.BookStore</h2>
                    <form action="#" className="searchform">
                     
                      <p>Bookstore website offers numerous significant advantages. Users can access books anytime,
                          ...</p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
         

          <div className="footer-bottom">
            <div className="container">
              <div className="row">
                <p className="pull-left">Vintage BookStore</p>
                <p className="pull-right">Designed by <span><a target="_blank" href="http://www.themeum.com">Khanh pham</a></span></p>
              </div>
            </div>
          </div>
          
        </footer>
  
</div>
       
      );
}
export default Footer;