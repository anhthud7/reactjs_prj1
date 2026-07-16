import React, { useState } from 'react';
import axios from 'axios';

function Comment({ blogId, idReply, setIdReply, onCommentSuccess }) {
    const [textComment, setTextComment] = useState("");

    const handleSubmitComment = (e) => {
        e.preventDefault();

        const checkLogin = localStorage.getItem("isLoggedin") || localStorage.getItem("isLoggedIn");
        const userData = JSON.parse(localStorage.getItem("userData"));
        const accessToken = localStorage.getItem("accessToken") || localStorage.getItem("token");

        if (!checkLogin || !userData) {
            alert("Vui lòng đăng nhập để bình luận");
            return;
        }

        if (textComment.trim() === "") {
            alert("Vui lòng nhập bình luận");
            return;
        }

        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        };

        const formData = new FormData();
        formData.append('id_blog', blogId);

        let idUser = "", nameUser = "", avatarUser = "";
        if (userData.Auth) {
            idUser = userData.Auth.id;
            nameUser = userData.Auth.name;
            avatarUser = userData.Auth.avatar;
        } else if (userData.user && userData.user.auth) {
            idUser = userData.user.auth.id;
            nameUser = userData.user.auth.name;
            avatarUser = userData.user.auth.avatar;
        } else if (userData.user) {
            idUser = userData.user.id;
            nameUser = userData.user.name;
            avatarUser = userData.user.avatar;
        } else {
            idUser = userData.id;
            nameUser = userData.name;
            avatarUser = userData.avatar;
        }

        formData.append('id_user', idUser);
        formData.append('id_comment', idReply);
        formData.append('comment', textComment);
        formData.append('image_user', avatarUser);
        formData.append('name_user', nameUser);

        axios.post("http://localhost/laravel8/laravel8/public/api/blog/comment/" + blogId, formData, config)
            .then(response => {
                console.log("Đã đăng bình luận thành công", response);
                if (response.data.data) {
                    onCommentSuccess(response.data.data);
                    setTextComment("");
                    setIdReply(0);
                }
            })
            .catch(error => {
                console.error("Loi gui comment len back end", error);
                alert("Gửi bình luận thất bại");
            });
    };

    return (
        <div className="replay-box">
            <div className="row">
                <div className="col-sm-12">
                    <h2>Leave a replay</h2>

                    {idReply !== 0 && (
                        <p style={{ color: 'orange', fontWeight: 'bold' }}>
                            Đang phản hồi bình luận #{idReply} {' '}
                            <button className="btn btn-warning btn-xs" onClick={() => setIdReply(0)}>
                                Hủy Reply
                            </button>
                        </p>
                    )}

                    <form onSubmit={handleSubmitComment}>
                        <div className="text-area">
                            <div className="blank-arrow">
                                <label>Your Comment</label>
                            </div>
                            <span>*</span>
                            <textarea
                                id="comment-area"
                                rows="11"
                                value={textComment}
                                onChange={(e) => setTextComment(e.target.value)}
                                placeholder="Nhập nội dung bình luận..."
                            ></textarea>
                            <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
                                post comment
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Comment;