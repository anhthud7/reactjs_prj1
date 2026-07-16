import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import ListComment from './ListComment';
import Comment from './Comment';

function Review(props) {
    let params = useParams();

    const [data, setData] = useState('');
    const [comment, setComment] = useState([]);
    const [idReply, setIdReply] = useState(0);

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

    const handleReplyComment = (idCha) => {
        setIdReply(idCha);

        const commentArea = document.getElementById('comment-area');
        if (commentArea) {
            commentArea.focus();
            commentArea.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleCommentSuccess = (newComment) => {
        setComment(prevList => [...prevList, newComment]);
    };

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
                        <ListComment 
                            comment={comment} 
                            onReplyComment={handleReplyComment} 
                        />

                        {/* KHU VỰC KHUNG NHẬP LIỆU BÌNH LUẬN */}
                        <Comment 
                            blogId={params.id} 
                            idReply={idReply} 
                            setIdReply={setIdReply} 
                            onCommentSuccess={handleCommentSuccess} 
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Review;