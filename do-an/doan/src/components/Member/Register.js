import React, { useState } from 'react';
import axios from 'axios';
import FormErrors from './FormErrors';

function Register() {
    // Sửa lỗi chính tả từ intputs thành inputs ở đây
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: ""
    });

    const [avatar, setAvatar] = useState("");
    const [getFile, setGetFile] = useState("");
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target; 
        setInputs(state => ({ ...state, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files;
        if (!file || file.length === 0) {
            return;
        } 
        
        let reader = new FileReader(); 
        reader.onload = (event) => {
            setAvatar(event.target.result);
            setGetFile(file[0]);
        };
        reader.readAsDataURL(file[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let errorsSubmit = {};
        let flag = true; 

        if (inputs.name.trim() === "") {
            errorsSubmit.name = "Vui lòng nhập tên";
            flag = false; 
        }
        if (inputs.email.trim() === "") {
            errorsSubmit.email = "Vui lòng nhập email";
            flag = false;
        }
        if (inputs.password.trim() === "") {
            errorsSubmit.password = "Vui lòng nhập password";
            flag = false;
        }

        if (!getFile) {
            errorsSubmit.avatar = "Vui lòng chọn ảnh đại diện";
            flag = false;
        } else {
            const maxSize = 1024 * 1024; 
            if (getFile.size > maxSize) {
                errorsSubmit.avatar = "Ảnh đại diện không được vượt qua 1MB";
                flag = false; 
            }

            // ĐƯA LOGIC CHECK ĐUÔI FILE VÀO TRONG HÀM SUBMIT
            const validExtensions = ["jpg", "jpeg", "png"];
            const fileNameParts = getFile.name.split(".");
            const fileExtension = fileNameParts[fileNameParts.length - 1]; 

            if (!validExtensions.includes(fileExtension)) {
                errorsSubmit.avatar = "Định dạng ảnh không hợp lệ (jpg, jpeg, png)";
                flag = false; 
            }
        }

        // ĐƯA PHẦN ĐẨY BIẾN DATA VÀ SET STATE LỖI VÀO TRONG HÀM SUBMIT
        // Sửa logic: Nếu flag === false (tức là có lỗi) thì mới setErrors
        if (flag === false) {
            setErrors(errorsSubmit);
        } else {
            setErrors({});

            const data = {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password, 
                phone: inputs.phone,
                address: inputs.address,
                avatar: avatar, 
                level: 0
            }; 

            axios.post("http://localhost/laravel8/laravel8/public/api/register", data)
                .then((res) => {
                    if (res.data.errors) {
                        setErrors(res.data.errors);
                    } else {
                        alert("Đăng ký thành công! Vui lòng đăng nhập.");
                        // Không bắt buộc phải login luôn, người dùng có thể tự qua form login
                    }
                })
                .catch((error) => {
                    console.error("Lỗi đăng ký:", error);
                    setErrors({ register: "Có lỗi xảy ra khi đăng ký" });
                });
        }
    };

    

    // Phần return giao diện này đứng độc lập bên trong component Register
    return (
        <div className="signup-form">
            <h2>Người dùng mới đăng ký</h2>
            <FormErrors errors={errors} /> 
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" name="name" placeholder="Name" value={inputs.name} onChange={handleInputChange} />
                <input type="email" name="email" placeholder="Email Address" value={inputs.email} onChange={handleInputChange} />
                <input type="password" name="password" placeholder="Password" value={inputs.password} onChange={handleInputChange} />
                <input type="text" name="phone" placeholder="Phone" value={inputs.phone} onChange={handleInputChange} />
                <input type="text" name="address" placeholder="Address" value={inputs.address} onChange={handleInputChange} />

                <div style={{ textAlign: 'left', marginBottom: '15px' }}> 
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Ảnh đại diện:</label>
                    <input type="file" onChange={handleFileChange} accept="image/*" />
                </div>

                <button type="submit" className="btn btn-default">Signup</button>
            </form>
        </div>
    );
}

export default Register;