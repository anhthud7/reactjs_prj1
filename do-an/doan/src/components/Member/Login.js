import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormErrors from './FormErrors';

function Login() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        level: 0
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs(state => ({ ...state, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let errorsSubmit = {};
        let flag = true;

        if (inputs.email.trim() === "") {
            errorsSubmit.email = "Vui lòng nhập email";
            flag = false;
        }
        if (inputs.password.trim() === "") {
            errorsSubmit.password = "Vui lòng nhập password";
            flag = false;
        }

        if (flag === false) {
            setErrors(errorsSubmit);
        } else {
            setErrors({});

            let config = { 
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                } 
            };

            const formData = new FormData();
            formData.append('email', inputs.email);
            formData.append('password', inputs.password);
            formData.append('level', 0);

            axios.post("http://localhost/laravel8/laravel8/public/api/login", formData, config)
                .then((res) => {
                    if (res.data.errors) {
                        setErrors(res.data.errors);
                    } else {
                        // Success
                        localStorage.setItem("isLoggedin", true);
                        localStorage.setItem("userData", JSON.stringify(res.data));
                        localStorage.setItem("accessToken", res.data.token);
                        
                        alert("Đăng nhập thành công!");
                        navigate('/'); 
                    }
                })
                .catch((error) => {
                    console.error("Lỗi đăng nhập:", error);
                    setErrors({ login: "Email hoặc mật khẩu không đúng" });
                });
        }
    };

    return (
        <div className="login-form">
            <h2> Login to your account </h2>
            <FormErrors errors={errors} />
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={inputs.email}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={inputs.password}
                    onChange={handleInputChange}
                />
                <span>
                    <input type="checkbox" className="checkbox" />
                    keep me signed in
                </span>
                <button type="submit" className="btn btn-default"> Login </button>
            </form>
        </div>
    );
}

export default Login;