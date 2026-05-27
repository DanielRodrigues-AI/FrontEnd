import { obterDiasDoMes, NOME_MESES } from './cldformato.js';
import { renderizarBotoesDias, htmlItemTreino } from './cldestrutura.js';
import { $, $class, $query } from '../utils/dom.js';

const mockBancoDeDados = {
    "2026-05-25": [
        { tipo: "superior", nome: "Elevação Lateral c/ Halteres", series: 4, reps: 12, carga: 12 },
        { tipo: "superior", nome: "Supino Inclinado", series: 4, reps: 10, carga: 60 }
    ],
    "2026-05-12": [
        { tipo: "inferior", nome: "Agachamento Livre", series: 4, reps: 8, carga: 80 }
    ]
};

let dataAtual = new Date(2026, 4, 25); 

// Variável global para guardar os treinos que vêm do MySQL
let treinosSalvos = [];

export const iniciarCalendarioLogica = async (containerPai) => {
    configurarEventosCalendario(containerPai);
    await carregarTreinosDoBanco();
};

const carregarTreinosDoBanco = async () => {
    const idUsuario = localStorage.getItem('usuarioId');
    if (!idUsuario) return;

    import('../utils/api.js').then(async ({ apiGet }) => {
        const { ok, dados } = await apiGet(`/treinos/usuario/${idUsuario}`);
        if (ok) {
            treinosSalvos = dados;
        }
        atualizarVisualCalendario();
    });
};

const atualizarVisualCalendario = () => {
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();

    $('cld-titulo-mes-ano').textContent = `${NOME_MESES[mes]} ${ano}`;

    const listaDias = obterDiasDoMes(ano, mes); 

    // Extrai apenas as strings de data ('YYYY-MM-DD') dos treinos vindos do banco
    const datasComTreino = treinosSalvos.map(treino => {
        return treino.dataStr ? treino.dataStr.substring(0, 10) : '';
    });

    // Passa as datas reais para o seu renderizarBotoesDias original pintar de verde
    $('cld-grid-render').innerHTML = renderizarBotoesDias(listaDias, datasComTreino);
};

const configurarEventosCalendario = (containerPai) => {
    containerPai.addEventListener('click', (e) => {
        const btnVoltar = e.target.closest('#btn-cld-voltar');
        const btnAvancar = e.target.closest('#btn-cld-avancar');
        const btnDia = e.target.closest('.cld-botao-dia');

        if (btnVoltar) {
            dataAtual.setMonth(dataAtual.getMonth() - 1);
            atualizarVisualCalendario();
        }

        if (btnAvancar) {
            dataAtual.setMonth(dataAtual.getMonth() + 1);
            atualizarVisualCalendario();
        }

        if (btnDia) {
            const dataClidada = btnDia.dataset.data;
            exibirDetalhesDoDia(dataClidada);
        }
    });
};

// Procure por essa função no seu cldtreino.js e ajuste o final dela:
const exibirDetalhesDoDia = (dataStr) => {
    const [ano, mes, dia] = dataStr.split('-'); //
    $('cld-texto-dia-clicado').textContent = `FICHA DE TREINO DO DIA: ${dia}/${mes}/${ano}`; //

    const listaSuperior = $('cld-lista-exercicios-superior'); //
    const listaInferior = $('cld-lista-exercicios-inferior'); //

    // 1. Filtra todos os treinos salvos que pertencem a este dia específico
    const treinosDoDia = treinosSalvos.filter(treino => treino.dataStr === dataStr); //

    if (treinosDoDia.length === 0) { //
        listaSuperior.innerHTML = `<p class="cld-placeholder-texto">Nenhum exercício para este dia.</p>`; //
        listaInferior.innerHTML = `<p class="cld-placeholder-texto">Nenhum exercício para este dia.</p>`; //
        return; //
    }

    // 2. Filtra de forma inteligente usando a coluna 'tipo' do banco
// 2. Filtra de forma inteligente usando a coluna 'tipo' do banco (Tratando strings vazias ou nulas)
    const treinosSuperiores = treinosDoDia.filter(t => String(t.tipo || '').toLowerCase() === 'superior');
    const treinosInferiores = treinosDoDia.filter(t => String(t.tipo || '').toLowerCase() === 'inferior');

    // 3. Renderiza os cards na coluna de Superiores
    if (treinosSuperiores.length > 0) {
        listaSuperior.innerHTML = treinosSuperiores.map(e => htmlItemTreino(e)).join('');
    } else {
        listaSuperior.innerHTML = `<p class="cld-placeholder-texto">Nenhum exercício registrado.</p>`;
    }

    // 4. Renderiza os cards na coluna de Inferiores
    if (treinosInferiores.length > 0) {
        listaInferior.innerHTML = treinosInferiores.map(e => htmlItemTreino(e)).join('');
    } else {
        listaInferior.innerHTML = `<p class="cld-placeholder-texto">Nenhum exercício registrado.</p>`;
    }
};