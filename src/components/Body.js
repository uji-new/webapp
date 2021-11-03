import React from 'react';
import { Clima, Evento, Noticia } from './Servicios'

export default function Body (){
    return(
        <div name="panel-principal" class="col-9 offset-2" id="main">   
            <div name="panel-noticias" class="container h-30 d-flex flex-row justify-content-around">
                <Noticia />
            </div>
            <div name="panel-noticias" class="container h-30 d-flex flex-row justify-content-around">
                <Clima />
            </div>
            <div name="panel-noticias" class="container h-30 d-flex flex-row justify-content-around">
                <Evento />
            </div>
        </div>
    );
}