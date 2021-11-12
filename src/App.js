import Barrasuperior from './components/Navbar';
import SideBar from './components/Sidebar';

export default function App(){
    console.log("App")
    console.log(document.cookie.replace(';', '\n'))
    return(
        <>
            <Barrasuperior />
            <SideBar />
        </>
    )
}




