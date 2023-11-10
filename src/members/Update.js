import { useState, useEffect } from "react";
import CheckError from "./CheckError";
import axios from "axios";
import Cookies from 'js-cookie';
function Update() {
  const [errors, setErrors] = useState({});
  const [avatar, setAvatar] = useState("");
  const [getFile, setFile] = useState([]);
  const [user, setUser] = useState({
    fullName: "",
    address: "",
    phone_number: "",
    birth_date: "",
    gender: "",
    avatar: "", // This field should match the Multer field name
  });


  const handleInput = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setUser((state) => ({ ...state, [nameInput]: value }));
  };

  function handleFile(e) {
    const file = e.target.files[0]; // Select the first file if multiple files are not supported
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target.result);
      setFile(file);
    };
    reader.readAsDataURL(file);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorsSubmit = {};
    let flag = true;

    if (user.fullName === "") {
      errorsSubmit.fullName = "Vui lòng nhập họ và tên";
      flag = false;
    }
    if (user.phone_number === "") {
      errorsSubmit.phone_number = "Vui lòng nhập số điện thoại";
      flag = false;
    }
    if (user.birth_date === "") {
      errorsSubmit.birth_date = "Vui lòng nhập birthday";
      flag = false;
    }
    if (user.gender === "") {
      errorsSubmit.gender = "Vui lòng nhập Giới Tính";
      flag = false;
    }

    if (getFile.length === 0) {
      errorsSubmit.avatar = "Vui lòng chọn file";
      flag = false;
    } else {
      let size = getFile.size;
      let name = getFile.name;
      let ext = name.split(".").pop();
      let arrayExt = ["png", "jpg", "jpeg"];
      if (!arrayExt.includes(ext)) {
        errorsSubmit.avatar = "Chỉ được upload file 'png', 'jpg', 'jpeg'";
        setFile([]);
        flag = false;
      } else if (size > 1024 * 1024) {
        errorsSubmit.avatar = "File quá lớn (tối đa 1MB)";
        flag = false;
      }
    }

    if (!flag) {
      setErrors(errorsSubmit);
      alert("Cập nhật thông tin thất bại");
    } else {
      setErrors({});
      const Token = Cookies.get('Token');
console.log(Cookies.get('Token'));


// let Auth = JSON.parse(localStorage.getItem("Auth"));
// console.log(Auth);

let url = "http://localhost:8081/member/add_infomation" ;

const config = {
  headers: {
    Authorization: 'Bearer ' + Token,
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
  },
};
console.log(config);

      const formData = new FormData();
      formData.append("fullName", user.fullName);
      formData.append("address", user.address);
      formData.append("phone_number", user.phone_number);
      formData.append("birth_date", user.birth_date);
      formData.append("gender", user.gender);
      formData.append("avatar", getFile); // Ensure it matches the Multer field name

     axios.post(url, formData, config)
            .then(response => {
              console.log(response);     
            })
            .catch(error => {
              console.log(error);      
            });
            alert("create  thông tin thanh cong"); 
        }
  };

  return (
    <div className="col-sm-4">
      <div className="signup-form">
        <h2>Create Information</h2>
        <form action="#" onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            onChange={handleInput}
            value={user.fullName}
          />
          <input
            type="text"
            placeholder="Address"
            name="address"
            onChange={handleInput}
            value={user.address}
          />
          <input
            type="text"
            placeholder="Phone Number"
            name="phone_number"
            onChange={handleInput}
            value={user.phone_number}
          />
          <input
            type="text"
            placeholder="Birth Date"
            name="birth_date"
            onChange={handleInput}
            value={user.birth_date}
          />
          <input
            type="text"
            placeholder="Gender"
            name="gender"
            onChange={handleInput}
            value={user.gender}
          />
          <input type="file" name="avatar" onChange={handleFile} />
          <button type="submit" className="btn btn-default">
            Update
          </button>
        </form>
        <CheckError errors={errors} />
      </div>
    </div>
  );
}

export default Update;
