import { useEffect } from 'react';

import Header from '../header/header';
import Main from '../main/main';
import Workers from '../workers/workers';
import Form from '../form/form';

import './app.scss';

function App() {
    useEffect(() => reveal(), [])
    function reveal() {
        var reveals = document.querySelectorAll(".reveal");
      
        for (var i = 0; i < reveals.length; i++) {
          var windowHeight = window.innerHeight;
          var elementTop = reveals[i].getBoundingClientRect().top;
          var elementVisible = 150;
      
          if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
          } else {
            reveals[i].classList.remove("active");
          }
        }
      }
      
      window.addEventListener("scroll", reveal);



    return (
        <div className="app">
            <Header/>
            <Main/>
            <Workers/>
            <Form/>
        </div>
    )
};

export default App;
