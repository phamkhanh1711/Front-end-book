import { useState } from "react";
import CheckError from "../members/CheckError";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Comment(props)
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
            const id_blog = {props}

            console.log(id_blog)
            let Token = JSON.parse(localStorage.getItem("Token"));
            console.log(Token)
            
            let Auth = JSON.parse(localStorage.getItem("Auth"));
            console.log(Auth)
            let url = "http://localhost:8080/laravel8/public/api/blog/comment/" + props.id_blog;
            console.log(url)
            
                   
            let config = { 
                headers: { 
                'Authorization': 'Bearer '+ Token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                } 
            };	
            if (textarea.message) {
                const formData = new FormData();
                 formData.append('id_blog', props.id_blog);
                 formData.append('id_user', Auth.id);
                 formData.append('name_user', Auth.name);
                 formData.append('comment', textarea.message);
                formData.append('id_comment', 0);
                 formData.append('image_user', Auth.avatar);
               
                axios.post(url, formData, config)
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

    return (
    <div class="replay-box">
        <div class="row">
            <div class="col-sm-12">
                <h2>Leave a replay</h2>
                
                <div class="text-area">
                    <form onSubmit={handleSubmit}>
                    <div class="blank-arrow">
                        <label>Your Name</label>
                    </div>
                    <span>*</span>
                 <textarea   name="message" rows={11} defaultValue={""} onChange={handleInput} /> 
                        {renderLogin()}
                    </form>
                   <CheckError errors={errors}/>
                </div>
            </div>
        </div>
	</div>
    )
}
export default Comment;