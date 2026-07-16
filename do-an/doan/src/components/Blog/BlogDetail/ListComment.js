import React from 'react';

function ListComment({ comment, onReplyComment }) {
    return (
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
                                <li>
                                    <i className="fa fa-calendar"></i> {' '}
                                    {new Date(cmt.created_at).toLocaleDateString('vi-VN')}
                                </li>
                            </ul>
                            <p>{cmt.comment}</p>
                            <button 
                                className="btn btn-primary btn-sm" 
                                onClick={() => onReplyComment(cmt.id)}
                            >
                                <i className="fa fa-reply"></i> Reply
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListComment;