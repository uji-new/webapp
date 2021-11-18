import Barrasuperior from './components/Navbar';
import SideBar from './components/Sidebar';
import {iniciarSesionInvitado} from './services/sesiones';


export default function App(){
    console.log("App")
    console.log(document.cookie.replace(';', '\n'))
    window.onload = function(){
        iniciarSesionInvitado()
    }
    return(
        <>
            <Barrasuperior />
            <SideBar />
        </>
    )
}




