"use strict"

document.querySelector(".btn-menu").addEventListener("click", mostrarMenu);

function mostrarMenu() {
    document.querySelector(".navbar").classList.toggle("show");
}