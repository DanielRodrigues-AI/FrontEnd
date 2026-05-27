import { estadoTreino, renderizarEtapaAtual } from './treinoGerenciador.js';
import { redesenharLayoutDropSet } from './treinoVisual.js';
import { validarEEnviarTreino } from './treinoValidador.js';
import { $, $class, $query } from '../utils/dom.js';
import { adicionarSubSerie, removerSubSerie } from './treinoEspecial.js';

export const configurarEscutas = (containerPai) => {
containerPai.addEventListener('click', (e) => {
        const botao = e.target.closest('.card-grid-item');
        const voltar = e.target.closest('#btn-treino-voltar');
        const finalizar = e.target.closest('#btn-treino-finalizar');
        
        const btnAddSerie = e.target.closest('#btn-adicionar-subserie');
        const btnRemoverSerie = e.target.closest('.btn-remover-subserie');

        if (botao) tratarCliqueGrid(botao.dataset.valor);
        if (voltar) tratarCliqueVoltar();

        if (btnAddSerie) {
            adicionarSubSerie();
        }

        if (btnRemoverSerie) {
            removerSubSerie(btnRemoverSerie.dataset.remove);
        }

        if (finalizar) {
            validarEEnviarTreino(estadoTreino);
        }
    });
    containerPai.addEventListener('change', (e) => {
        if (e.target.id === 'chk-ativar-especial') {
            estadoTreino.esEspecial = e.target.checked;
            
            if (estadoTreino.esEspecial && estadoTreino.seriesEspeciais.length === 0) {
                estadoTreino.seriesEspeciais.push({ reps: '', carga: '' });
            }
            
            renderizarEtapaAtual();
        }
    });
};

const tratarCliqueGrid = (valor) => {
    if (estadoTreino.etapa === 4) {
        estadoTreino.exercicioSelecionado = valor;
    } else {
        if (estadoTreino.etapa === 1) estadoTreino.tipo = valor;
        else if (estadoTreino.etapa === 2) estadoTreino.grupo = valor;
        else if (estadoTreino.etapa === 3) estadoTreino.subgrupo = valor;
        estadoTreino.etapa++;
    }
    renderizarEtapaAtual();
};

const tratarCliqueVoltar = (chkEspecial) => {
    if (estadoTreino.etapa === 4) {
        estadoTreino.exercicioSelecionado = '';
        estadoTreino.seriesEspeciais = [];
        estadoTreino.esEspecial = false;
        if (chkEspecial) chkEspecial.checked = false;
    }
    else if (estadoTreino.etapa === 3) {
        estadoTreino.subgrupo = '';
        estadoTreino.grupo = '';
    }
    else if (estadoTreino.etapa === 2) {
        estadoTreino.grupo = '';
        estadoTreino.tipo = '';
    }
    else if (estadoTreino.etapa === 1) {
        estadoTreino.tipo = '';
    }

    estadoTreino.etapa--;
    renderizarEtapaAtual();
};