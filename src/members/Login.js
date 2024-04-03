import { useState } from "react";
import CheckError from "./CheckError";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "../actions/action";

function Login() {
    const dispatch = useDispatch()

  const login = useSelector((state) => state.login.login);

  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
   
  };

  function handleSubmit(e) {
    e.preventDefault();
    let errorsSubmit = {};
    let flag = true;

    if (email === "") {
      errorsSubmit.email = "Vui long nhap lai Email";
      flag = false;
    } else if (!IsEmail(email)) {
      errorsSubmit.email = "Chua dung dinh dang Email";
      flag = false;
    }
    if (password === "") {
      errorsSubmit.password = "Vui long nhap password";
      flag = false;
    }
 

    if (!flag) {
      setErrors(errorsSubmit);
      Swal.fire({
        title: "Error!",
        text: "Login failed. Please check your credentials.",
        icon: "error"
      });
    } else {
      dispatch(fetchLogin(email, password))
      .then((data) => {
        localStorage.setItem(
          "isLoggedIn",
          JSON.stringify({ loggedIn: true })
        );
  
       const Token = data.jsontoken;
       console.log(Token);
       Cookies.set('Token', Token);
       const Auth = data.User;
       console.log(Auth);
       Cookies.set('Auth', JSON.stringify(Auth));
       navigate("/");
      })
      .catch((error) => {
        // Xử lý khi có lỗi trong quá trình đăng nhập
        console.error("Lỗi khi đăng nhập:", error);
      });
     
    }
  }

  function IsEmail(email) {
    let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zAZ0-9]{2,4})+$/;
    if (!regex.test(email)) {
      return false;
    } else {
      return true;
    }
  }

  // const arr = [
  //   { id: 1, name: "Admin" },
  //   { id: 2, name: "Member" },
  // ];

  // function renderSelect() {
  //   return arr.map((item) => (
  //     <option key={item.id} value={item.id}>
  //       {item.name}
  //     </option>
  //   ));
  // }

  return (
    <div class="col-sm-4 col-sm-offset-1">
      <div class="login-form">
        <h2>Login to your account</h2>
        <form action="#" onSubmit={handleSubmit}>
          <input type="email"placeholder="Email Address" name="email"onChange={handleInput}/>
          {errors.email && <span className='text-danger' >  {errors.email}</span>}
          <input type="password"placeholder="Password"name="password"onChange={handleInput}/>
          {errors.password && <span className='text-danger' >  {errors.password}</span>}

          {/* <select name="role_id" onChange={handleInput}>
            {renderSelect()}
          </select> */}
          <span>
            <input type="checkbox" class="checkbox" />
            Keep me signed in
          </span>
          <button type="submit" class="btn btn-default">
            Login
          </button>
        </form>
        <CheckError errors={errors} />
      </div>
    </div>
  );
}

export default Login;
