import axios from "axios";
import { useEffect } from "react";

function Wishlist() {
  useEffect(() => {
    axios
      .post(`http://localhost:8081/add-to-favorites`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div>
      <h1>day la muc</h1>
    </div>
  );
}
export default Wishlist;
