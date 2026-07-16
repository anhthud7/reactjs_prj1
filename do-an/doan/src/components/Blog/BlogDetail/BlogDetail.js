import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Review from './Review';
import ListComment from './ListComment';
import Comment from './Comment';

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
        setTextComment("");
        setIdReply(0);
    };

    return (
        <section>
            <div className="container">
                <div className="row">

                    {/*Left Sidebar */}
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

                    {/* Right sidebar*/}
                    <div className="col-sm-9">
                        <div className="blog-post-area">
                            <h2 className="title text-center">Blog Single</h2>
                            <Review data={data} />
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

                
                        <ListComment 
                            comment={comment} 
                            onReplyComment={handleReplyComment} 
                        />

                        <Comment 
                            blogId={params.id}
                            idReply={idReply}
                            setIdReply={setIdReply}
                            textComment={textComment}
                            setTextComment={setTextComment}
                            onCommentSuccess={handleCommentSuccess}
                        />

                    </div>
                </div>
            </div>
        </section>
    );
}

export default BlogDetail;