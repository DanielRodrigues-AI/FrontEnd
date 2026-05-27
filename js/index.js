import { $, $class, $query } from './utils/dom.js';
import { apiPost } from './utils/api.js';
import { alternarBotaoCarregando, dispararTremorCard } from './utils/ui.js'; // Novo utilitário

document.addEventListener('DOMContentLoaded', () => {
    const formLogin = $('form-login');
    const formCadastro = $('form-cadastro');
    const subtitle = $('auth-subtitle');

    const linkToRegister = $('go-to-register');
    const linkToLogin = $('go-to-login');

    const toast = $('custom-toast');
    const toastMsg = $('toast-message');

    function dispararToast(mensagem) {
        toastMsg.textContent = mensagem;
        toast.classList.remove('active');
        void toast.offsetWidth;
        toast.classList.add('active');
    }

    // Alternância de Telas
    linkToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        formLogin.classList.add('hidden');
        formCadastro.classList.remove('hidden');
        subtitle.textContent = 'Crie sua conta para começar';
    });

    linkToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        formCadastro.classList.add('hidden');
        formLogin.classList.remove('hidden');
        subtitle.textContent = 'Acesse sua área de treino';
    });

    // Fluxo de Login
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!formLogin.checkValidity()) {
            dispararTremorCard(); // Função isolada cuidando do CSS
            return;
        }

        alternarBotaoCarregando(formLogin, true); // Ativa animação

        const dados = Object.fromEntries(new FormData(formLogin));
        const { ok, dados: resposta } = await apiPost('/login', dados);

        if (ok) {
            dispararToast(resposta.mensagem);
            formLogin.reset();
            localStorage.setItem('usuarioId', resposta.usuarioId);
            setTimeout(() => { window.location.href = './home.html'; }, 2000);
        } else {
            dispararToast(resposta.erro);
            alternarBotaoCarregando(formLogin, false); // Desativa se der erro
        }
    });

    // Fluxo de Cadastro
    formCadastro.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        alternarBotaoCarregando(formCadastro, true, "CRIANDO CONTA...");

        const dados = Object.fromEntries(new FormData(formCadastro));
        const { ok, dados: resposta } = await apiPost('/cadastro', dados);

        if (ok) {
            dispararToast(resposta.mensagem);
            formCadastro.reset();
            localStorage.setItem('usuarioId', resposta.usuarioId);
            setTimeout(() => { window.location.href = './home.html'; }, 2000);
        } else {
            dispararToast(resposta.erro);
            alternarBotaoCarregando(formCadastro, false);
        }
    });
});