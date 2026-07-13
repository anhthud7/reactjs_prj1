import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './index.css';
import App from './App';
import BlogIndex from './components/Blog/Index';
import BlogDetail from './components/Blog/BlogDetail';
import reportWebVitals from './reportWebVitals';
import Index from './components/Member/Index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/detail/:id" element={<BlogDetail />} />
          <Route path='/member/login-register' element={<Index />} /> 
          <Route path="/blog/detail/:id" element={<BlogDetail />} />       
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
