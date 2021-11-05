import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LoginPage from './components/LoginPage';
import Pruebas from './Pruebas';
import 'bootstrap/dist/css/bootstrap.css';

//pasar sesiones dos opciones 
//credentials:'include' pasa todas las cookies del navegador
//credentials:'same-origin' pasa las cookies necesaris MEJOR OPCION
/*
function f(){
  fetch('/user?mail=xujies&password=123', {method: 'POST', credentials:'include'})
  .then(response => response.text())
  .then(data => console.log(data));
}
function p(){
  fetch('/places', {method: 'GET', credentials:'same-origin'})
  .then(response => response.text())
  .then(data => console.log(data));
}
*/
ReactDOM.render(
  <React.StrictMode>
    <Pruebas />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
