"use strict"
//Por que no me lo toma de ésta forma??
// let form=document.querySelector("#form").addEventListener("submit", obtenerDatos);

let form=document.querySelector("#form");
form.addEventListener("submit", obtenerDatos);

//Traemos la etiqueta en la cual vamos a ingresar el resultado de un número random
let captchaRandom=document.querySelector("#captcha");
let random= Math.floor(Math.random()*1000);
captchaRandom.innerHTML= random;

//Evaluamos que el nímero random sea igual al numero ingresado por el usuario en el campo captcha
let captchaIngresado=document.querySelector("#captcha-ingresado").value;


if(captchaIngresado===random){
  document.querySelector("#resultado-captcha").innerHTML= "Correcto"
}else{
  document.querySelector("#resultado-captcha").innerHTML= "No existen coincidencias"
}



function obtenerDatos(e){
    e.preventDefault();
    console.log("entre a la funcion");
    let formData = new FormData(form);
    
    let nombre = formData.get('nombre');
    let telefono = formData.get('telefono');
    let email = formData.get('email');
    let consulta= formData.get('consulta');
    let captchaIngresado= formData.get('numero-captcha')

    

    console.log(nombre, telefono, email, consulta, captchaIngresado);
    
  }