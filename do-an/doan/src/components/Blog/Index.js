// import React from 'react';

// function Index() {
//   return (
//     <div className="col-sm-9">
//       <div className="blog-post-area">
//         <h2 className="title text-center">Latest From our Blog</h2>


//         <div className="single-blog-post">
//           <h3>Girls Pink T Shirt arrived in store</h3>
//           <div className="post-meta">
//             <ul>
//               <li><i className="fa fa-user"></i> Mac Doe</li>
//               <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
//               <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
//             </ul>
//             <span>
//               <i className="fa fa-star"></i>
//               <i className="fa fa-star"></i>
//               <i className="fa fa-star"></i>
//               <i className="fa fa-star"></i>
//               <i className="fa fa-star-half-o"></i>
//             </span>
//           </div>
//           <a href="#">
//             <img src="/frontend/images/blog/blog-one.jpg" alt="" />
//           </a>
//           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
//           <a className="btn btn-primary" href="#">Read More</a>
//         </div>
//         <div className="single-blog-post">
//           <h3>Girls Pink T Shirt arrived in store</h3>
//           <div className="post-meta">
//             <ul>
//               <li><i className="fa fa-user"></i> Mac Doe</li>
//               <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
//               <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
//             </ul>
//             <span>
//               <i className="fa fa-star"></i>
//               <i className="fa fa-star"></i>
//               <i className="fa fa-star"></i>
//               <i className="fa fa-star"></i>
//               <i className="fa fa-star-half-o"></i>
//             </span>
//           </div>
//           <a href="#">
//             <img src="/frontend/images/blog/blog-two.jpg" alt="" />
//           </a>
//           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
//           <a className="btn btn-primary" href="#">Read More</a>
//         </div>
//         <div className="single-blog-post">
//           <h3>Girls Pink T Shirt arrived in store</h3>
//           <div className="post-meta">
//             <ul>
//               <li><i className="fa fa-user"></i> Mac Doe</li>
//               <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
//               <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
//             </ul>
//             <span>
//               <i className="fa fa-star"></i>
//               <i className="fa fa-star"></i>
//               <i className="fa fa-star"></i>
//               <i className="fa fa-star"></i>
//               <i className="fa fa-star-half-o"></i>
//             </span>
//           </div>
//           <a href="#">
//             <img src="/frontend/images/blog/blog-three.jpg" alt="" />
//           </a>
//           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
//           <a className="btn btn-primary" href="#">Read More</a>
//         </div>


//         <div className="pagination-area">
//           <ul className="pagination">
//             <li><a href="#" className="active">1</a></li>
//             <li><a href="#">2</a></li>
//             <li><a href="#">3</a></li>
//             <li><a href="#"><i className="fa fa-angle-double-right"></i></a></li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Index;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Index() {
//   const [blogs, setBlogs] = useState([]);

//   useEffect (() => {
//     axios.get("http://localhost/laravel8/laravel8/public/api/blog")
//     .then(res => {
//       setBlogs(res.data.blogs);
//     })
//     .catch(error => {
//       console.error("Loi goi API:", error);
//     });
//   }, []);

//   function renderBlogs() {
//     if (blogs.length > 0 ) {
//       return blogs.map((value, key) => {
//         return (
//           <div className="single-blog-post" key={key}>
//             <h3>{value.title}</h3>
//             <div className="post-meta">
//               <ul>
//                 <li><i className="fa fa-user"></i> {value.author}</li>
//                 <li><i className="fa fa-clock-o"></i> {value.time}</li>
//                 <li><i className="fa fa-calendar"></i> {value.date}</li>
//               </ul>
//               <span>
//                 <i className="fa fa-star"></i>
//                 <i className="fa fa-star"></i>
//                 <i className="fa fa-star"></i>
//                 <i className="fa fa-star"></i>
//                 <i className="fa fa-star-half-o"></i>
//               </span>
//             </div>
//             <a href="#">
//               <img src={value.image} alt="" />
//             </a>
//             <p>{value.excerpt}</p>
//             <a className="btn btn-primary" href={value.link}>
//               Read More
//             </a>
//           </div>
//         );
//       });
//     }
//   }
// }
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
        console.error("Loi goi API:", error);
      });
  }, []);

  function renderBlogs() {
    if (blogs.length > 0) {
      return blogs.map((value, key) => {
        return (
          <div className="single-blog-post" key={value.id || key}>
            <h3>{value.title}</h3>
            <div className="post-meta">
              <ul>
                <li><i className="fa fa-user"></i> Admin {value.id_auth}</li>
                <li>
                  <i className="fa fa-calendar"></i> {new Date(value.created_at).toLocaleDateString('vi-VN')}
                </li>
              </ul>
              <span>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star-half-o"></i>
              </span>
            </div>

            {/* thay đổi thẻ <a> thành thẻ <Link> động bọc quanh hình ảnh */}
            <Link to={"/blog/detail/" + value.id}>
              <img src={"http://localhost/laravel/public/upload/Blog/image/" + value.image} alt={value.title} />
            </Link>

            <p>{value.description}</p>

            {/* ĐÃ SỬA: Thay đổi thẻ <a> thành thẻ <Link> động cho nút Read More */}
            <Link className="btn btn-primary" to={"/blog/detail/" + value.id}>
              Read More
            </Link>
          </div>
        );
      });
    } else {
      return <p>Đang tải danh sách bài viết...</p>;
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