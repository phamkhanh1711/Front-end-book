import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

function Profie_account() {
  const [userData, setUserData] = useState({});
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
        setUserData(response.data.detail[0]); // Assuming the user details are in the 'detail' property
      });
  }, []);

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
      <button>Contact me</button>
    </div>
  );
}

export default Profie_account;
