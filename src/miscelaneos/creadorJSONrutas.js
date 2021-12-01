//{
//    path: "/",
//    main: () => <h1>home</h1>
//}

function c(l){
    function hola (quien) {console.log("hola "+quien);}
    
    var x = []
    
    l.map(r => {
        x.push({
            path: '/'+r.name,
            main: hola
        })
        
    })

    for(let i of x){
        console.log(i);
    }
    console.log( x[1].main(x[1].path)); 
      
    
}
const l = [{coords: "0,1", name: "castellon", alias: "cs"},
          {coords: "0,2", name: "valencia", alias: "vlc"}]
c(l)