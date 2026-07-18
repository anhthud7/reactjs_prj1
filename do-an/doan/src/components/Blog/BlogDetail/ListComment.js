import React from 'react';

function ListComment({ comment, onReplyComment }) {
    //lọc cmt gốc 
    const parentComments = comment.filter(cmt => cmt.id_comment === 0 || !cmt.id_comment);
    //lấy cmt con 
    const getChildComments = (parentId) => {
        return comment.filter(cmt => cmt.id_comment === parentId);
    };

    return (
        <div className="response-area">
            <h2>RESPONSES ({comment.length})</h2>
            <ul className="media-list">
                {parentComments.map((parentCmt) => (
                    <React.Fragment key={parentCmt.id}>
                        <li className="media">
                            <div className="pull-left">
                                <img
                                    className="media-object"
                                    src={`http://localhost/laravel8/laravel8/public/upload/user/avatar/${parentCmt.image_user}`}
                                    alt=""
                                   // style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                                />
                            </div>
                            <div className="media-body">
                                <ul className="sinlge-post-meta">
                                    <li><i className="fa fa-user"></i> {parentCmt.name_user}</li>
                                    <li>
                                        <i className="fa fa-calendar"></i>{' '}
                                        {new Date(parentCmt.created_at).toLocaleDateString('vi-VN')}
                                    </li>
                                </ul>
                                <p>{parentCmt.comment}</p>
                                <button 
                                    className="btn btn-primary btn-sm" 
                                    onClick={() => onReplyComment(parentCmt.id)}
                                >
                                    <i className="fa fa-reply"></i> Reply
                                </button>
                            </div>
                        </li>

                        {getChildComments(parentCmt.id).map((childCmt) => (
                            <li className="media second-media" key={childCmt.id} style={{ marginLeft: '60px' }}>
                                <div className="pull-left">
                                    <img
                                        className="media-object"
                                        src={`http://localhost/laravel8/laravel8/public/upload/user/avatar/${childCmt.image_user}`}
                                        alt=""
                                       // style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                                    />
                                </div>
                                <div className="media-body">
                                    <ul className="sinlge-post-meta">
                                        <li><i className="fa fa-user"></i> {childCmt.name_user} <span className="badge badge-info">Reply #{parentCmt.id}</span></li>
                                        <li>
                                            <i className="fa fa-calendar"></i>{' '}
                                            {new Date(childCmt.created_at).toLocaleDateString('vi-VN')}
                                        </li>
                                    </ul>
                                    <p>{childCmt.comment}</p>
                                    <button 
                                        className="btn btn-primary btn-sm" 
                                        onClick={() => onReplyComment(parentCmt.id)} // Click reply ở con thì vẫn tính là reply cụm cha đó
                                    >
                                        <i className="fa fa-reply"></i> Reply
                                    </button>
                                </div>
                            </li>
                        ))}
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
}

export default ListComment;