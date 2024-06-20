"use strict"
const BASE_URL = 'https://666c8e3949dbc5d7145e6b07.mockapi.io/api/franquicias';

// asigno event listener a los botones
let form = document.querySelector("#form-franquicias"); 
form.addEventListener('submit', agregar);
document.querySelector('#form-franquicias').addEventListener('submit', agregarTres);
document.querySelector('#editar').addEventListener('click', editar); 
document.querySelector('#borrar').addEventListener('click', borrar); 

// ni bien carga el sitio, obtenemos todo
obtener();

//funcion para traer los datos de mi tabla
let id=0;///reveeer
async function obtener(){
    let tabla=document.querySelector("#cuerpo-tabla");
    tabla.innerHTML="";
    try {
        let res= await fetch(BASE_URL);
        let json= await res.json();
        //
        console.log(json);

        for(let franquicia of json ){
            let local= franquicia.local;
            let direccion= franquicia.direccion;
            let telefono= franquicia.telefono;
            id=franquicia.id;
            
            tabla.innerHTML+=`<tr>
                                <td>${local}</td>
                                <td>${direccion}</td>
                                <td>${telefono}</td>
                            </tr>`
           
        }
    } catch (error) {
        console.log(error);
    }
}


//funcion para agregar/enviar datos
async function agregar(e) {
    e.preventDefault();

    // obtengo los datos del form
    let data = new FormData(form);

    // creo el objeto JSON
    let franquicia = {
        local: data.get('local'),
        direccion: data.get('direccion'),
        telefono: Number(data.get('telefono')),
    }
    try {
        // envio la nueva franquicia al servicio REST
        let response = await fetch(BASE_URL , {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(franquicia),
        });

        // vuelvo a traer todas las franquicias
        obtener();
    } catch (e) {
        console.log(e);
    }
};

//funcion para agregar/enviar datos
async function agregarTres(agregar) {
    // e.preventDefault();

    // // obtengo los datos del form
    // let data = new FormData(formTres);

    // // creo el objeto JSON
    //     let franquicia = {
    //         local: data.get('local'),
    //         direccion: data.get('direccion'),
    //         telefono: Number(data.get('telefono')),
    // }
    
    try {
        // envio la nueva franquicia al servicio REST
        for(let i=0; i<3;i++){
            agregar();
            // let response = await fetch(BASE_URL , 
            // {
            //     method: 'POST',
            //     headers: {
            //         "Content-Type": 'application/json'
            //     },
            //     body: JSON.stringify(franquicia),
            // });
        }
        // vuelvo a traer todas las franquicias
        obtener();
    } catch (e) {
        console.log(e);
    }
};

async function editar () {
    // obtengo los datos del form
    let data = new FormData(form);

    // creo el objeto JSON
    let franquicia = {
        local: data.get('local'),
        direccion: data.get('direccion'),
        telefono: Number(data.get('telefono')),
    }
    try {
        // envio la nueva franquicia al servicio REST
        let response = await fetch(`${BASE_URL}/${id}` , {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(franquicia),
        });

        // if(response===200){

        // }

        // vuelvo a traer todas las franquicias
        obtener();
    } catch (e) {
        mostrarError(e);
    }
};

async function borrar () {
    try {
        // envio la nueva franquicia al servicio REST
        let response = await fetch(`${BASE_URL}/${id}` , {
            method: 'DELETE'
        });

        // if(response===200){

        // }

        // vuelvo a traer todas las franquicias
        obtener();
    } catch (e) {
        mostrarError(e);
    }
};

