let toggle = document.querySelector('#dn') as HTMLInputElement;
let fundo = document.querySelector('#background') as HTMLBodyElement;
let campoCadastro = document.querySelector('#cadastro') as HTMLDivElement;

toggle.addEventListener('click', toggleTema);

function toggleTema() :void {
    fundo.classList.toggle('darkMode');
    campoCadastro.classList.toggle('loginDarkMode');
    if(toggle.checked){
        localStorage.setItem('DarkMode', 'true');
    }else{
        localStorage.setItem('DarkMode', 'false');
    }
}

let darkMode = localStorage.getItem('DarkMode');

if(darkMode === 'true') {
    toggle.checked = true;
    toggleTema();
}