// Obtener referencias a los elementos del DOM
const myForm = document.getElementById('myForm');
const startWith = document.getElementById('startWith');
const btnSearch = document.getElementById('btnSearch');
const myContent = document.getElementById('myContent');
const loadingDiv = document.getElementById('loading');
const apiKey = "10f2b7bf654f96f752dfeb579f4c9ca9";

// Agregar evento al formulario para prevenir el comportamiento por defecto
myForm.addEventListener("submit", e => {
    e.preventDefault();
    searchMarvelCharacter();
});

// Función para dibujar los héroes en el DOM
const draw = heroes => {
    myContent.innerHTML = "";

    // Verificar si no hay resultados
    if (heroes.length === 0) {
        const noResultsMessage = document.createElement('h1');
        noResultsMessage.textContent = 'No se encontraron resultados.';
        myContent.appendChild(noResultsMessage);
    } else {
        // Iterar sobre cada héroe y crear un elemento de tarjeta para cada uno
        heroes.forEach(hero => {
            const card = document.createElement('div');
            card.classList.add('card', 'col-md-4', 'mb-3');

            // Crear la etiqueta de imagen con la URL del héroe
            const image = document.createElement('img');
            image.src = `${hero.thumbnail.path}/portrait_incredible.${hero.thumbnail.extension}`;
            image.classList.add('card-img-top', 'w-100', 'h-200', 'mt-3');

            // Crear el cuerpo de la tarjeta
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body', 'd-flex', 'flex-column', 'align-items-center');

            // Crear el título de la tarjeta (nombre del héroe)
            const title = document.createElement('h5');
            title.classList.add('card-title', 'text-truncate');
            title.textContent = hero.name;

            // Agregar el título y la imagen al cuerpo de la tarjeta
            cardBody.appendChild(title);
            card.appendChild(image);
            card.appendChild(cardBody);

            // Agregar la tarjeta al contenedor principal
            myContent.appendChild(card);
        });
    }

    // Ocultar la barra de carga después de renderizar los resultados
    loadingDiv.classList.add('d-none');
}

// Función para realizar la búsqueda de personajes de Marvel
const searchMarvelCharacter = async () => {
    // Mostrar la barra de carga antes de la búsqueda
    loadingDiv.classList.remove('d-none');

    // Codificar el nombre para incluirlo en la URL de la API
    const encodeName = encodeURI(startWith.value)
    
    // Construir la URL de la API con el nombre codificado y la clave API
    const marvelURL = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${encodeName}&apikey=${apiKey}`
    
    // Realizar la solicitud a la API utilizando Axios
    const respuesta = await axios.get(marvelURL);
    
    // Llamar a la función draw para renderizar los resultados
    draw(respuesta.data.data.results);
};
