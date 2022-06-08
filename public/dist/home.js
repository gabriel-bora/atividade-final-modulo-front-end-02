"use strict";
let toggleHome = document.querySelector('#dn-2');
let fundoHome = document.querySelector('#background-2');
let campoTabela = document.querySelector('#main-2');
let inputDescricao = document.querySelector('#inputDescricao');
let inputDetalhamento = document.querySelector('#inputDetalhamento');
let spanDescricao = document.querySelector('#spanDescricao');
let spanDetalhamento = document.querySelector('#spanDetalhamento');
let botaoAccordion = document.querySelectorAll('.botaoAccordion');
let bodyAccordion = document.querySelectorAll('.bodyAccordion');
let botaoSair = document.querySelector('#botaoSair');
toggleHome.addEventListener('click', toggleTemaHome);
function toggleTemaHome() {
    fundoHome.classList.toggle('darkMode');
    campoTabela.classList.toggle('homeDarkMode');
    inputDescricao.classList.toggle('inputsDarkMode');
    inputDetalhamento.classList.toggle('inputsDarkMode');
    spanDescricao.classList.toggle('addonDarkMode');
    spanDetalhamento.classList.toggle('addonDarkMode');
    for (const elemento of botaoAccordion) {
        elemento.classList.toggle('accordion-dark-mode');
    }
    ;
    for (const elemento of bodyAccordion) {
        elemento.classList.toggle('accordion-dark-mode');
    }
    ;
    botaoSair.classList.toggle('botaoSairDarkMode');
    if (toggleHome.checked) {
        localStorage.setItem('DarkMode', 'true');
    }
    else {
        localStorage.setItem('DarkMode', 'false');
    }
}
;
let darkModeHome = localStorage.getItem('DarkMode');
if (darkModeHome === 'true') {
    toggleHome.checked = true;
    toggleTemaHome();
}
;
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
