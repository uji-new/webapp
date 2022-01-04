import React from "react";
import { 
    Modal, 
    Button
} from "react-bootstrap";

export const ModalError = (props) => {
    const {show, text, onHide} = props

  return(
    <>
        <Modal show={show} >
            <Modal.Header closeButton>
                <Modal.Title>Error Cuenta</Modal.Title>
            </Modal.Header>
                <Modal.Body>{text}</Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={() => onHide()}>
                Cerrar
            </Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}
