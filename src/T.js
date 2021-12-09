import React from "react";

const BotonesServicios = ({children}) => {
  return (
    {children}
  )
}

export const Usuario = () => {
  return(
    <>
     "Usuario"
    </>
  )
}

export const Cuenta = () => {
  return(
    <>
      "Cuenta"
    </>
  )
}
BotonesServicios.Usuario = Usuario
BotonesServicios.Cuenta = Cuenta
export default BotonesServicios;