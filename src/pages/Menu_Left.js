import axios from "axios";
import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";

function Menu_Left()
{
  
  const navigate = useNavigate();
  const handleCategoryClick = (categoryID) => {
    navigate("/detective")
    
  };
  const handleClick = (categoryID) => {
    navigate("/sport")
   
  };
   const handle = (categoryID) => {
    navigate("/kid")
    
  };
  const click = (categoryID) => {
    navigate("/history")
    
  };



return (

<div className="col-sm-3">
  <div className="left-sidebar">
    <h2>BOOK CATEGORY</h2>
    <div className="panel-group category-products" id="accordian">{/*category-productsr*/}
     
      <div className="panel panel-default">
        <div className="panel-heading">
        <h4 className="panel-title"> <a onClick={() => handleCategoryClick()}>Sách Trinh Thám</a></h4>
        </div>
      </div>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4 className="panel-title"><a onClick={() => handleClick()}>Sách Thể Thao</a></h4>
        </div>
      </div>
      <div className="panel panel-default">
        <div className="panel-heading">
        <h4 className="panel-title"> <a onClick={() => handle()}>Sách Cho Bé</a></h4>
        </div>
      </div>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4 className="panel-title"><a onClick={() => click()}>Sách Báo Thời Bao Cấp</a></h4>
        </div>
      </div>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4 className="panel-title"><a href="#">Sách Ẩm Thực</a></h4>
        </div>
      </div>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4 className="panel-title"><a href="#">Sách Công Nghệ Thông Tin</a></h4>
        </div>
      </div>
    
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4 className="panel-title"><Link to="/books/:id">Sách Thời Bao Cấp</Link></h4>
        </div>
      </div>
    </div>{/*/category-products*/}
    <div className="brands_products">{/*brands_products*/}
      <h2>Author</h2>
      <div className="brands-name">
        <ul className="nav nav-pills nav-stacked">
          <li><a href="#"> <span className="pull-right">(50)</span>Acne</a></li>
          <li><a href="#"> <span className="pull-right">(56)</span>Grüne Erde</a></li>
          <li><a href="#"> <span className="pull-right">(27)</span>Albiro</a></li>
          <li><a href="#"> <span className="pull-right">(32)</span>Ronhill</a></li>
          <li><a href="#"> <span className="pull-right">(5)</span>Oddmolly</a></li>
          <li><a href="#"> <span className="pull-right">(9)</span>Boudestijn</a></li>
          <li><a href="#"> <span className="pull-right">(4)</span>Rösch creative culture</a></li>
        </ul>
      </div>
    </div>{/*/brands_products*/}
    <div className="price-range">{/*price-range*/}
      <h2>Price Range</h2>
      <div className="well text-center">
        <input type="text" className="span2" defaultValue data-slider-min={0} data-slider-max={600} data-slider-step={5} data-slider-value="[250,450]" id="sl2" /><br />
        <b className="pull-left">$ 0</b> <b className="pull-right">$ 600</b>
      </div>
    </div>{/*/price-range*/}
    
  </div>
 
</div>

    );
}
export default Menu_Left;