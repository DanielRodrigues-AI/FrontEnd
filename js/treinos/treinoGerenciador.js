import { configurarEscutas } from './treinoEventos.js';
import { atualizarVisualEtapa } from './treinoVisual.js';

// O estado do treino fica isolado e protegido aqui
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

// Centraliza a atualização completa da tela
export const renderizarEtapaAtual = () => {
    atualizarVisualEtapa(estadoTreino);
};