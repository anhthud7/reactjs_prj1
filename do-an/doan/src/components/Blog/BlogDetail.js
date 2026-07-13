import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

function BlogDetail(props) {
    let params = useParams();

    const [data, setData] = useState('');
    const [comment, setComment] = useState([]);
    const [idReply, setIdReply] = useState(0);
    const [textComment, setTextComment] = useState("");

    useEffect(() => {
        axios.get('http://localhost/laravel8/laravel8/public/api/blog/detail/' + params.id)
            .then(response => {
                setData(response.data.data);
                setComment(response.data.data.comment);
            })
            .catch(error => {
                console.error("Loi goi API: ", error);
            });
    }, [params.id]);

    // PHẦN BLOG/COMMENT 
    const handleReplyComment = (idCha) => {
        setIdReply(idCha);

        const commentArea = document.getElementById('comment-area');
        if (commentArea) {
            commentArea.focus();
            commentArea.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // SUBMIT COMMENT
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
        formData.append('id_blog', params.id);

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

        axios.post("http://localhost/laravel8/laravel8/public/api/blog/comment/" + params.id, formData, config)
            .then(response => {
                console.log("Đã đăng bình luận thành công", response);

                if (response.data.data) {
                    setComment(prevList => [...prevList, response.data.data]);
                    setTextComment("");
                    setIdReply(0);
                }
            })
            .catch(error => {
                console.error("Loi gui comment len back end", error);
                alert("Gửi bình luận thất bại");
            });
    }

    function renderBlogDetail() {
        if (!data) {
            return <p>Đang tải nội dung bài viết...</p>;
        }

        return (
            <div className="single-blog-post">
                <h3>{data.title}</h3>

                <div className="post-meta">
                    <ul>
                        <li><i className="fa fa-user"></i> Admin {data.id_auth}</li>
                        <li>
                            <i className="fa fa-calendar"></i> {new Date(data.created_at).toLocaleDateString('vi-VN')}
                        </li>
                    </ul>
                </div>

                <a href="#/">
                    <img src={"http://localhost/laravel8/laravel8/public/upload/Blog/image/" + data.image} alt={data.title} />
                </a>

                <p><strong>{data.description}</strong></p>
                <br />

                <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />

                <div className="pager-area">
                    <ul className="pager pull-right">
                        <li><a href="#/">Pre</a></li>
                        <li><a href="#/">Next</a></li>
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <section>
            <div className="container">
                <div className="row">

                    {/* Cột trái: Left Sidebar */}
                    <div className="col-sm-3">
                        <div className="left-sidebar">
                            <h2>Category</h2>
                            <div className="panel-group category-products" id="accordian">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordian" href="#sportswear">
                                                <span className="badge pull-right"><i className="fa fa-plus"></i></span>
                                                Sportswear
                                            </a>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-9">
                        <div className="blog-post-area">
                            <h2 className="title text-center">Blog Single</h2>
                            {renderBlogDetail()}
                        </div>

                        <div className="rating-area">
                            <ul className="ratings">
                                <li className="rate-this">Rate this item:</li>
                                <li>
                                    <i className="fa fa-star color"></i>
                                    <i className="fa fa-star color"></i>
                                    <i className="fa fa-star color"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </li>
                                <li className="color">(6 votes)</li>
                            </ul>
                        </div>

                        {/* VÙNG RENDER DANH SÁCH BÌNH LUẬN */}
                        <div className="response-area">
                            <h2>RESPONSES ({comment.length})</h2>
                            <ul className="media-list">
                                {comment.map((cmt) => (
                                    <li className="media" key={cmt.id}>
                                        <a className="pull-left" href="#/">
                                            <img
                                                className="media-object"
                                                src={`http://localhost/laravel8/laravel8/public/upload/user/avatar/${cmt.image_user}`}
                                                alt=""
                                                style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                                            />
                                        </a>
                                        <div className="media-body">
                                            <ul className="sinlge-post-meta">
                                                <li><i className="fa fa-user"></i> {cmt.name_user}</li>
                                                <li><i className="fa fa-calendar"></i> {new Date(cmt.created_at).toLocaleDateString('vi-VN')}</li>
                                            </ul>
                                            <p>{cmt.comment}</p>
                                            <button className="btn btn-primary btn-sm" onClick={() => handleReplyComment(cmt.id)}>
                                                <i className="fa fa-reply"></i> Reply
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* KHU VỰC KHUNG NHẬP LIỆU BÌNH LUẬN (REPLAY BOX) */}
                        <div className="replay-box">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h2>Leave a replay</h2>

                                    {idReply !== 0 && (
                                        <p style={{ color: 'orange', fontWeight: 'bold' }}>
                                            Đang phản hồi bình luận #{idReply} {' '}
                                            <button className="btn btn-warning btn-xs" onClick={() => setIdReply(0)}>Hủy Reply</button>
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

                    </div>
                </div>
            </div>
        </section>
    );
}

export default BlogDetail;