import { $query } from './dom.js';

export const alternarBotaoCarregando = (formulario, carregar = true) => {
    const btn = formulario.querySelector('button');
    
    if (carregar) {
        btn.dataset.textoOriginal = btn.innerHTML;
        btn.innerHTML = '<span class="spinner"></span>';
        btn.disabled = true;
    } else {
        btn.innerHTML = btn.dataset.textoOriginal || btn.innerHTML;
        btn.disabled = false;
    }
};

export const dispararTremorCard = () => {
    const card = $query('.auth-card');
    if (!card) return;

    card.classList.add('shake');
    card.addEventListener('animationend', () => {
        card.classList.remove('shake');
    }, { once: true });
};