"use strict"

let random;
function generarCaptcha(){
  random= Math.floor(Math.random()*10000);
  let captchaRandom=document.querySelector("#captcha");
  captchaRandom.innerHTML= random;
}
generarCaptcha();

//Obtenemos la información del formulario y evaluamos que el número random sea igual al numero ingresado por el 
//usuario en el campo captcha
let form=document.querySelector("#form");
form.addEventListener("submit", obtenerDatos);

function obtenerDatos(e){
    e.preventDefault();
    
    let formData = new FormData(form);
    
    let nombre = formData.get('nombre');
    let telefono = formData.get('telefono');
    let email = formData.get('email');
    let consulta= formData.get('consulta');
    let captchaIngresado= formData.get('captcha-ingresado');
   
    if(captchaIngresado==random){
      document.querySelector("#resultado-captcha").innerHTML= "Correcto";
      console.log(nombre, telefono, email, consulta, captchaIngresado);
    }else{
      document.querySelector("#resultado-captcha").innerHTML= "No existen coincidencias";
      generarCaptcha();
    }
    
  }
