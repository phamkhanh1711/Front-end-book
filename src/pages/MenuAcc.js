import { Link } from "react-router-dom";

function  MenuAcc()
{
    return (
    <div className="col-sm-3">
    <div className="left-sidebar">
    
      <div className="brands_products">{/*brands_products*/}
        <h2>Account</h2>
        <div className="brands-name">
          <ul className="nav nav-pills nav-stacked">
            <li><Link to="/profie"> <span className="pull-right">+</span>Profie Account</Link></li>
            <li><Link to="/myaccount"> <span className="pull-right">+</span> My Account</Link></li>
            
          </ul>
        </div>
      </div>{/*/brands_products*/}

    </div>
  </div>
    )
}
export default MenuAcc;