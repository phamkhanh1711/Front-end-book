import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Profie_account() {
  const [userData, setUserData] = useState({});
  let navigate = useNavigate();  // Corrected useNavigate usage
  const Token = Cookies.get('Token');
  const config = {
    headers: {
      Authorization: 'Bearer ' + Token,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    },
  };

  useEffect(() => {
    // Fetch user data from your API
    axios.get("http://localhost:8081/member/detail", config)
      .then((response) => {
        console.log(response);
        setUserData(response.data.detail[0] || {});
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleDelete = () => {
    const Token = Cookies.get('Token');
    // if (userData.role_id !== 1) {
    //   alert("Bạn không có quyền xóa thông tin người dùng.");
    //   return;
    // }
    const config = {
      headers: {
        Authorization: `Bearer ${Token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    };

    const Durl = "http://localhost:8081/member/delete";

    axios
      .delete(Durl, config)
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: "Good job!",
          text: "login Successful !",
          icon: "success"
        });
       
       
        navigate("/account");  // Corrected navigation
      })
      .catch((error) => {
        console.error(error);
        alert("Xoá không thành công. Vui lòng thử lại.");
      });
  };

  return (
    <div className="card">
      <div className="card__img">
        {userData.avatar && <img src={`http://localhost:8081/public/upload/${userData.avatar}`} alt="" />}
      </div>
      <h2>{userData.fullName}</h2>
      <p>{userData.address}</p>
      <p>{userData.phone_number}</p>
      <div className="card__social">
        <a target="_blank" href="#"><i className="fa fa-facebook" /></a>
        <a target="_blank" href="#"><i className="fa fa-twitter" /></a>
        <a target="_blank" href="#"><i className="fa fa-linkedin" /></a>
        <a target="_blank" href="#"><i className="fa fa-google-plus" /></a>
      </div>
     
      <div className="delete">
        <button style={{ color: "red", fontSize:"15px" }} onClick={handleDelete}>Delete Information</button>
      </div>
    </div>
  );
}

export default Profie_account;
