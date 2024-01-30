
//Aca hacemos las constantes de los ID para luego usarlas
//En JS no es recomentable usar '#'
const myForm = document.getElementById('myForm');
const startWith = document.getElementById('startWith');
const btnSearch = document.getElementById('btnSearch');
const myContent = document.getElementById('myContent');
//Esta es la apikey = llave , para poder usar una api 
const apiKey = "10f2b7bf654f96f752dfeb579f4c9ca9"

//Evitamos el evento del formulario o submit
myForm.addEventListener("click",e=>{
    e.preventDefault();
})

//Aca haremos el pintado del div
const draw = heroes =>{
    myContent.innerHTML = "";
    const fragment = document.createDocumentFragment();

    heroes.forEach(hero =>{
        const container = document.createElement('div');
        const title = document.createElement('h2');
        const image = document.createElement('img');

        title.textContent = hero.name;
        image.src = `${hero.thumbnail.path}/portrait_incredible.${hero.thumbnail.extension}`;
        container.appendChild(title);
        container.appendChild(image);
        fragment.appendChild(container);
    })

    myContent.appendChild(fragment);
}

//Cuando le demos click al boton este nos traera los Heroes.
//Aca hacemos las consultas y estas nos la devuelven en una array y luego la pintamos en el draw
btnSearch.addEventListener("click", async()=>{
    const encodeName = encodeURI(startWith.value)
    //ESTA ES LA URL DE LA API , DENTRO DE ELLA HAY CONS: QUE DECLARAMOS ARRIBA
    const marvelURL = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${encodeName}&apikey=${apiKey}`
    const respuesta = await axios.get(marvelURL);
    console.log(respuesta.data.data.results)
    draw(respuesta.data.data.results)

})