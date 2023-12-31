import { useState } from "react";
import CheckError from "./CheckError";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    // role_id: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  function handleInput(e) {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    let errorsSubmit = {};
    let flag = true;

    if (inputs.email === "") {
      errorsSubmit.email = "Vui long nhap lai Email";
      flag = false;
    } else if (!IsEmail(inputs.email)) {
      errorsSubmit.email = "Chua dung dinh dang Email";
      flag = false;
    }
    if (inputs.password === "") {
      errorsSubmit.password = "Vui long nhap password";
      flag = false;
    }
    // if (inputs.role_id === "" || inputs.role_id === undefined) {
    //   errorsSubmit.role_id = "Vui Lòng Nhập role_id";
    //   flag = false;
    // }

    if (!flag) {
      setErrors(errorsSubmit);
      alert("Login that bai");
    } else {
      setErrors({});
      const data = {
        email: inputs.email,
        password: inputs.password,
        // role_id: inputs.role_id,
      };
      axios
        .post("http://localhost:8081/login", data)
        .then((res) => {
          console.log(res);

           localStorage.setItem('isLoggedIn', JSON.stringify({ loggedIn: true }));

          
     
          const Token = res.data.jsontoken;
          console.log(Token);
          Cookies.set('Token', Token);
          const Auth = res.data.User;
          console.log(Auth);
          Cookies.set('Auth', JSON.stringify(Auth));
          

          // Cookies.setItem('Auth', JSON.stringify(Auth));
          
          alert("Login thanh cong");
          navigate("/")
          // Sau khi đăng nhập thành công, điều hướng đến trang tương ứng
          
        })
        .catch((error) => { 
          console.log(error);
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
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={handleInput}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleInput}
          />
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
