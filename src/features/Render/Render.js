import React from "react";
import { 
  Form
} from "react-bootstrap";

export const Render = (props) => { 
    const {serviciosLugar} = props
    
    return(
    <>
        <h1> Clima </h1>
        <Form>
            <Form.Check 
                type="switch"
                id="custom-switch"
                size='lg'
                isValid={true}
                onChange={() => console.log('hola')}
                value={'h'}
            />
        </Form>
    </>
  )
}