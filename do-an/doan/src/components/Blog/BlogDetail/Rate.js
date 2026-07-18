import React, {useState, useEffect} from 'react';
import StarRatings from 'react-start-ratings';
import axios from 'axios';

function Rate() {
    const [rating, setRating] = useState(0);
    
    function handleRatingChange(newRating, name) {
        setRating(newRating);

    }
    const changeRatinhg = (newRating, name) => {
        // ddangw nhap de danh gia 
        const checkLogin = localStorage.getItem("isLoggedin") || localStorage.getItem("isLoggedin");
        const userData = JSON.parse(localStorage.getItem("userData"));
        const accessToken = localStorage.getItem("accessToken") || localStorage.getItem("token");

        if (!checkLogin|| !userData) {
            alert("Vui lòng đăng nhập để đánh giá");
            return;
        }

        let idUser = "";
        if (userData.Auth) idUser = userData.Auth.id;
        else if (userData.user && userData.user.auth) 
            idUser = userData.user.auth.id;
        else if (userData.user)
            idUser = userData.user.id; 
        else 
            idUser = userData.is; 

        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        }

        const formData = new FormData();
        formData.append('blog_id', blogId);
        formData.append('user_id', idUser);
        formData.append('rate', newRating);

        axios.post("http://localhost/laravel8/laravel8/public/api/blog/rate/" + blogId, formData, config)
            .then(response => {
                console.log("Đánh giá thành công:", response);
                alert("Cảm ơn bạn đã đánh giá bài viết!");
                
                setRating(newRating);
                if (onRateSuccess) {
                    onRateSuccess();
                }
            })
            .catch(error => {
                console.error("Lỗi gửi rate lên back-end:", error);
                alert("Gửi đánh giá khoong thành công");
            });
    };

    }
    return (
        <StarRatings
            rating = {rating}
            starRatedColor = "blue"
            changeRating = {changeRating}
            numberOfStars = {6}
            name = 'rating'
        />
    );
}
export default Rate; 