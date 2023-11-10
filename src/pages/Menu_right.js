import { Link } from "react-router-dom";
import thanhxuan from '../image/thanhxuan.jpg'
import thanhxuan_1 from '../image/thanhxuan_1.jpg'

function Menu_right() {
  return (
    <div>
      <div className="co">
        <div className="Right_sidebar">
          <h2>Sách Nổi Bật</h2>
          <h3>Our Beloved Summer</h3>
          <h4> Author: Song Jong Ki</h4>
         
          <img src={thanhxuan} />

          <div className="brands_products">{/*brands_products*/}
            <h2>Sách Nổi Bật</h2>
            <h3>Our Beloved Summer</h3>
            <h4> Author: Song Jong Ki</h4>
           
            <img src={thanhxuan_1} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu_right;
