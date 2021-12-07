function apiFake(){
    const data = 
    [
        {
        "coords": "0,1", 
        "name": "Castellon", 
        "alias": "Cs"
        },
        {
        "coords": "0,2", 
        "name": "Valencia", 
        "alias": "Vl" 
        }

    ]
    return data
}
export const SearchBar = () =>{
    //restriccion de llamadas entre pulsaciones
    //intentar que solo se llame una vez por palabra
    //llamada con un segundo de espera
    //la siguiente pulsacion cancela todas las llamadas en espera
    //solo se envia si pasa mas de 1 sec
    const [estado, setEstado] = useState([])
    const [recomendacion, setRecomendacion] = useState([])
    
    const handleFilter = (event) => {
        setEstado(event.target.value);
        estado.length > 3 ? setRecomendacion(apiFake()):setRecomendacion([])
    };

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(estado);
    };
    
    const clearInput = () => {
        console.log("object");
    };

    return(
        <>
            <Form> 
                <Form.Group controlId="formBasicEmail">
                    <Form.Control 
                        name="mail"
                        type="text" 
                        autoComplete="off"
                        placeholder="Enter email" 
                        onChange={handleFilter}
                        value={estado}
                        />                                 
                </Form.Group>
                <ListGroup>
                    {recomendacion.map(l => <Recomendacion 
                        setEstado={setEstado} setRecomendacion={setRecomendacion} key={l.name} lugar={l.name}
                                            />)}
                </ListGroup>
            
            </Form>
        </>
    )
}