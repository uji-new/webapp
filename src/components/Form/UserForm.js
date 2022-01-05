import React, { useState } from 'react';
import { 
    Tab, 
    Tabs, 
    Container,
    Button,
    ButtonGroup,
    Col, Form, Row
 } from "react-bootstrap";
import PropTypes from 'prop-types';
import Client from 'utils/Client'
import { ModalError } from 'features'

const ERROR = {
    LOGIN: 'La cuenta o contraseña introducidas son incorrectas',
    REGISTER: 'La cuenta introducida ya existe',
}


export function UserForm({setUser, setLugaresNoG, setLugar}) {
    const [mail, setMail] = useState();
    const [password, setPassword] = useState();

    const [show, setShow] = useState(false);
    const [text, setText] = useState('Error')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmitIn = async e => {
        e.preventDefault();
        await Client.session.login( mail, password )
            .then(() => setUser(mail, setLugaresNoG([]), setLugar({})))
                .catch(() => handleShow(), setText(ERROR.LOGIN));
        
      }
    //Error entra en el then y en el catch a la vez cuando hay una escepcion
    //const handleSubmitUp = async e => {
    //    e.preventDefault();
    //    await Client.account.register( mail, password )
    //        .then(setUser(mail, setLugaresNoG([]), setLugar({})))
    //            .catch(() => handleShow(), setText(ERROR.REGISTER));
    //}
    const handleSubmitUp = async e => {
        e.preventDefault();
        await Client.account.register( mail, password )
            .then(() => setUser(mail, setLugaresNoG([]), setLugar({})))
                .catch(() => handleShow(), setText(ERROR.LOGIN))
    }

    return (    
        <>
                <ModalError show={show} onHide={handleClose} text={text}/>
                <Form> 
                    <Form.Group className="form-group" controlId="formBasicEmail">
                        <Form.Label>Mail</Form.Label>
                        <Form.Control 
                            name="mail"
                            type="mail" 
                            autoComplete="off"
                            placeholder="mail@example.org" 
                            onChange={event => setMail(event.target.value)}
                            />            
                    </Form.Group>

                    <Form.Group className="form-group" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            name="password"                                    
                            type="password" 
                            placeholder="password" 
                            onChange={event => setPassword(event.target.value)}
                            />
                    </Form.Group>
                    <ButtonGroup aria-label="Basic example" className="form-buttons">
                    <Button sm={1} variant="primary" onClick={handleSubmitIn}>
                        Iniciar sesion
                    </Button>
                    <Button sm={1} variant="primary" onClick={handleSubmitUp}>
                        Crear cuenta
                    </Button>
                    </ButtonGroup>
                </Form>
        </>
         
    )
}

UserForm.prototype ={ 
    setUser: PropTypes.func.isRequired
}