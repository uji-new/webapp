import React from "react";
import urlcat from 'urlcat'

//ver lugares guardados
export const verLugares = async info => {
    console.log("Peticion para ver los lugares")
    fetch(  urlcat('/places'), {
            method: 'GET', credentials:'same-origin'}
    ).then(response => response.text())
    .then(data => console.log(data));
    console.log("Lugares Mostrados")
}

//anyadir lugar guardado
export const anadirLugares = async info => {
    console.log("Anadiendo un nuevo lugar")
    fetch(  urlcat('/places/:query?alias=:name', {
            query:info.query, name:info.name}), {
            method: 'POST', credentials:'same-origin'}
    ).then(response => response.text())
    .then(data => console.log(data));
    console.log("Lugar anadido")
}

//buscar nuevos lugares (por topónimo o coordenadas)
export const buscarLugares = async info => {
    console.log("Buscando un nuevo lugar")
    fetch(  urlcat('/query/:query', {
            query: info.query}), {
            method: 'GET', credentials:'same-origin'}
    ).then(response => response.text())
    .then(data => console.log(data));
    console.log("Luegar buscado")
}