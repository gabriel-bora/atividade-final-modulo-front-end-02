// ------------------------- LÓGICA PARA VERIFICAÇÃO DE LOGIN ----------------------------
let loginHome :string = window.sessionStorage.getItem('login') || '';

if(loginHome !== 'true'){
    alert('Você precisa estar logado para acessar essa página')
    window.location.href = './index.html';
};

// --------------------------- DECLARAÇÃO DE DADOS GLOBAIS --------------------------------
// VARIÁVEIS
interface Recados {
    indice :string;
    descricao :string;
    detalhamento :string
};
interface Usuario {
    username :string;
    password :string;
    nome :string;
    recados :Recados[]
};
let inputDescricao = document.querySelector('#inputDescricao') as HTMLInputElement;
let inputDetalhamento = document.querySelector('#inputDetalhamento') as HTMLInputElement;
let spanDescricao = document.querySelector('#spanDescricao') as HTMLSpanElement;
let spanDetalhamento = document.querySelector('#spanDetalhamento') as HTMLSpanElement;
let botaoSair = document.querySelector('#botaoSair') as HTMLButtonElement;

// FUNÇÕES
function salvarNoStorageHome(listaUsuarios: Usuario[]) {
    window.localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
};
function pegarNoStorageHome() :Usuario[] {
    return JSON.parse(window.localStorage.getItem('usuarios') || '[]');
};

// ------------------------------- LÓGICA DOS RECADOS -------------------------------
// DECLARAÇÃO DE VARIÁVEIS
let usuario :string = window.sessionStorage.getItem('usuario') || '';
let listaUsuariosHome = pegarNoStorageHome();
let indiceUsuario = listaUsuariosHome.findIndex((elemento) => elemento.username === usuario);
let listaRecados :Recados[] = listaUsuariosHome[indiceUsuario].recados;
let formRecados = document.querySelector('#formRecados') as HTMLFormElement;
let accordionRecados = document.querySelector('#accordionExample') as HTMLDivElement;

// DECLARAÇÃO DE EVENTOS
carregarConteudo(listaRecados);
formRecados.addEventListener('submit', criarRecado);
botaoSair.addEventListener('click', logOut);

// DECLARAÇÃO DE FUNÇÕES
function logOut() :void {
    let confirmaSair = window.confirm('Confirma a saída do sistema?');
        if(confirmaSair){
            window.sessionStorage.removeItem('login');
            window.sessionStorage.removeItem('usuario');
            window.location.href = './index.html';
            return;
        }else {
            return;
        }
};

function criarRecado(e: any) :void {
    e.preventDefault();

    let infoDescricao = inputDescricao.value;
    let infoDetalhamento = inputDetalhamento.value;
    let novoRecado :Recados = {
        indice:'',
        descricao:infoDescricao,
        detalhamento:infoDetalhamento
    };

    listaRecados.push(novoRecado);

    salvarNoStorageHome(listaUsuariosHome);

    window.location.reload();
};

function carregarConteudo(listaRecados :Recados[]) :void {
    let nomeUsuario :string = listaUsuariosHome[indiceUsuario].nome;
    let spanNome = document.querySelector('#nome') as HTMLSpanElement;
    
    spanNome.innerHTML = nomeUsuario;

    inputDescricao.focus();
    
    if(listaRecados.length > 0) {    
        for (const indice in listaRecados) {
            listaRecados[indice].indice = indice;
            salvarNoStorageHome(listaUsuariosHome);
    
            let divAccordion :HTMLDivElement = document.createElement('div');
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
                                     `
        }
    }
};

// DECLARAÇÃO DOS TOOLTIPS
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

function apagarRecado(indice :string) :void {
    let confirmaApagar = window.confirm('Quer apagar o recado?');
        if(confirmaApagar){
            listaRecados.splice(Number(indice), 1);
            salvarNoStorageHome(listaUsuariosHome);
            window.location.reload();
            return;
        }else{
            return;
        }
};

function editarRecado(indice :string){
    inputDescricao.value = listaRecados[Number(indice)].descricao;
    inputDetalhamento.value = listaRecados[Number(indice)].detalhamento;
    let botaoSalvar = document.querySelector('#salvar') as HTMLButtonElement;
    botaoSalvar.innerText = 'ATUALIZAR';
    formRecados.removeEventListener('submit', criarRecado);
    let recadoEditado = listaRecados[Number(indice)];
    formRecados.addEventListener('submit', function(e :any) :void {
        e.preventDefault();
        recadoEditado.descricao = inputDescricao.value;
        recadoEditado.detalhamento = inputDetalhamento.value;
        listaRecados.splice(Number(indice), 1, recadoEditado);
        salvarNoStorageHome(listaUsuariosHome);
        window.location.reload();
    })
};

// ------------------------------- LÓGICA PARA TEMA ESCURO -------------------------------
// DECLARAÇÃO DE VARIÁVEIS
let toggleHome = document.querySelector('#dn-2') as HTMLInputElement;
let fundoHome = document.querySelector('#background-2') as HTMLBodyElement;
let campoTabela = document.querySelector('#main-2') as HTMLDivElement;
let botaoAccordion = document.querySelectorAll('.botaoAccordion') as NodeListOf<HTMLButtonElement>;
let bodyAccordion = document.querySelectorAll('.bodyAccordion') as NodeListOf<HTMLDivElement>;

// DECLARAÇÃO DE EVENTOS
toggleHome.addEventListener('click', toggleTemaHome);

// DECLARAÇÃO DE FUNÇÕES
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

// VERIFICAÇÃO SALVA
let darkModeHome = localStorage.getItem('DarkMode');

if(darkModeHome === 'true') {
    toggleHome.checked = true;
    toggleTemaHome();
}