"use strict";
let toggleHome = document.querySelector('#dn-2');
let fundoHome = document.querySelector('#background-2');
let campoTabela = document.querySelector('#main-2');
let inputDescricao = document.querySelector('#inputDescricao');
let inputDetalhamento = document.querySelector('#inputDetalhamento');
let spanDescricao = document.querySelector('#spanDescricao');
let spanDetalhamento = document.querySelector('#spanDetalhamento');
let tabelaRecados = document.querySelector('#tabelaRecados');
let linhasTabela = document.querySelectorAll('tr:nth-child(even)');
toggleHome.addEventListener('click', toggleTemaHome);
function toggleTemaHome() {
    fundoHome.classList.toggle('darkMode');
    campoTabela.classList.toggle('homeDarkMode');
    inputDescricao.classList.toggle('inputsDarkMode');
    inputDetalhamento.classList.toggle('inputsDarkMode');
    spanDescricao.classList.toggle('addonDarkMode');
    spanDetalhamento.classList.toggle('addonDarkMode');
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
