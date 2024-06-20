"use strict"

document.querySelector("#cambiar-fondo").addEventListener("click", cambiarFondo);

function cambiarFondo(){
    document.querySelector("#fondo").classList.toggle("oscuro");
    
}