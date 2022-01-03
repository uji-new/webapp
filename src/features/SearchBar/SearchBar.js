import React, { useState, useRef, useEffect } from 'react'
import { ListGroup,Form} from "react-bootstrap";
import './SearchBar.css'
import Client from 'utils/Client';

export const SearchBar = (props) => {
    const ulRef = useRef(); //valor fijo para la lista
    const inputRef = useRef(); //valor fijo para el campo input
    const [value, setValue] = useState('') //valor del campo input
    const [options, setOptions] = useState([]) //recomendaciones de la api
    const [idTime, setIdTime] = useState('')

    useEffect(() => {
      inputRef.current.addEventListener('click', (event) => {
        event.stopPropagation();
        ulRef.current.style.display = 'flex';
      });
      document.addEventListener('click', (event) => {
        ulRef.current.style.display = 'none';
      });
    }, []);
    
    const rellenarOpciones = async => {
      Client.query.query(value).then(setOptions)
    }


    const onInputChange = (event) => {
      setValue(event.target.value)
    
      value.length > 0 ? setIdTime(setTimeout(rellenarOpciones, 200)):null;
      clearTimeout(idTime);

    }
    
    const enterPress = (event) => {
      var code = event.keyCode || event.which;
      if(code === 13) { 
          const fetchBuscarLugar = async () => {
              await Client.query.query(value).then( r => {
              r.length > 0 ? ( 
                props.setLugar(r[0]),
                props.setLugaresNoG((old) => [r[0], ...old])
                ):null;
            })
          }
          value.length > 0 ? fetchBuscarLugar():alert('No Data')
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
          onChange={onInputChange}
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
                onClick={(e) => {
                  setValue(option.name);
                  console.log(option)
                  props.setLugar(option)
                  props.setLugaresNoG((old) => [option, ...old])
                }}
                className="list-group-item list-group-item-action"
              >
                {option.name}
              </button>
            );
          })}
        </ul>
      </div>
    );
  };