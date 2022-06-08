let toggleHome = document.querySelector('#dn-2') as HTMLInputElement;
let fundoHome = document.querySelector('#background-2') as HTMLBodyElement;
let campoTabela = document.querySelector('#main-2') as HTMLDivElement;
let inputDescricao = document.querySelector('#inputDescricao') as HTMLInputElement;
let inputDetalhamento = document.querySelector('#inputDetalhamento') as HTMLInputElement;
let spanDescricao = document.querySelector('#spanDescricao') as HTMLSpanElement;
let spanDetalhamento = document.querySelector('#spanDetalhamento') as HTMLSpanElement;
let botaoAccordion = document.querySelectorAll('.botaoAccordion') as NodeListOf<HTMLButtonElement>;
let bodyAccordion = document.querySelectorAll('.bodyAccordion') as NodeListOf<HTMLDivElement>;
let botaoSair = document.querySelector('#botaoSair') as HTMLButtonElement;

toggleHome.addEventListener('click', toggleTemaHome);

function toggleTemaHome() :void {
    fundoHome.classList.toggle('darkMode');
    campoTabela.classList.toggle('homeDarkMode');
    inputDescricao.classList.toggle('inputsDarkMode');
    inputDetalhamento.classList.toggle('inputsDarkMode');
    spanDescricao.classList.toggle('addonDarkMode');
    spanDetalhamento.classList.toggle('addonDarkMode');
    for (const elemento of botaoAccordion) {
        elemento.classList.toggle('accordion-dark-mode');
    };
    for (const elemento of bodyAccordion) {
        elemento.classList.toggle('accordion-dark-mode');
    };
    botaoSair.classList.toggle('botaoSairDarkMode');
    if(toggleHome.checked){
        localStorage.setItem('DarkMode', 'true');
    }else{
        localStorage.setItem('DarkMode', 'false');
    }
};

let darkModeHome = localStorage.getItem('DarkMode');

if(darkModeHome === 'true') {
    toggleHome.checked = true;
    toggleTemaHome();
};

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));