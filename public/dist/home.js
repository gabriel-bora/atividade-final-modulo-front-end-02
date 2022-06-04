"use strict";
let toggleHome = document.querySelector('#dn-2');
let fundoHome = document.querySelector('#background-2');
let campoTabela = document.querySelector('#main-2');
let inputDescricao = document.querySelector('#inputDescricao');
let inputDetalhadamento = document.querySelector('#inputDetalhadamento');
let spanDescricao = document.querySelector('#spanDescricao');
let spanDetalhadamento = document.querySelector('#spanDetalhadamento');
let tabelaRecados = document.querySelector('#tabelaRecados');
let linhasTabela = document.querySelectorAll('tr:nth-child(even)');
toggleHome.addEventListener('click', toggleTemaHome);
function toggleTemaHome() {
    fundoHome.classList.toggle('darkMode');
    campoTabela.classList.toggle('homeDarkMode');
    inputDescricao.classList.toggle('inputsDarkMode');
    inputDetalhadamento.classList.toggle('inputsDarkMode');
    spanDescricao.classList.toggle('addonDarkMode');
    spanDetalhadamento.classList.toggle('addonDarkMode');
    tabelaRecados.classList.toggle('recadosDarkMode');
    for (const elemento of linhasTabela) {
        elemento.classList.toggle('linhasDarkMode');
    }
    if (toggleHome.checked) {
        localStorage.setItem('DarkMode', 'true');
    }
    else {
        localStorage.setItem('DarkMode', 'false');
    }
}
let darkModeHome = localStorage.getItem('DarkMode');
if (darkModeHome === 'true') {
    toggleHome.checked = true;
    toggleTemaHome();
}
