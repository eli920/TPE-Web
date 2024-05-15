"use strict"

document.querySelector(".btn_menu").addEventListener("click", mostrarMenu);

function mostrarMenu() {
    document.querySelector(".navbar").classList.toggle("show");
}