"use strict"

// let form = document.querySelector("#form-franquicias"); 
// form.addEventListener('submit', agregar);

// let local=document.querySelector("#local");
// let direccion=document.querySelector("#direccion");
// let telefono=document.querySelector("#telefono");

const BASE_URL = 'https://666c8e3949dbc5d7145e6b07.mockapi.io/api/franquicias';

let form = document.querySelector("#form-franquicias"); 
form.addEventListener('submit', agregar);

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
                    <button class="borrar" data-id="${id}">Borrar</button>
                </td>
            `;

            tabla.appendChild(fila);
        }

        // Asociar eventos a los botones después de que se carguen
        document.querySelectorAll(".editar").forEach(button => {
            button.addEventListener('click', editar);
        });

        document.querySelectorAll(".borrar").forEach(button => {
            button.addEventListener('click', borrar);
        });

    } catch (error) {
        console.log(error);
    }
}

// Función para agregar/enviar datos
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

        obtener(); // Actualizar la tabla

    } catch (e) {
        console.log(e);
    }

    form.reset();
}

// Función para editar un elemento
async function editar(e) {
    let id = e.target.dataset.id;
    let nuevo_local = document.querySelector("#local").value;
    let nueva_direccion = document.querySelector("#direccion").value;
    let nuevo_telefono = document.querySelector("#telefono").value;

    if (nuevo_local && nueva_direccion && nuevo_telefono) {
        try {
            await fetch(`${BASE_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ local: newName, direccion: newAddress, telefono: Number(newPhone) })
            });
            obtener(); // Actualizar la tabla
        } catch (error) {
            console.log('Error al editar elemento:', error);
        }
    }
}

// Función para borrar un elemento
async function borrar(e) {
    let id = e.target.dataset.id;
    if (confirm("¿Está seguro de que desea eliminar este elemento?")) {
        try {
            await fetch(`${BASE_URL}/${id}`, {
                method: 'DELETE'
            });
            obtener(); // Actualizar la tabla
        } catch (error) {
            console.log('Error al borrar elemento:', error);
        }
    }
}

// Obtener datos iniciales
obtener();