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
        
        // CORREÇÃO: Declarando os alvos corretos para o Drop Set acordar
        const btnAddSerie = e.target.closest('#btn-adicionar-subserie');
        const btnRemoverSerie = e.target.closest('.btn-remover-subserie');

        if (botao) tratarCliqueGrid(botao.dataset.valor);
        if (voltar) tratarCliqueVoltar();

        // Gatilho para o botão de Adicionar Série (+ ADICIONAR SÉRIE)
        if (btnAddSerie) {
            adicionarSubSerie();
        }

        // Gatilho para o botão de Remover Série (✕)
        if (btnRemoverSerie) {
            removerSubSerie(btnRemoverSerie.dataset.remove);
        }

        if (finalizar) {
            validarEEnviarTreino(estadoTreino);
        }
    });
// Escuta cirúrgica do Switch usando o ID real do HTML
    containerPai.addEventListener('change', (e) => {
        if (e.target.id === 'chk-ativar-especial') {
            estadoTreino.esEspecial = e.target.checked;
            
            // Se o usuário acabou de ligar o switch e não tem nenhuma série na tela, coloca a 1ª automaticamente
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
    // 1. Se o cara está no slide 4 e clica em voltar, ele está abandonando o exercício selecionado
    if (estadoTreino.etapa === 4) {
        estadoTreino.exercicioSelecionado = '';
        estadoTreino.seriesEspeciais = [];
        estadoTreino.esEspecial = false;
        if (chkEspecial) chkEspecial.checked = false;
    }
    // 2. Se está no slide 3 (vai voltar pro 2), limpa o subgrupo do 3 e o grupo do 2
    else if (estadoTreino.etapa === 3) {
        estadoTreino.subgrupo = '';
        estadoTreino.grupo = '';
    }
    // 3. Se está no slide 2 (vai voltar pro 1), limpa o grupo do 2 e o tipo do 1
    else if (estadoTreino.etapa === 2) {
        estadoTreino.grupo = '';
        estadoTreino.tipo = '';
    }
    // 4. Se está no slide 1, zera tudo por segurança
    else if (estadoTreino.etapa === 1) {
        estadoTreino.tipo = '';
    }

    // Agora sim: diminui a etapa e renderiza o visual com os dados já limpos!
    estadoTreino.etapa--;
    renderizarEtapaAtual();
};