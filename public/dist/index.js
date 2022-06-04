"use strict";
let toggle = document.querySelector('#dn');
let fundo = document.querySelector('#background');
let campoCadastro = document.querySelector('#cadastro');
toggle.addEventListener('click', toggleTema);
function toggleTema() {
    fundo.classList.toggle('darkMode');
    campoCadastro.classList.toggle('loginDarkMode');
    if (toggle.checked) {
        localStorage.setItem('DarkMode', 'true');
    }
    else {
        localStorage.setItem('DarkMode', 'false');
    }
}
let darkMode = localStorage.getItem('DarkMode');
if (darkMode === 'true') {
    toggle.checked = true;
    toggleTema();
}
