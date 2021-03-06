import React, { useState, useRef, useEffect, useContext } from 'react'

import './SearchBar.css'

import Client from 'utils/Client';
import toLocalCoords from "utils/Coords";
import { AuthContext } from "App.js";


export const SearchBar = (props) => {
    const ulRef = useRef(); //valor fijo para la lista
    const inputRef = useRef(); //valor fijo para el campo input
    const [value, setValue] = useState('') //valor del campo input
    const [options, setOptions] = useState([]) //recomendaciones de la api
    const [idTime, setIdTime] = useState('')
    
    const { user, setUser} = useContext(AuthContext);

    const {
      lugares,
      setLugar,
      setLugaresNoG
    } = props
    
    useEffect(() => {
      inputRef.current.addEventListener('click', (event) => {
        event.stopPropagation();
        ulRef.current.style.display = 'flex';
      });
      document.addEventListener('click', (event) => {
        ulRef.current.style.display = 'none';
      });
    }, []);

    useEffect(() => {
      if (user) return;
      setValue('')
      setOptions([])
    }, [user]);
    
    const rellenarOpciones = (v) => {
      Client.query.query(v).then(setOptions)
    }

    const onInputChange = (event) => {
      event.preventDefault()
      setValue(event.target.value);
    
      event.target.value.length > 4 ? setIdTime(setTimeout(rellenarOpciones(event.target.value), 500)):setOptions([]);
      clearTimeout(idTime);

    }

    const handleGuardar = (e, lugar) => {
      e.preventDefault() 
      setValue(lugar.name);
      setLugar(lugar)
      
      let lugarAux = lugares.filter((x) => x.coords === lugar.coords)
      
      lugarAux.length ? (
        setLugar(lugarAux[0])
        ):(
          setLugar(lugar),
          setLugaresNoG((old) => {
            let i = []
            old.every((x) => x.coords !== lugar.coords) ? i = [lugar, ...old]:i=[...old] 
            return i
          })
        )
    }
    
    const enterPress = (event) => {
      var code = event.keyCode || event.which;
      if(code === 13) { 
          const fetchBuscarLugar = async () => {
              await Client.query.query(value).then( r => {
              r.length > 0 ? ( 
                handleGuardar(event, r[0])
                ):null;
            })
          }
          value.length > 1 ? fetchBuscarLugar():alert('No Data')
      } 
    }
    
    return (
      <div className="search-bar-dropdown">
        <input
          id="search-bar"
          type="text"
          className="form-control"
          placeholder="Search"
          autoComplete="off"
          onInput={onInputChange}
          ref={inputRef}
          value={value}
          onKeyDownCapture={enterPress}
        />
        <ul 
          id="results" 
          className="list-group" 
          ref={ulRef}
        >
          {options.map((option, index) => {
            return (
              <button
                type="button"
                key={index}
                onClick={(e) => handleGuardar(e, option)}
                className="list-group-item list-group-item-action"
              >
                {option.name} ({toLocalCoords(option.coords)})
              </button>
            );
          })}
        </ul>
      </div>
    );
  };