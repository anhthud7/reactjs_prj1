import React from 'react';
import Header from './components/Layout/Header';
import MenuLeft from './components/Layout/MenuLeft';
import Footer from './components/Layout/Footer';
import Detail from './components/Blog/BlogDetail'; 
import Login from './components/Member/Login';

function App(props) {
  return (
    <>
      <Header />
      <section>
        <div className="container">
          <div className="row">
            <MenuLeft />
            {props.children}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default App;
