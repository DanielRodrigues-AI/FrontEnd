import { estadoTreino, renderizarEtapaAtual } from './treinoGerenciador.js';
import { criarCardSubSerie } from './treinoComponentes.js';
import { $ } from '../utils/dom.js';

/**
 * Redesenha a grid de subséries (Drop Set) baseando-se no array do estado global
 */
export const redesenharLayoutDropSet = () => {
    const wrapper = $('lista-cards-subseries');
    const contador = $('contador-series-especiais');
    if (!wrapper || !contador) return;

    // Mapeia o array da memória gerando o HTML de cada card
    wrapper.innerHTML = estadoTreino.seriesEspeciais.map((_, idx) => criarCardSubSerie(idx + 1)).join('');
    
    // Atualiza o contador de séries (ex: 2 / 12 SÉRIES)
    contador.textContent = `${estadoTreino.seriesEspeciais.length} / 12 SÉRIES`;
};

/**
 * Adiciona uma nova subsérie vazia ao array (Limite de 12)
 */
export const adicionarSubSerie = () => {
    if (estadoTreino.seriesEspeciais.length >= 12) {
        alert("Limite máximo de 12 séries atingido!");
        return;
    }

    // Injeta um objeto vazio de métricas na memória
    estadoTreino.seriesEspeciais.push({ reps: '', carga: '' });
    
    // Atualiza a tela com o novo card
    redesenharLayoutDropSet();
};

/**
 * Remove uma subsérie específica do array baseada no índice do botão clicado
 * @param {number} numeroSerie - O número visível da série (1, 2, 3...)
 */
export const removerSubSerie = (numeroSerie) => {
    const index = parseInt(numeroSerie) - 1;
    
    // Remove o item da memória
    estadoTreino.seriesEspeciais.splice(index, 1);
    
    // Atualiza a tela para reordenar os cards e números remanescentes
    redesenharLayoutDropSet();
};