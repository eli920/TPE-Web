"use strict"

let captcha;
function generarCaptcha(){
  let caracter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  captcha = '';
  let longitudCaptcha= 5;

      for (let i = 0; i < longitudCaptcha; i++) {
          captcha += caracter.charAt(Math.floor(Math.random() * caracter.length));
      }

  let captchaRandom=document.querySelector("#captcha");
  captchaRandom.innerHTML= captcha; 
  
}
 
generarCaptcha();

//Obtenemos la información del formulario y evaluamos que el captcha generado sea igual al texto ingresado por
// el usuario en el campo captcha
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
   
    if(captchaIngresado===captcha){
      document.querySelector("#resultado-captcha").innerHTML= "Correcto";
      console.log(nombre, telefono, email, consulta, captchaIngresado);
      form.reset();
      generarCaptcha();
      
    }else{
      document.querySelector("#resultado-captcha").innerHTML= "No existen coincidencias";
      generarCaptcha();
    }
    
  }

