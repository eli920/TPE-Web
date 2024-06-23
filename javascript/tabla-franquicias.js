"use strict"
const BASE_URL = 'https://666c8e3949dbc5d7145e6b07.mockapi.io/api/franquicias';

let form_franquicias = document.querySelector("#form-franquicias");
form_franquicias.addEventListener('submit', agregar);


//Mensaje que mostrará si la acción fue exitosa o si hubo algún error
let mensaje = document.querySelector(".mensaje");

obtener();

//funcion para traer los datos de mi tabla
async function obtener() {
    let tabla = document.querySelector("#cuerpo-tabla");
    tabla.innerHTML = "";

    try {
        let res = await fetch(BASE_URL);
        let json = await res.json();

        for (let franquicia of json) {
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
                </td>
            `
            tabla.appendChild(fila);

            fila.querySelector(".editar").addEventListener('click', () => {
                editar(id);
            });

            fila.querySelector(".borrar").addEventListener('click', () => {
                borrar(id);
            });

        }
    } catch (error) {
        mensaje.innerHTML = `Error: ${error}`;
    }
}


//funcion para agregar/enviar uno o varios datos
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

    form_franquicias.reset();
};


async function editar(id) {

    let data = new FormData(form_franquicias);

    let franquicia = {
        local: data.get('local'),
        direccion: data.get('direccion'),
        telefono: data.get('telefono'),//Si le paso a number, me aparece el cero cuando quiero editar. Como no voy a operar, no hace falta pasarlo.
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

