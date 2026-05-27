import { estadoTreino, renderizarEtapaAtual } from './treinoGerenciador.js';
import { criarCardSubSerie } from './treinoComponentes.js';
import { $ } from '../utils/dom.js';


export const redesenharLayoutDropSet = () => {
    const wrapper = $('lista-cards-subseries');
    const contador = $('contador-series-especiais');
    if (!wrapper || !contador) return;

    wrapper.innerHTML = estadoTreino.seriesEspeciais.map((_, idx) => criarCardSubSerie(idx + 1)).join('');
    
    contador.textContent = `${estadoTreino.seriesEspeciais.length} / 12 SÉRIES`;
};


export const adicionarSubSerie = () => {
    if (estadoTreino.seriesEspeciais.length >= 12) {
        alert("Limite máximo de 12 séries atingido!");
        return;
    }

    estadoTreino.seriesEspeciais.push({ reps: '', carga: '' });
    
    redesenharLayoutDropSet();
};

/**
 * @param {number} numeroSerie - O número visível da série (1, 2, 3...)
 */
export const removerSubSerie = (numeroSerie) => {
    const index = parseInt(numeroSerie) - 1;
    
    estadoTreino.seriesEspeciais.splice(index, 1);
    
    redesenharLayoutDropSet();
};