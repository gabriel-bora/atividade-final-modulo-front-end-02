// ------------------------- LÓGICA PARA VERIFICAÇÃO DE LOGIN ----------------------------
let login :string = window.sessionStorage.getItem('login') || '';
let emailLogado :string = window.sessionStorage.getItem('usuario') || '';

if(login === 'true'){
    let spanNomeLogado = document.querySelector('#spanNomeLogado') as HTMLSpanElement;
    spanNomeLogado.innerText = emailLogado;
    let toastLogin = document.querySelector('#toastLogin') as HTMLDivElement;
    const toast = new bootstrap.Toast(toastLogin);
    toast.show();
    let toastLoginClose = document.querySelector('#toastLoginClose') as HTMLButtonElement;
    toastLoginClose.addEventListener('click', () => {
        window.location.href = './home.html';
    });
};

// --------------------------- DECLARAÇÃO DE DADOS GLOBAIS -----------------------------
// VARIÁVEIS
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
interface Recados {
    indice :string;
    descricao :string;
    detalhamento :string;
    data: string
};
interface Usuario {
    username :string;
    password :string;
    nome :string;
    recados :Recados[]
};
let listaUsuarios :Usuario[] = pegarNoStorage();
let inputLoginUser = document.querySelector('#inputLoginUser') as HTMLInputElement;
let inputLoginPass = document.querySelector('#inputLoginPass') as HTMLInputElement;
let inputCadastroUser = document.querySelector('#inputCadastroUser') as HTMLInputElement;
let spanCadastroUser = document.querySelector('#spanCadastroUser') as HTMLSpanElement;
let inputCadastroPass = document.querySelector('#inputCadastroPass') as HTMLInputElement;
let spanCadastroPass = document.querySelector('#spanCadastroPass') as HTMLSpanElement;
let inputCadastroNome = document.querySelector('#inputCadastroNome') as HTMLInputElement;
let spanCadastroNome = document.querySelector('#spanCadastroNome') as HTMLSpanElement;
let checkLoginRegistro = document.querySelector('#chk') as HTMLInputElement;

// FUNÇÕES
function salvarNoStorage(listaUsuarios: Usuario[]) {
    window.localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
};
function pegarNoStorage() :Usuario[] {
    return JSON.parse(window.localStorage.getItem('usuarios') || '[]');
};

// ------------------------------- LÓGICA PARA TEMA ESCURO -------------------------------
// DECLARAÇÃO DE VARIÁVEIS
let toggle = document.querySelector('#dn') as HTMLInputElement;
let fundo = document.querySelector('#background') as HTMLBodyElement;
let campoCadastro = document.querySelector('#cadastro') as HTMLDivElement;
let spanLoginUser = document.querySelector('#spanLoginUser') as HTMLSpanElement;
let spanLoginPass = document.querySelector('#spanLoginPass') as HTMLSpanElement;

// DECLARAÇÃO DE EVENTOS
toggle.addEventListener('click', toggleTema);

// DECLARAÇÃO DE FUNÇÕES
function toggleTema() :void {
    fundo.classList.toggle('darkMode');
    campoCadastro.classList.toggle('loginDarkMode');
    inputLoginUser.classList.toggle('loginInputDarkMode');
    inputLoginPass.classList.toggle('loginInputDarkMode');
    inputCadastroNome.classList.toggle('loginInputDarkMode');
    inputCadastroUser.classList.toggle('loginInputDarkMode');
    inputCadastroPass.classList.toggle('loginInputDarkMode');
    spanLoginUser.classList.toggle('basic-addon1-dark-mode');
    spanLoginPass.classList.toggle('basic-addon1-dark-mode');
    spanCadastroNome.classList.toggle('basic-addon1-dark-mode');
    spanCadastroUser.classList.toggle('basic-addon1-dark-mode');
    spanCadastroPass.classList.toggle('basic-addon1-dark-mode');
    if(toggle.checked){
        localStorage.setItem('DarkMode', 'true');
    }else{
        localStorage.setItem('DarkMode', 'false');
    }
};

// VERIFICAÇÃO SALVA
let darkMode = localStorage.getItem('DarkMode');

if(darkMode === 'true') {
    toggle.checked = true;
    toggleTema();
};

// --------------------------- LÓGICA PARA EXECUÇÃO DE LOGIN ------------------------------
// DECLARAÇÃO DE VARIÁVEIS
let formLogin = document.querySelector('#formLogin') as HTMLFormElement;

// DECLARAÇÃO DE EVENTOS
formLogin.addEventListener('submit', entrar);

// DECLARAÇÃO DE FUNÇÕES
function entrar(e: any): void{
    e.preventDefault();
    
    let username = inputLoginUser.value;
    let senha = inputLoginPass.value;

    listaUsuarios = pegarNoStorage();

    let validaEmail = listaUsuarios.some((valor) => {
        return valor.username === username;
    });

    if (validaEmail === false){
        let toastEmailNovo = document.querySelector('#toastEmailNovo') as HTMLDivElement;
        const toast = new bootstrap.Toast(toastEmailNovo);
        toast.show();
        let toastEmailNovoClose = document.querySelector('#toastEmailNovoClose') as HTMLButtonElement;
        toastEmailNovoClose.addEventListener('click', () => {
            formLogin.reset();
            checkLoginRegistro.checked = true;
        });
        return;
    }else{
        let validacao = listaUsuarios.some((valor :Usuario) => {
            return valor.username === username && valor.password === senha;
        });
    
        if(validacao){
            window.sessionStorage.setItem('login', 'true');
            window.sessionStorage.setItem('usuario', username);
            window.location.href = './home.html';
            return;
        }else {
            let toastEmailIncorreto = document.querySelector('#toastEmailIncorreto') as HTMLDivElement;
            const toast = new bootstrap.Toast(toastEmailIncorreto);
            toast.show();
            let toastEmailIncorretoClose = document.querySelector('#toastEmailIncorretoClose') as HTMLButtonElement;
            toastEmailIncorretoClose.addEventListener('click', () => {
                formLogin.reset();
                inputLoginUser.focus();
            });
            return;
        }
    }
};

// -------------------------- LÓGICA PARA REGISTROS DE USUÁRIO ----------------------------
// DECLARAÇÃO DE VARIÁVEIS
let validUser = false;
let validPass = false;
let validNome = false;
let formCadastro = document.querySelector('#formCadastro') as HTMLFormElement;
let regSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// DECLARAÇÃO DE EVENTOS
inputCadastroUser.addEventListener('keyup', verificaEmail);
inputCadastroPass.addEventListener('keyup', verificaSenha);
inputCadastroNome.addEventListener('keyup', verificaNome);
formCadastro.addEventListener('submit', verificaCampos);

// DECLARAÇÃO DE FUNÇÕES
function verificaEmail() :void {
    if(inputCadastroUser.value === ''){
        spanCadastroUser.removeAttribute('style');
        inputCadastroUser.removeAttribute('style');
        validUser = false;
    }else{
        if(inputCadastroUser.value.length < 10){
            spanCadastroUser.setAttribute('style', 'border-bottom: 1px solid #FF0000!important; color: #FF0000!important;');
            inputCadastroUser.setAttribute('style', 'border-bottom: 1px solid #FF0000!important; border-right: 1px solid #FF0000!important; color: #FF0000!important');
            validUser = false;
        }else{
            spanCadastroUser.setAttribute('style', 'border-bottom: 1px solid #008000!important; color: #008000!important;');
            inputCadastroUser.setAttribute('style', 'border-bottom: 1px solid #008000!important; border-right: 1px solid #008000!important; color: #008000!important');
            validUser = true;
        }
    }
};

function verificaSenha() :void {
    let senhaValida = inputCadastroPass.value.match(regSenha);

    if(inputCadastroPass.value === ''){
        spanCadastroPass.removeAttribute('style');
        inputCadastroPass.removeAttribute('style');
        validPass = false;
    }else{
        if(inputCadastroPass.value.length < 8){
            spanCadastroPass.setAttribute('style', 'border-bottom: 1px solid #FF0000!important; color: #FF0000!important;');
            inputCadastroPass.setAttribute('style', 'border-bottom: 1px solid #FF0000!important; border-right: 1px solid #FF0000!important; color: #FF0000!important');
            validPass = false;
        }else if(senhaValida === null){
            spanCadastroPass.setAttribute('style', 'border-bottom: 1px solid #FF0000!important; color: #FF0000!important;');
            inputCadastroPass.setAttribute('style', 'border-bottom: 1px solid #FF0000!important; border-right: 1px solid #FF0000!important; color: #FF0000!important'); 
            validPass = false;
        }else{
            spanCadastroPass.setAttribute('style', 'border-bottom: 1px solid #008000!important; color: #008000!important;');
            inputCadastroPass.setAttribute('style', 'border-bottom: 1px solid #008000!important; border-right: 1px solid #008000!important; color: #008000!important');
            validPass = true;
        }
    }
};

function verificaNome() :void {
    if(inputCadastroNome.value === ''){
        spanCadastroNome.removeAttribute('style');
        inputCadastroNome.removeAttribute('style');
        validNome = false;
    }else{
        if(inputCadastroNome.value.length < 3){
            spanCadastroNome.setAttribute('style', 'border-bottom: 1px solid #FF0000!important; color: #FF0000!important;');
            inputCadastroNome.setAttribute('style', 'border-bottom: 1px solid #FF0000!important; border-right: 1px solid #FF0000!important; color: #FF0000!important');
            validNome = false;
        }else{
            spanCadastroNome.setAttribute('style', 'border-bottom: 1px solid #008000!important; color: #008000!important;');
            inputCadastroNome.setAttribute('style', 'border-bottom: 1px solid #008000!important; border-right: 1px solid #008000!important; color: #008000!important');
            validNome = true;
        }
    }
};

function verificaCampos(e: any) :void {
    e.preventDefault();

    listaUsuarios = pegarNoStorage();

    if(inputCadastroUser.value === '' || inputCadastroPass.value === '' || inputCadastroNome.value === ''){
        let toastCamposIncorretos = document.querySelector('#toastCamposIncorretos') as HTMLDivElement;
        const toast = new bootstrap.Toast(toastCamposIncorretos);
        toast.show();
        return;
    }else if(!validUser || !validPass || !validNome){
        let toastCamposIncorretos = document.querySelector('#toastCamposIncorretos') as HTMLDivElement;
        const toast = new bootstrap.Toast(toastCamposIncorretos);
        toast.show();
        return;
    }else {        
        if(listaUsuarios){
            let validaDuplicidade = listaUsuarios.some((valor) => {
                return valor.username === inputCadastroUser.value;
            });

            if(validaDuplicidade){
                let toastDuplicidade = document.querySelector('#toastDuplicidade') as HTMLDivElement;
                const toast = new bootstrap.Toast(toastDuplicidade);
                toast.show();
                let toastDuplicidadeClose = document.querySelector('#toastDuplicidadeClose') as HTMLButtonElement;
                toastDuplicidadeClose.addEventListener('click', () => {
                    retornaEstiloForm();
                    checkLoginRegistro.checked = false;
                })
                return;
            }else{
                criaUsuario();
                let toastCadastro = document.querySelector('#toastCadastro') as HTMLDivElement;
                const toast = new bootstrap.Toast(toastCadastro);
                toast.show();
                retornaEstiloForm();
                let toastCadastroSim = document.querySelector('#toastCadastroSim') as HTMLButtonElement;
                toastCadastroSim.addEventListener('click', () => {
                    checkLoginRegistro.checked = false;
                })
            }
        }else{
            criaUsuario();
            let toastCadastro = document.querySelector('#toastCadastro') as HTMLDivElement;
            const toast = new bootstrap.Toast(toastCadastro);
            toast.show();
            retornaEstiloForm();
            let toastCadastroSim = document.querySelector('#toastCadastroSim') as HTMLButtonElement;
            toastCadastroSim.addEventListener('click', () => {
                checkLoginRegistro.checked = false;
            })
        }
    }
};

function criaUsuario() :void {
    let novoUsuario :Usuario = {
        username:inputCadastroUser.value,
        password:inputCadastroPass.value,
        nome:inputCadastroNome.value,
        recados:[]
    }

    listaUsuarios = pegarNoStorage();

    listaUsuarios.push(novoUsuario);

    salvarNoStorage(listaUsuarios);
};

function retornaEstiloForm() :void {
    formCadastro.reset();
    spanCadastroUser.removeAttribute('style');
    inputCadastroUser.removeAttribute('style');
    spanCadastroPass.removeAttribute('style');
    inputCadastroPass.removeAttribute('style');
    spanCadastroNome.removeAttribute('style');
    inputCadastroNome.removeAttribute('style');
}