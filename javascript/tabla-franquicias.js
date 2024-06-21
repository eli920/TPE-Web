"use strict"
const BASE_URL = 'https://666c8e3949dbc5d7145e6b07.mockapi.io/api/franquicias';

let form = document.querySelector("#form-franquicias");
form.addEventListener('submit', agregar);

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
            fila.classList.add("fila");

            fila.innerHTML = `
                <td class="celda">${local}</td>
                <td class="celda">${direccion}</td>
                <td class="celda">${telefono}</td>
                <td>
                    <button class="editar" data-id="${id}">Editar</button>
                    <button class="borrar" >Borrar</button>
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


//funcion para agregar/enviar datos
async function agregar(e) {
    e.preventDefault();

    let data = new FormData(form);

    let franquicia = {
        local: data.get('local'),
        direccion: data.get('direccion'),
        telefono: Number(data.get('telefono')),
    }
    try {
        let response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(franquicia),
        });

        if (response.ok) {
            mensaje.innerHTML = 'Creado!';
        }


        obtener();


    } catch (error) {
        mensaje.innerHTML = `Error: ${error}`;
    }

    form.reset();
};


async function editar(id) {

    let data = new FormData(form);

    let franquicia = {
        local: data.get('local'),
        direccion: data.get('direccion'),
        telefono: Number(data.get('telefono')),
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

    form.reset();
};

async function borrar(id) {
    try {
        let response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELET'
        });

        if (response.ok) {
            mensaje.innerHTML = 'Eliminado!';
        }

        obtener();

    } catch (error) {
        mensaje.innerHTML = `Error: ${error}`;
    }
};

