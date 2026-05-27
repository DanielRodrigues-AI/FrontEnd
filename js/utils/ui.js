import { $query } from './dom.js';

/**
 * Ativa o estado de "Carregando" em um botão e desabilita cliques
 */
/**
 * Ativa o estado de "Carregando" colocando um spinner giratório no botão
 */
export const alternarBotaoCarregando = (formulario, carregar = true) => {
    const btn = formulario.querySelector('button');
    
    if (carregar) {
        // Guarda o texto atual (ex: "ENTRAR NO TREINO")
        btn.dataset.textoOriginal = btn.innerHTML;
        // Substitui o texto pelo nosso círculo giratório do CSS
        btn.innerHTML = '<span class="spinner"></span>';
        btn.disabled = true;
    } else {
        // Restaura o texto original se der erro
        btn.innerHTML = btn.dataset.textoOriginal || btn.innerHTML;
        btn.disabled = false;
    }
};

/**
 * Ativa a animação de tremor (shake) no card de autenticação
 */
export const dispararTremorCard = () => {
    const card = $query('.auth-card');
    if (!card) return;

    card.classList.add('shake');
    card.addEventListener('animationend', () => {
        card.classList.remove('shake');
    }, { once: true });
};