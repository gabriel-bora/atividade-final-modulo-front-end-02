"use strict";
// ------------------------- LÓGICA PARA VERIFICAÇÃO DE LOGIN ----------------------------
let loginHome = window.sessionStorage.getItem('login') || '';
if (loginHome !== 'true') {
    let toastLoginRecados = document.querySelector('#toastLoginRecados');
    const toast = new bootstrap.Toast(toastLoginRecados);
    toast.show();
    let toastLoginRecadosClose = document.querySelector('#toastLoginRecadosClose');
    toastLoginRecadosClose.addEventListener('click', () => {
        window.location.href = './index.html';
    });
}
;
;
;
let inputDescricao = document.querySelector('#inputDescricao');
let inputDetalhamento = document.querySelector('#inputDetalhamento');
let spanDescricao = document.querySelector('#spanDescricao');
let spanDetalhamento = document.querySelector('#spanDetalhamento');
let botaoSair = document.querySelector('#botaoSair');
// FUNÇÕES
function salvarNoStorageHome(listaUsuarios) {
    window.localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
}
;
function pegarNoStorageHome() {
    return JSON.parse(window.localStorage.getItem('usuarios') || '[]');
}
;
// ------------------------------- LÓGICA DOS RECADOS -------------------------------
// DECLARAÇÃO DE VARIÁVEIS
let usuario = window.sessionStorage.getItem('usuario') || '';
let listaUsuariosHome = pegarNoStorageHome();
let indiceUsuario = listaUsuariosHome.findIndex((elemento) => elemento.username === usuario);
let listaRecados = listaUsuariosHome[indiceUsuario].recados;
let formRecados = document.querySelector('#formRecados');
let accordionRecados = document.querySelector('#accordionExample');
// DECLARAÇÃO DE EVENTOS
carregarConteudo(listaRecados);
formRecados.addEventListener('submit', criarRecado);
botaoSair.addEventListener('click', logOut);
// DECLARAÇÃO DE FUNÇÕES
function logOut() {
    let toastLogOut = document.querySelector('#toastLogOut');
    const toast = new bootstrap.Toast(toastLogOut);
    toast.show();
    let toastLogOutSim = document.querySelector('#toastLogOutSim');
    toastLogOutSim.addEventListener('click', () => {
        window.sessionStorage.removeItem('login');
        window.sessionStorage.removeItem('usuario');
        window.location.href = './index.html';
    });
}
;
function criarRecado(e) {
    e.preventDefault();
    let infoDescricao = inputDescricao.value;
    let infoDetalhamento = inputDetalhamento.value;
    let novoRecado = {
        indice: '',
        descricao: infoDescricao,
        detalhamento: infoDetalhamento
    };
    listaRecados.push(novoRecado);
    salvarNoStorageHome(listaUsuariosHome);
    window.location.reload();
}
;
function carregarConteudo(listaRecados) {
    let nomeUsuario = listaUsuariosHome[indiceUsuario].nome;
    let spanNome = document.querySelector('#nome');
    spanNome.innerHTML = nomeUsuario;
    inputDescricao.focus();
    if (listaRecados.length > 0) {
        for (const indice in listaRecados) {
            listaRecados[indice].indice = indice;
            salvarNoStorageHome(listaUsuariosHome);
            let divAccordion = document.createElement('div');
            accordionRecados.appendChild(divAccordion);
            divAccordion.innerHTML = `
                                        <h2 class="accordion-header" id="heading${indice}">
                                        <h2 class="accordion-header" id="panelsStayOpen-heading${indice}">
                                            <button class="accordion-button collapsed botaoAccordion" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse${indice}" aria-expanded="false" aria-controls="panelsStayOpen-collapse${indice}">
                                                Recado #${Number(indice) + 1}: ${listaRecados[indice].descricao}
                                            </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapse${indice}" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-heading${indice}">
                                            <div class="accordion-body bodyAccordion">
                                                <section class="container-fluid m-0 p-0">
                                                    <div class="row p-0">
                                                        <div class="col-12 col-md-3 text-break border-end d-flex align-items-center">Descrição: ${listaRecados[indice].descricao}</div>
                                                        <div class="col-12 col-md-8 text-break border-end d-flex align-items-center">Detalhamento: ${listaRecados[indice].detalhamento}</div>
                                                        <div class="col-12 col-md-1 border-end d-flex justify-content-center align-items-center">
                                                            <button class="btn btn-success btn-sm" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                                                    data-bs-custom-class="custom-tooltip" title="Editar recado" onclick="editarRecado(${indice})">
                                                                <i class="fa-solid fa-pen-to-square"></i>
                                                            </button>
                                                            <button class="btn btn-warning btn-sm ms-1" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                                                    data-bs-custom-class="custom-tooltip" title="Apagar recado" onclick="apagarRecado(${indice})">
                                                                <i class="fa-solid fa-trash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                     `;
        }
    }
}
;
function apagarRecado(indice) {
    let toastApagarRecado = document.querySelector('#toastApagarRecado');
    const toast = new bootstrap.Toast(toastApagarRecado);
    toast.show();
    let toastApagarRecadoSim = document.querySelector('#toastApagarRecadoSim');
    toastApagarRecadoSim.addEventListener('click', () => {
        listaRecados.splice(Number(indice), 1);
        salvarNoStorageHome(listaUsuariosHome);
        window.location.reload();
    });
}
;
function editarRecado(indice) {
    inputDescricao.value = listaRecados[Number(indice)].descricao;
    inputDetalhamento.value = listaRecados[Number(indice)].detalhamento;
    let botaoSalvar = document.querySelector('#salvar');
    botaoSalvar.innerText = 'ATUALIZAR';
    formRecados.removeEventListener('submit', criarRecado);
    let recadoEditado = listaRecados[Number(indice)];
    formRecados.addEventListener('submit', function (e) {
        e.preventDefault();
        recadoEditado.descricao = inputDescricao.value;
        recadoEditado.detalhamento = inputDetalhamento.value;
        listaRecados.splice(Number(indice), 1, recadoEditado);
        salvarNoStorageHome(listaUsuariosHome);
        window.location.reload();
    });
}
;
// DECLARAÇÃO DOS TOOLTIPS
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
// ------------------------------- LÓGICA PARA TEMA ESCURO -------------------------------
// DECLARAÇÃO DE VARIÁVEIS
let toggleHome = document.querySelector('#dn-2');
let fundoHome = document.querySelector('#background-2');
let campoTabela = document.querySelector('#main-2');
let botaoAccordion = document.querySelectorAll('.botaoAccordion');
let bodyAccordion = document.querySelectorAll('.bodyAccordion');
// DECLARAÇÃO DE EVENTOS
toggleHome.addEventListener('click', toggleTemaHome);
// DECLARAÇÃO DE FUNÇÕES
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
// VERIFICAÇÃO SALVA
let darkModeHome = localStorage.getItem('DarkMode');
if (darkModeHome === 'true') {
    toggleHome.checked = true;
    toggleTemaHome();
}
