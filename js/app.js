// Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
// Contenedor para los resultados
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 10;


// Generar un objeto con la busqueda.
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    marca: '',
    color: '',
}

/* El DOMContentLoadedevento se activa cuando el documento HTML se ha analizado
 por completo y todos los scripts diferidos ( <script defer 
src="…">y <script type="module">) se han descargado y ejecutado.
 No espera a que terminen de cargarse otras cosas,
 como imágenes, subtramas y secuencias de comandos asíncronas.*/
// Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); // muestra los autos al cargar

    llenarSelect(); // Llenar la opción de años
});

// EventListener para los select de busqueda.
/*
Cada vez que se realice un cambio, de llamará una función que realizará
automaticamente el filtrado de los resultados.
Esto será instantaneo, no habrá ningún botón para aquella opción.


 */
marca.addEventListener('change', (e) => {    // 'change' Se ejecuta cuando cambia el select
    // console.log(e.target.value);
    datosBusqueda.marca = e.target.value;
    
    filtrarAuto();
});
year.addEventListener('change', (e) => {    
    datosBusqueda.year = parseInt(e.target.value);
    filtrarAuto();
});

minimo.addEventListener('change', (e) => {    
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
});
maximo.addEventListener('change', (e) => {    
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
});
puertas.addEventListener('change', (e) => {    
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
});
transmision.addEventListener('change', (e) => {    
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});
color.addEventListener('change', (e) => {    
    datosBusqueda.color = e.target.value;
    filtrarAuto();
    console.log(datosBusqueda);
});


// Funciones
const mostrarAutos = (autos) => {
    
    limpiarHTML(); // Limpia el HTML previo, antes de iterar.

    autos.forEach(auto => {
        const { marca, modelo, year, puertas, precio, transmision, color } = auto
        const autoHTML = document.createElement('p'); // se crea un parrafo para cada automovil y se asigna a una variable
        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color} 
        `

        // Insertar en el HTML
        resultado.appendChild(autoHTML)
    })
}

// Limpiar el HTML
const limpiarHTML = () => {
    while (resultado.firstChild) {  // mientras haya algo en el HTML lo limpia.
        resultado.removeChild(resultado.firstChild)        
    }
    
}

// // Generar los años del select
const llenarSelect = () => {
    // console.log('Llenando el select ...');
    for (let i = max; i >= min; i--) {
        // console.log(i);
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }
}

// Filtrar en base a la búsqueda
const filtrarAuto = () => {
    // Se utiliza una función de alto nivel --> una función que toma como parámetrp otra función.
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTrasnmision).filter(filtrarColor)
    mostrarAutos(resultado);
    // console.log(resultado);

    if (resultado.length) {
        mostrarAutos(resultado);        
    } else {
        sinResultado();
    }
}

const sinResultado = () => {
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay Resultados, Intenta con otros términos de búsqueda';
    resultado.appendChild(noResultado);
}

// Fltrar solo la marca
const filtrarMarca = (auto) => {
    const { marca } = datosBusqueda
    if (marca) {
        return auto.marca === marca;
    }
    return auto;
} 
// Filtrar por año
const filtrarYear = (auto) => {
    const { year } = datosBusqueda
    if (year) {
        return auto.year === year;
    }
    return auto;
} 
// Filtrar por precio Minimo
const filtrarMinimo = (auto) => {
    const { minimo } = datosBusqueda
    if (minimo) {
        return auto.precio >= minimo;
    }
    return auto;
} 
// Filtrar por precio maximo
const filtrarMaximo = (auto) => {
    const { maximo } = datosBusqueda
    if (maximo) {
        return auto.precio <= maximo;
    }
    return auto;
} 

const filtrarPuertas = (auto) => {
    const { puertas } = datosBusqueda
    if (puertas) {
        return auto.puertas === puertas;
    }
    return auto;
} 

const filtrarTrasnmision = (auto) => {
    const { transmision } = datosBusqueda
    if (transmision) {
        return auto.transmision === transmision;
    }
    return auto;
} 

const filtrarColor = (auto) => {
    const { color } = datosBusqueda
    if (color) {
        return auto.color === color;
    }
    return auto;
} 



