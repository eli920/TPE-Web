"use strict"
const BASE_URL = 'https://666c8e3949dbc5d7145e6b07.mockapi.io/api/franquicias';

let form_franquicias = document.querySelector("#form-franquicias");
form_franquicias.addEventListener('submit', agregar);


//Mensaje que mostrará si la acción fue exitosa o si hubo algún error
let mensaje = document.querySelector(".mensaje");

//LLamo a la función obtener, para mostrar la tabla cargada sin que el usuario tenga que hacer ningún click adicional
obtener();
console.log(resonse.status)

//Función para traer los datos de mi tabla. Se pasa como parámetro filtro_local, para que se use en caso de que se haya ejecutado la funcion filtrar
async function obtener(filtro_local) {
    try {

        let res = await fetch(BASE_URL);
        let json = await res.json();
        //ternario para aplicar filtro
        let franquicias = filtro_local ? json.filter(franquicia => franquicia.local.toLowerCase().includes(filtro_local)) : json;

        if (filtro_local && franquicias.length === 0) {
            mensaje.innerHTML = "No se ha encontrado el local solicitado";
        } else {
            mensaje.innerHTML = "";
            actualizarTabla(franquicias);
        }

    } catch (error) {
        mensaje.innerHTML = `Error: ${error}`;
    }
}

function actualizarTabla(franquicias) {
    let tabla = document.querySelector("#cuerpo-tabla");
    tabla.innerHTML = "";

    for (let franquicia of franquicias) {
        let local = franquicia.local;
        let direccion = franquicia.direccion;
        let telefono = franquicia.telefono;
        let id = franquicia.id;

        let fila = document.createElement("tr");

        fila.innerHTML = `
                    <td>${local}</td>
                    <td>${direccion}</td>
                    <td>${telefono}</td>
                    <td>
                        <button class="editar">Editar</button>
                        <button class="borrar">Borrar</button>
                    </td>`
        tabla.appendChild(fila);

        fila.querySelector(".editar").addEventListener('click', () => {
            editar(id);
        });

        fila.querySelector(".borrar").addEventListener('click', () => {
            borrar(id);
        });

    }
}


//Funcion para agregar/enviar uno o varios datos--------------------------------------------------------------------------------------------
async function agregar(e) {
    e.preventDefault();

    let data = new FormData(form_franquicias);
    let cantidad = Number(document.querySelector("#cantidad-item").value);

    let franquicia = {
        local: data.get('local'),
        direccion: data.get('direccion'),
        telefono: data.get('telefono'),
    }

    try {
        for (let i = 0; i < cantidad; i++) {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(franquicia)
            });

            if (response.ok) {
                mensaje.innerHTML = 'Creado!';
            }

        }

        obtener();

    } catch (error) {
        mensaje.innerHTML = `Error: ${error}`;
    }
    //Una vez que envié los datos, borro los campos del formulario
    form_franquicias.reset();
};

//Función para editar una fila en la tabla---------------------------------------------------------------------------------------------
async function editar(id) {

    let data = new FormData(form_franquicias);

    let franquicia = {
        local: data.get('local'),
        direccion: data.get('direccion'),
        telefono: data.get('telefono'),//Si se pasa a number, aparece el cero cuando quiero editar. Como no vamos a operar, no hace falta pasarlo.
    }

    try {
        let response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(franquicia),
        });

        if (response.ok) {
            mensaje.innerHTML = 'Modificado!';
        }

        obtener();

    } catch (error) {
        mensaje.innerHTML = `Error: ${error}`;
    }

    form_franquicias.reset();
};
//Función para borrar una fila en la tabla---------------------------------------------------------------------------------------------
async function borrar(id) {
    try {
        let response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            mensaje.innerHTML = 'Eliminado!';
        }

        obtener();

    } catch (error) {
        mensaje.innerHTML = `Error: ${error}`;
    }
};

//Función filtrar-------------------------------------------------------------------------------------------------------------------------
let filtro = document.querySelector("#filtrar");
filtro.addEventListener('click', filtrar);

function filtrar() {
    let filtro_local = document.querySelector("#filtro-local").value.toLowerCase();

    obtener(filtro_local);
}

