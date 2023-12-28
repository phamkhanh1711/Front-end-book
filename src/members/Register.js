import {  useState } from "react";
import CheckError from "./CheckError";
import axios from "axios";
import { GoogleOAuthProvider , GoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

function Register()
{
  const navigate = useNavigate()
    const [inputs, setInputs ] = useState({
      username:"",
        email:"",
        password:"",
        role_id:"",
    });
    const [errors, setErrors] = useState({});
    const [getFile, setFile] = useState([]);
    const [avatar, setAvatar] = useState("");
    function handleInput (e){
         const nameInput = e.target.name;
         const value  = e.target.value
         setInputs((state) =>({...state, [nameInput]  : value}));
    }
    function hanldeFile(e) {
        const file = e.target.files;
        const reader = new FileReader();
        reader.onload = (e) => {
         
          setAvatar(e.target.result);
          setFile(file);
         
        };
        reader.readAsDataURL(file[0]);
        
      }

      function handleSubmit(e) {
        e.preventDefault();
        let errorsSubmit = {};
        let flag = true;
      
        if (inputs.username === "") {
          errorsSubmit.username = "Vui Lòng Nhập username";
          flag = false;
        }else if (/[^a-zA-Z]/.test(inputs.username)) {
          errorsSubmit.username = "Vui lòng không nhập ký tự đặc biệt hoặc số";
          flag = false;
        } 
        else if (!/^[a-zA-Z]+$/.test(inputs.username) || inputs.username.length < 2) {
          errorsSubmit.username = "Vui lòng chỉ nhập ít nhất 2 ký tự chữ ";
          flag = false;
        } 
        if (inputs.email === "") {
          errorsSubmit.email = "Vui Lòng Nhập Email";
          flag = false;
        } else if (!IsEmail(inputs.email)) {
          errorsSubmit.email = "Chưa đúng định dạng Email";
          flag = false;
        }
        if (inputs.password === "") {
          errorsSubmit.password = "Vui lòng Nhập mật khẩu";
          flag = false;
        } else if (
          !/^[A-Z]/.test(inputs.password) || // Kiểm tra chữ cái đầu tiên là in hoa
          !/\d/.test(inputs.password) ||     // Kiểm tra có ít nhất một chữ số
          !/[!@#$%^&*(),.?":{}|<>]/.test(inputs.password) || // Kiểm tra có ít nhất một ký tự đặc biệt
          inputs.password.length < 6            // Kiểm tra có ít nhất 6 ký tự
        ) {
          errorsSubmit.password = "Mật khẩu phải đáp ứng các yêu cầu sau:\n" +
                                   "- Bắt đầu bằng chữ cái in hoa\n" +
                                   "- Chứa ít nhất một chữ số\n" +
                                   "- Chứa ít nhất một ký tự đặc biệt\n" +
                                   "- Có ít nhất 6 ký tự";
          flag = false;
        }
        
        if (inputs.role_id === "1") {
          errorsSubmit.role_id = "Không được chọn quyền Admin";
          flag = false;
        } else if (inputs.role_id === "" || inputs.role_id === undefined) {
          errorsSubmit.role_id = "Vui Lòng Nhập role_id";
          flag = false;
        }
      
        if (!flag) {
          setErrors(errorsSubmit);
          alert("Login Thất bại");
        } else {
          setErrors({});
          const data = {
            username: inputs.username,
            email: inputs.email,
            password: inputs.password,
            role_id: inputs.role_id,
          };
      
          
          // Send a POST request to your API's registration endpoint
          axios.post("http://localhost:8081/register", data)
          
            .then((res) => {
              console.log(res);
            

             
              // localStorage.setItem('Token', JSON.stringify(Token));
            
              if (res.data.error) {
                setErrors(res.data.error);
              } else {
                alert("Thanh Cong");
                navigate("/login");
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
     
      const arr = [
        { id: 1, name: "Admin" },
        { id: 2, name: "Member" }
      ];  
      function renderSelect() {
        return arr.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ));
      }
    
      function IsEmail(email) {
        let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
      }
    return (
    <div class="col-sm-4">
        <div class="signup-form">
            <h2>Register!</h2>
            <form action="#" onSubmit={handleSubmit}>
                <input type="text" placeholder="username......." name="username" onChange={handleInput}/>
                {errors.username && <span className='text-danger' >  {errors.username}</span>}
                <input type="email" placeholder="Email Address" name="email"  onChange={handleInput}/>
                {errors.email && <span className='text-danger' >  {errors.email}</span>}
                <input type="password" placeholder="Password" name="password" onChange={handleInput}/>
                {errors.password && <span className='text-danger' >  {errors.password}</span>}
                
                <select name="role_id"  onChange={handleInput}>
                {renderSelect()}
                 </select>
                 {errors.role_id && <span className='text-danger' >  {errors.role_id}</span>}
             
                 <button type="submit" class="btn btn-default">
            Signup
          </button>
            </form>
            {/* <GoogleOAuthProvider clientId="<8273508930-fn4jqgv9fbi628qqfm1k559took0kg49.apps.googleusercontent.com>">

            <GoogleLogin
                    onSuccess={credentialResponse => {
                      console.log(credentialResponse);
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />
              </GoogleOAuthProvider> */}
            {/* <CheckError errors  = {errors} /> */}
        </div>
	</div>
    )
}
export default Register;