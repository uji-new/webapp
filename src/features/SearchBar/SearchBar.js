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
      console.log(value);
      Client.query.query(value).then(setOptions)
    }


    const onInputChange = (event) => {
      setValue(event.target.value)
    
      setIdTime(setTimeout(rellenarOpciones, 1000));
      clearTimeout(idTime);
  
      //const filtOptions = options.filter((option) => option.name.includes(event.target.value))
      //filtOptions != options ? setOptions(filtOptions):null   
    }
    
    const enterPress = (event) => {
      var code = event.keyCode || event.which;
      if(code === 13) { 
          const fetchBuscarLugar = async () => {
            const l = await Client.query.query(value).then( r => {
              r.length > 0 ? props.setLugarRender(r[0]):null;
            })
          }
          fetchBuscarLugar()
      } 
    }
    console.log(value);
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