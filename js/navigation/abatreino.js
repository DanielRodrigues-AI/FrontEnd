
import { iniciarGerenciadorTreino } from '../treinos/treinoGerenciador.js';
export const htmlTreino = `
    <div id="treino-modulo-container">
        <div class="treino-topo-breadcrumb">
            <span id="treino-breadcrumb-texto">Início</span>
        </div>

        <div class="treino-mascara-slides">
            <div id="treino-carrossel-slides">
                
                <div class="slide-painel-fixo">
                    <div class="grid-2x2-blindada" id="grid-slide-1"></div>
                </div>

                <div class="slide-painel-fixo">
                    <div class="grid-2x2-blindada" id="grid-slide-2"></div>
                </div>

                <div class="slide-painel-fixo">
                    <div class="grid-2x2-blindada" id="grid-slide-3"></div>
                </div>

                <div class="slide-painel-fixo">
                    <div class="grid-2x2-blindada" id="grid-slide-4"></div>
                </div>

            </div>
        </div>

<div id="area-metricas-exercicio"></div>

        <div class="treino-controle-inferior">
            <button id="btn-treino-voltar" class="escondido">
                <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
        </div>
    </div>
`;

export const initAbatreinoEventos = () => {
    const container = document.getElementById('treino-modulo-container');
    if (container) {
        iniciarGerenciadorTreino(container);
    }
};