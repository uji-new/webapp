import React from "react";
import urlcat from 'urlcat'

//crear cuenta de usuario
export const crearCuenta = async info => {
    console.log("Crear una cuenta")
    console.log(info.mail, info.password);
    return fetch(  urlcat('/user', {
            mail: info.mail, password: info.password}), {
            method: 'POST', credentials:'same-origin'}
    )
}

//borrar cuenta de usuario
export const borrarCuenta = async info => {
    console.log("Borrar una cuenta")
    fetch(  urlcat('/user'), {
            method: 'DELETE', credentials:'same-origin'}
    );
    console.log("Usuario Borrado")
}

//iniciar sesion de usuario
export const iniciarSesion = async info => {
    var estado;

    console.log("Iniciar Sesion")
    console.log(info.mail, info.password);
    fetch(  urlcat('/session', {
        mail: info.mail, password: info.password}), {
            method: 'POST', credentials:'same-origin'}
    ).then(r => r.ok?estado = true:estado=false)
    .catch(r => estado = false)

    console.log("Session Iniciada")
    return estado
}

//borrar sesion de usuario
export const borrarSesion = async info => {
    console.log("Borrar Sesion")
    fetch(  urlcat('/session'), {
            method: 'DELETE', credentials:'same-origin'}
    );
    console.log("Session Borrada")
}