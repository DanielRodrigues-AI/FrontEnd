import { configurarEscutas } from './treinoEventos.js';
import { atualizarVisualEtapa } from './treinoVisual.js';

export let estadoTreino = { 
    etapa: 1, 
    tipo: '', 
    grupo: '', 
    subgrupo: '', 
    exercicioSelecionado: '',
    esEspecial: false, 
    seriesEspeciais: [] 
};

export const iniciarGerenciadorTreino = (containerPai) => {
    resetarEstadoTreino();
    configurarEscutas(containerPai);
    renderizarEtapaAtual();
};

export const resetarEstadoTreino = () => {
    estadoTreino.etapa = 1;
    estadoTreino.tipo = '';
    estadoTreino.grupo = '';
    estadoTreino.subgrupo = '';
    estadoTreino.exercicioSelecionado = '';
    estadoTreino.esEspecial = false;
    estadoTreino.seriesEspeciais = [];
};

export const renderizarEtapaAtual = () => {
    atualizarVisualEtapa(estadoTreino);
};