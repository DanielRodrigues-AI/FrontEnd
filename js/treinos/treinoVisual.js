import { estruturaTreinos } from './exerciciosDados.js';
import { criarBotoesGrid, criarFormularioMetricas, criarCardSubSerie } from './treinoComponentes.js';
import { navegarSlide, atualizarBreadcrumb, controlarSetaVoltar } from './treinoNavegacao.js';
import { $, $class, $query } from '../utils/dom.js';

export const atualizarVisualEtapa = (estado) => {
    atualizarBreadcrumb(estado.tipo, estado.grupo, estado.subgrupo || estado.exercicioSelecionado);
    controlarSetaVoltar(estado.etapa);

    alternarModosTreinoInterface(estado);
    ajustarBotaoFinalizar(estado);
    pintarGridSlideAtivo(estado);

    navegarSlide(estado.etapa);
};

const alternarModosTreinoInterface = (estado) => {
    const areaMetricas = $('area-metricas-exercicio');
    if (!areaMetricas) return;

    if (!areaMetricas.querySelector('#bloco-metricas-normais')) {
        areaMetricas.innerHTML = criarFormularioMetricas();
        areaMetricas.style.display = 'block';
    }

const chkEspecial = $('chk-ativar-especial');
    const blocoNormal = $('bloco-metricas-normais');
    const painelDinamicoDrop = $('container-subseries-dinamicas');

    if (chkEspecial && blocoNormal && painelDinamicoDrop) {
        chkEspecial.checked = estado.esEspecial;

if (estado.esEspecial) {
            blocoNormal.classList.add('escondido');
            painelDinamicoDrop.classList.remove('escondido');
            // Desenha imediatamente a primeira série na tela assim que o container aparece
            redesenharLayoutDropSet(estado.seriesEspeciais);
        } else {
            blocoNormal.classList.remove('escondido');
            painelDinamicoDrop.classList.add('escondido');
        }
    }
    const campoData = $('input-data-treino');
    if (campoData && !campoData.value) {
        campoData.value = new Date().toISOString().split('T')[0];
    }
    ajustarBotaoFinalizar(estado);
};

const ajustarBotaoFinalizar = (estado) => {
    const btnFinalizar = $('btn-treino-finalizar');
    if (!btnFinalizar) return;

    if (estado.etapa === 4 && estado.exercicioSelecionado) {
        btnFinalizar.removeAttribute('disabled');
        btnFinalizar.classList.remove('desabilitado');
    } else {
        btnFinalizar.setAttribute('disabled', 'true');
        btnFinalizar.classList.add('desabilitado');
    }
};

const pintarGridSlideAtivo = (estado) => {
    const gridAtual = $(`grid-slide-${estado.etapa}`);
    if (!gridAtual) return;

    if (estado.etapa === 1) {
        gridAtual.innerHTML = criarBotoesGrid(['superior', 'inferior']);
    } else if (estado.etapa === 2) {
        gridAtual.innerHTML = criarBotoesGrid(Object.keys(estruturaTreinos[estado.tipo] || {}));
    } else if (estado.etapa === 3) {
        gridAtual.innerHTML = criarBotoesGrid(Object.keys(estruturaTreinos[estado.tipo]?.[estado.grupo] || {}));
    } else if (estado.etapa === 4) {
        const listaExs = estruturaTreinos[estado.tipo]?.[estado.grupo]?.[estado.subgrupo] || [];
        gridAtual.innerHTML = criarBotoesGrid(listaExs, 'btn-exercicio-item');

        // Marca o botão que foi selecionado
        gridAtual.querySelectorAll('.btn-exercicio-item').forEach(btn => {
            btn.classList.toggle('selecionado', btn.dataset.valor === estado.exercicioSelecionado);
        });
    }
};

export const redesenharLayoutDropSet = (seriesEspeciais) => {
    const wrapper = $('lista-cards-subseries');
    const contador = $('contador-series-especiais');
    const btnAdicionar = $('btn-adicionar-subserie'); 
    
    if (!wrapper || !contador) return;

    wrapper.innerHTML = seriesEspeciais.map((_, idx) => criarCardSubSerie(idx + 1)).join('');
    contador.textContent = `${seriesEspeciais.length} / 12 SÉRIES`;
    if (btnAdicionar) {
        if (seriesEspeciais.length == 12) {
            btnAdicionar.setAttribute('disabled', 'true');
            btnAdicionar.classList.add('btn-bloqueado-limite');
        } else {
            btnAdicionar.removeAttribute('disabled');
            btnAdicionar.classList.remove('btn-bloqueado-limite');
        }
    }
};