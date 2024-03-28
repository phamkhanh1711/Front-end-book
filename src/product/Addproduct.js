import axios from "axios";
import CheckError from "../members/CheckError";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Addproduct()
{   
  let navigate = useNavigate()
  const [getData, setData] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [errors, setErrors] = useState([]);
  const [fileElem, setFileElem] = useState(null);
  const [myImage, setMyImage] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [user, setUser] = useState({
    bookTitle: "",
    price: "",
    author: "",
    publicationYear: "",
    category: "",
    newCategory: "",
    supplier:"",
  });
  useEffect(() => {
    axios.get("http://localhost:8081/all_category")
      .then((res) => {
        console.log(res);
        setData(res.data.category);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function renderCategoryOptions() {
    return (
      <div>
        <select name="category" onChange={handleInput} value={user.category}>
          <option value="" disabled hidden>
            Please choose Category ....
          </option>
          {getData.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.category_name}
            </option>
          ))}
        </select>
       
        <input
          type="text"
          placeholder="New Category..."
          name="newCategory"
          onChange={handleInput}
          value={user.newCategory}
        />
        
      </div>
    );
  }
  
  
  useEffect(() => {
  axios.get("http://localhost:8081/all_supplier")
    .then((res) => {
      console.log(res);
      setSuppliers(res.data.suppliers); // Đặt danh sách nhà cung cấp vào state
    })
    .catch((error) => {
      console.log(error);
    });
}, []);
  
  function renderSupplierOptions() {
    return (
      <select name="supplier" onChange={handleInput} value={user.supplier}>
        <option value="" disabled hidden>
          Please choose Supplier ....
        </option>
        {suppliers.map((supplier) => (
          <option key={supplier.supplier_id} value={supplier.supplier_id}>
            {supplier.supplier_name}
          </option>
        ))}
      </select>
    );
  }
      
  const handleInput = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setUser((state) => ({ ...state, [nameInput]: value }));
  };
  
  const hanldeFile = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      if (name === 'fileElem') {
        setFileElem(files[0]);
      } else if (name === 'myImage') {
        setMyImage(files[0]);
      }
    }
  };

  
  function handleSubmit(e) {
    e.preventDefault();
    let errorsSubmit = {};
    let flag = true;
  
    if (user.bookTitle === "") {
      errorsSubmit.bookTitle = "Vui lòng nhập tiêu đề sách";
      flag = false;
    } 
  
  if (user.price === "") {
    errorsSubmit.price = "Vui lòng nhập giá sách";
    flag = false;
} else if (!/^\d+$/.test(user.price)) {
    errorsSubmit.price = "Vui lòng chỉ nhập số";
    flag = false;
} else if (parseInt(user.price, 10) < 0) {
    errorsSubmit.price = "Giá sách không được âm";
    flag = false;
} else if (parseInt(user.price, 10) < 10000) {
    errorsSubmit.price = "Giá sách không được dưới 10,000 VND";
    flag = false;
}

if (user.author === "") {
  errorsSubmit.username = "Vui lòng Nhập author ";
  flag = false;
} else if (!/[a-zA-Z]/.test(user.author)) {
  errorsSubmit.author = "Vui lòng nhập ít nhất một ký tự chữ";
  flag = false;
} else if (!/^\S+(?: \S+)*$/.test(user.author)) {
  errorsSubmit.author = "Vui lòng chỉ nhập một khoảng trắng giữa các ký tự";
  flag = false;
}

    if (!user.supplier) {
      errorsSubmit.supplier = "Vui lòng chọn nhà cung cấp";
      flag = false;
    }
  
    const currentDate = new Date();
const userPublicationDate = new Date(user.publicationYear);

if (!user.publicationYear || userPublicationDate > currentDate) {
  errorsSubmit.publicationYear = "Vui lòng chọn năm xuất bản hợp lệ";
  flag = false;
}

  
    if (fileElem === null) {
      errorsSubmit.fileElem = "Vui lòng chọn ảnh cho File Elem";
      flag = false;
    }
  
    if (myImage === null) {
      errorsSubmit.myImage = "Vui lòng chọn ảnh cho My Image";
      flag = false;
    } else {
      let size = myImage.size;
      let name = myImage.name;
      let ext = name.split(".").pop();
      let arrayExt = ["png", "jpg", "jpeg"];
      if (!arrayExt.includes(ext)) {
        errorsSubmit.myImage = "Chỉ được upload file 'png', 'jpg', 'jpeg' cho My Image";
        flag = false;
      } else if (size > 1024 * 1024) {
        errorsSubmit.myImage = "File quá lớn (tối đa 1MB) cho My Image";
        flag = false;
      }
  
      // Check if a category or a newCategory is provided, and add to formData
    
    }
  
    if (!flag) {
      setErrors(errorsSubmit);
      alert("Create product! Thất bại");
    } else {
      setErrors({});
      const Token = Cookies.get('Token');
      console.log(Cookies.get('Token'));
      let url = "http://localhost:8081/add_book";
      console.log(url);
  
      let config = {
        headers: {
            Authorization: "Bearer " + Token,
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
        },
      };
      const formData = new FormData();
      if (user.category) {
        formData.append('category', user.category);
      }
      if (user.newCategory) {
        formData.append('newCategory', user.newCategory);
      }
      formData.append('bookTitle', user.bookTitle);
      formData.append('price', user.price);
      formData.append('author', user.author);
      formData.append('supplier', user.supplier);
      formData.append('publicationYear', user.publicationYear);
      formData.append('fileElem', fileElem);
      formData.append('myImage', myImage);
  
      axios
        .post(url, formData, config)
        .then((response) => {
          console.log(response);
          setErrors({});
          // alert("Create product! Thành công");
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Create product! Thành công"
          });
          navigate("/myaccount")
        })
        .catch((error) => {
          console.log(error);
          alert("Create product! Thất bại");
        });
    }
  }
  

  return (
    <div className="col-sm-4">
      <div className="signup-form">
        <h2>CREATE BOOK</h2>
        <form action="#" onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="text"placeholder="Book Title"name="bookTitle"onChange={handleInput}value={user.bookTitle}/>
          {errors.bookTitle && <span className='text-danger' >  {errors.bookTitle}</span>}

          <input type="text"  placeholder="Price" name="price" onChange={handleInput} value={user.price}/>
          {errors.price && <span className='text-danger' >  {errors.price}</span>}

          <input type="text" placeholder="Author" name="author" onChange={handleInput} value={user.author}/>
          {errors.author && <span className='text-danger' >  {errors.author}</span>}

          <input type="date" name="publicationYear" onChange={handleInput} value={user.publicationYear} />
          {errors.publicationYear && <span className='text-danger' >  {errors.publicationYear}</span>}

          {renderCategoryOptions()}
          

      {renderSupplierOptions()}
        
    
          <label htmlFor="fileElem">Select File:</label>
          <input type="file" name="fileElem" onChange={hanldeFile} />
    
          <label htmlFor="myImage">Select Image:</label>
          <input type="file" name="myImage" onChange={hanldeFile} />
    
          <button type="submit" className="btn btn-default">
            Create Book
          </button>
        </form>
    
        {/* <CheckError errors={errors} /> */}
      </div>
    </div>
  );
}
export default Addproduct;
