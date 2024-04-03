import {  useState } from "react";
import CheckError from "./CheckError";
import axios from "axios";
import { GoogleOAuthProvider , GoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch} from "react-redux";
import { useSelector } from "react-redux";
import { fetchRegister } from "../actions/action";
function Register()
{
  const navigate = useNavigate()
   
  const dispatch = useDispatch();

  const register = useSelector((state) => state.register.register);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role_id, setRole_id] = useState("");
    const [errors, setErrors] = useState({});
    const [getFile, setFile] = useState([]);
    const [avatar, setAvatar] = useState("");
    const handleInput = (e) => {
      const { name, value } = e.target;
      if (name === "email") setEmail(value);
      else if (name === "password") setPassword(value);
      else if (name === "username") setUsername(value);
      else if (name === "role_id") setRole_id(value);
    };
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
        if (username === "") {
          errorsSubmit.username = "Vui lòng Nhập username";
          flag = false;
        } 
        


        
        if (email === "") {
          errorsSubmit.email = "Vui Lòng Nhập Email";
          flag = false;
        } else if (!IsEmail(email)) {
          errorsSubmit.email = "Chưa đúng định dạng Email";
          flag = false;
        }
        if (password === "") {
          errorsSubmit.password = "Vui lòng Nhập mật khẩu";
          flag = false;
        } else if (
          !/^[A-Z]/.test(password) || // Kiểm tra chữ cái đầu tiên là in hoa
          !/\d/.test(password) ||     // Kiểm tra có ít nhất một chữ số
          !/[!@#$%^&*(),.?":{}|<>]/.test(password) || // Kiểm tra có ít nhất một ký tự đặc biệt
          password.length < 6            // Kiểm tra có ít nhất 6 ký tự
        ) {
          errorsSubmit.password = "Mật khẩu phải đáp ứng các yêu cầu sau:\n" +
                                   "- Bắt đầu bằng chữ cái in hoa\n" +
                                   "- Chứa ít nhất một chữ số\n" +
                                   "- Chứa ít nhất một ký tự đặc biệt\n" +
                                   "- Có ít nhất 6 ký tự";
          flag = false;
        }
        
        if (role_id === "1") {
          errorsSubmit.role_id = "Không được chọn quyền Admin";
          flag = false;
        } else if (role_id === "" || role_id === undefined) {
          errorsSubmit.role_id = "Vui Lòng Nhập role_id";
          flag = false;
        }
      
        if (!flag) {
          setErrors(errorsSubmit);
          Swal.fire({
            title: "Error!",
            text: "Sigup failed. Please check your credentials.",
            icon: "error"
          });
        } else {
          dispatch(fetchRegister(username, email, password, role_id));
      
          Swal.fire({
            title: "Success!",
            text: "Sigup success.",
            icon: "success"
          });
          navigate("/login");
          
          
        }
      }
     
      const arr = [
        {id: 3, name: "Member" },
        {  id: 1 }
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
          
        </div>
	</div>
    )
}
export default Register;













