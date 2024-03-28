import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
function MenuAcc() {
  const authData = JSON.parse(Cookies.get('Auth') || '{}');
  console.log(authData);
  const userRole = authData.role_id;
  console.log(userRole);
  return (
    <div className="col-sm-3">
      <div className="left-sidebar">
        <div className="brands_products">
          <h2>Account</h2>
          <div className="brands-name">
            <ul className="nav nav-pills nav-stacked">
              <li>
                <Link to="/profie">
                  <span className="pull-right">+</span>Profie Account
                </Link>
              </li>
              {userRole !== 1 && (
              <li>
              <Link to="/my_ds_payment">
                <span className="pull-right">+</span>My Book
              </Link>
            </li>
              )}



              {userRole !== 2 && (
                <li>
                  <Link to="/myaccount">
                    <span className="pull-right">+</span> Book Warehouse
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuAcc;
