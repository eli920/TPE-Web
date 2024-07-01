"use strict"

document.querySelector("#cambiar-fondo").addEventListener("click", cambiarFondo);

function cambiarFondo(){
    let oscuro=document.querySelector("body").classList.toggle("oscuro");
    
    if(oscuro){
        document.querySelector(".img-ubicacion").src="./imagenes/iconoUbicacionBlanco.png";
        document.querySelector(".img-telefono").src="./imagenes/iconoTelefonoBlanco.png";
        document.querySelector(".img-reloj").src="./imagenes/iconoRelojBlanco.png";
    }else{
        document.querySelector(".img-ubicacion").src="./imagenes/iconoUbicacion.png";
        document.querySelector(".img-telefono").src="./imagenes/iconoTelefono.png";
        document.querySelector(".img-reloj").src="./imagenes/iconoReloj.png";
    } 
}
