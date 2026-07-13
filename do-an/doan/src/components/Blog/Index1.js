import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Index() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get("http://localhost/laravel8/laravel8/public/api/blog")
            .then(res => {
                if (res.data && res.data.blog && res.data.blog.data) {
                    setBlogs(res.data.blog.data);
                }
            })
            .catch(error => {
                console.error("Lỗi khi gọi API Blog:", error);
            });
    }, []);

    function renderBlogs() {
        if (blogs.length > 0) {
            return blogs.map((value, key) => {
                return (
                    <div className="single-blog-post" key={value.id || key}>
                        <h3>{value.title}</h3>
                        <div className="post-meta">
                            <span>{new Date(value.created_at).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <img
                            src={"http://localhost/laravel/public/upload/Blog/image/" + value.image}
                            alt={value.title} />
                        <p>{value.description}</p>

                        <a className="btn btn-primary" href="#">Read More</a>
                    </div>
                );
            });
        } else {
            return <p>Đang tải dữ liệu blog...</p>;
        }
    }

    return (
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                {renderBlogs()}
                <div className="pagination-area">
                    <ul className="pagination">
                        <li className="active"><a href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#"><i className="fa fa-angle-double-right"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Index;