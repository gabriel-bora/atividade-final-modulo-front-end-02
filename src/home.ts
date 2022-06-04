let toggleHome = document.querySelector('#dn-2') as HTMLInputElement;
let fundoHome = document.querySelector('#background-2') as HTMLBodyElement;
let campoTabela = document.querySelector('#main-2') as HTMLDivElement;
let inputDescricao = document.querySelector('#inputDescricao') as HTMLInputElement;
let inputDetalhadamento = document.querySelector('#inputDetalhadamento') as HTMLInputElement;
let spanDescricao = document.querySelector('#spanDescricao') as HTMLSpanElement;
let spanDetalhadamento = document.querySelector('#spanDetalhadamento') as HTMLSpanElement;
let tabelaRecados = document.querySelector('#tabelaRecados') as HTMLTableElement;
let linhasTabela = document.querySelectorAll('tr:nth-child(even)') as NodeListOf<HTMLTableRowElement>;

toggleHome.addEventListener('click', toggleTemaHome);

function toggleTemaHome() :void {
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
    if(toggleHome.checked){
        localStorage.setItem('DarkMode', 'true');
    }else{
        localStorage.setItem('DarkMode', 'false');
    }
}

let darkModeHome = localStorage.getItem('DarkMode');

if(darkModeHome === 'true') {
    toggleHome.checked = true;
    toggleTemaHome();
}