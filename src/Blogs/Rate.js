import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";

function Rate(props)
{

    const [rating , setRating] = useState(0)
    const [averageRating, setAverageRating] = useState(0);

    const navigate = useNavigate()
    useEffect(()=>{
        function fetchData()
        {
           axios.get("http://localhost:8080/laravel8/public/api/blog/rate/" + props.id_blog)
           .then(res=>{
                console.log(res)
                 const ratings = res.data.ratings;
                 if (ratings && ratings.length > 0) {
                   const sumOfRatings = ratings.reduce((acc, rating) => acc + rating.rate, 0);
                   const avgRating = sumOfRatings / ratings.length;
                   setAverageRating(avgRating);
                 }
           })
           .catch(function (error) {
            console.log(error);
          });
        }
        fetchData();
    }, [props.id_blog])


    function changeRating(newRating)
    {
        setRating(newRating)
        var isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
        if(isLoggedIn)
        {
            const id_blog = {props}
            let Token = JSON.parse(localStorage.getItem("Token"));
            console.log(Token)
            let Auth = JSON.parse(localStorage.getItem("Auth"));
            console.log(Auth)
            let url = "http://localhost:8080/laravel8/public/api/blog/rate/" + props.id_blog;
      console.log(url)
      let config = { 
        headers: { 
        'Authorization': 'Bearer '+ Token,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
        }         
    };	
        const formData = new FormData();
        formData.append('blog_id', props.id_blog)
        formData.append('user_id',Auth.id)
        formData.append('rate',newRating)
        axios.post(url, formData, config)
        .then(response => {
          console.log(response);
          
        })
        .catch(error => {
          console.log(error);
          
        });

        }
        else{
            alert("Vui long login sau khi danh gia")
            navigate('/login') 
          }


    }

    return(
  <div>
   <StarRatings rating={averageRating} starRatedColor="blue" numberOfStars={""} name="average-rating" />
    <StarRatings rating = {rating} starRatedColor="blue" 
  changeRating={changeRating} 
  numberOfStars={6} name ='rate' />
  
  </div>
      
        
      );
}
export default Rate;