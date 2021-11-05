import Nav from './components/Navbar';
import SideBar from './components/Sidebar';
import Body from './components/Body';
import LoginPage from './components/LoginPage';

export default function App(){
    console.log("App")
    console.log(document.cookie.replace(';', '\n'))
    var r = <LoginPage />
    if (false){
        console.log("hola")
        r = <Nav />
    }
    return(
        r
    )
}




