import { useState } from "react";
import CheckError from "../../members/CheckError";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
function Comments(props)
{
  const navigate = useNavigate()
  const [textarea , setTextarea ] = useState({
    message:""
    
});
const [errors , setErrors] = useState([]);
function handleInput(e)
    {
        const nameInput = e.target.name;
        const value = e.target.value
        setTextarea((state) =>({...state, [nameInput]:value}));


    }
    function handleSubmit(e)
    {
        e.preventDefault();
        let errorsSubmit = {};
        let flag = true;

        if(textarea.message=="")
        {
            errorsSubmit.message ="Vui lap nhap binh luan";
            flag= false;
        }
        if(!flag)
        {
            setErrors(errorsSubmit);
        }
        else{
            setErrors({});
            const { id_comment, book_id } = props;

            console.log(id_comment)
            console.log(book_id);
            const Token = Cookies.get('Token');
          console.log(Cookies.get('Token'));

          const Auth = JSON.parse(Cookies.get('Auth'));
          console.log('Auth:', Auth);


          console.log('account_id:', Auth.account_id);
  console.log('username:', Auth.username);

          let url = `http://localhost:8081/comments/${props.id_comment}`;
            console.log(url)
            
                   
            let config = {
              headers: {
                'Authorization': `Bearer ${Token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              }
            };
            
    if (textarea.message) {
      const commentData = {
        id_comment: props.id_comment,
        book_id: props.book_id,
        account_id: Auth.account_id,
         name_user: Auth.username,
        comment: textarea.message,
      };

      console.log('commentData:', commentData);

      axios.post(url, commentData, config)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
          }
        }
    }
    function renderLogin()
    {
        var isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
        if(isLoggedIn)
        {
            return(
            <button type="submit" class="btn btn-primary" >Post comment</button>
            )
        }else{
            return (
                <button onClick={logout} class="btn btn-primary" >Post comment</button>
            )
        }
    }
    function logout()
    {
        alert("Vui lòng đăng nhập để viết bình luận");
        localStorage.removeItem("isLoggedIn");
    navigate("/login");
    }

    return(
        <div className="category-tab shop-details-tab">
          
        <div className="col-sm-12">
          <ul className="nav nav-tabs">
            
            <li className="active"><a href="#reviews" data-toggle="tab">Reviews</a></li>
          </ul>
        </div>
        <div className="tab-content">
        
         
          <div className="tab-pane fade active in" id="reviews">
            <div className="col-sm-12">
              <ul>
                <li><a href><i className="fa fa-user" />EUGEN</a></li>
                <li><a href><i className="fa fa-clock-o" />12:41 PM</a></li>
                <li><a href><i className="fa fa-calendar-o" />31 DEC 2014</a></li>
              </ul>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <p><b>Write Your Review</b></p>
              <form onSubmit={handleSubmit}>
               
                <textarea  name="message" rows={11} defaultValue={""} onChange={handleInput} />
                {renderLogin()}
                
              </form>
              <CheckError errors={errors}/>
            </div>
          </div>
        </div>
      </div>
    )
}
export default Comments;