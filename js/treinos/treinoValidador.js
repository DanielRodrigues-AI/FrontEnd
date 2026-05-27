import { $, $class, $query } from '../utils/dom.js';

export const validarEEnviarTreino = (estado) => {
    // 1. Captura e valida a data primeiro
    const campoData = document.getElementById('input-data-treino')?.value;
    if (!campoData) {
        alert("Por favor, selecione uma data para o treino antes de finalizar!");
        return;
    }

    // 2. Valida se um exercício foi selecionado na lista (Para evitar salvar treino sem nome)
    if (!estado.exercicioSelecionado) {
        alert("Por favor, selecione um exercício na lista antes de finalizar!");
        return;
    }

    // 3. Monta o esqueleto básico do pacote
    const pacoteEnvio = { 
        usuario_id: 1, 
        exercicio: estado.exercicioSelecionado, 
        es_especial: estado.esEspecial ? 1 : 0,
        tipo: estado.tipo,
        criado_em: campoData 
    };

    // 4. Delega a validação e preenchimento dos campos específicos (Aqui que a mágica acontece)
    if (!estado.esEspecial) {
        if (!validarMetricasNormais(pacoteEnvio)) return;
    } else {
        if (!validarMetricasDropSet(pacoteEnvio)) return;
    }

    // 5. Garante o ID do usuário do localStorage
    const idUsuarioLogado = localStorage.getItem('usuarioId');
    if (!idUsuarioLogado) {
        alert("Erro: Usuário não identificado. Faça login novamente.");
        return;
    }
    pacoteEnvio.usuario_id = parseInt(idUsuarioLogado);

    // 6. Faz o disparo da API (Mantém o restante do seu código de envio igual abaixo)
    import('../utils/api.js').then(async ({ apiPost }) => {
        const { ok, dados } = await apiPost('/treinos', pacoteEnvio);
        if (ok) {
            const toast = document.getElementById('custom-toast');
            const toastMsg = document.getElementById('toast-message');
            if (toast && toastMsg) {
                toastMsg.textContent = "Treino salvo com sucesso! 💪";
                toast.classList.remove('hidden');
                toast.classList.add('active');
                setTimeout(() => toast.classList.remove('active'), 4000);
            }

            import('./treinoGerenciador.js').then(({ iniciarGerenciadorTreino }) => {
                const container = document.getElementById('treino-modulo-container');
                if (container) iniciarGerenciadorTreino(container);
            });
        } else {
            alert(dados.erro || "Falha ao salvar treino.");
        }
    });
};

const validarMetricasNormais = (pacote) => {
    const s = $('input-series')?.value;
    const r = $('input-reps')?.value;
    const c = $('input-carga')?.value;

    if (!s || !r || !c || s < 1 || r < 1 || c < 0 || s > 999 || r > 999 || c > 999) {
        alert("Preencha as métricas corretamente (Valores entre 1 e 999)!");
        return false;
    }

    pacote.series = parseInt(s);
    pacote.reps = parseInt(r);
    pacote.carga = parseInt(c);
    pacote.subseries = [];
    return true;
};

const validarMetricasDropSet = (pacote) => {
    // Captura todos os cards de subbérias gerados na tela
    const cards = document.querySelectorAll('.card-subserie-item');
    if (cards.length === 0) {
        alert("Adicione pelo menos 1 série especial para o Drop Set!");
        return false;
    }

    const listaFiltrada = [];
    
    // Varre card por card coletando o que o usuário digitou
    for (let card of cards) {
        const numeroSerie = parseInt(card.dataset.index); // Pega se é Série 1, Série 2...
        const r = card.querySelector('.input-subserie-rep')?.value;
        const c = card.querySelector('.input-subserie-carga')?.value;

        // Valida se os campos não estão null ou vazios
        if (!r || !c || r < 1 || c < 0 || r > 999 || c > 999) {
            alert(`Por favor, preencha corretamente as REPS e o PESO da SÉRIE ${numeroSerie}!`);
            return false;
        }

        // Monta o objeto da subbérie com a numeração correta
        listaFiltrada.push({
            serie_numero: numeroSerie,
            reps: parseInt(r),
            carga: parseInt(c)
        });
    }

    // REGRA DO BANCO: Campos normais vão como null porque os dados reais estão nas subbérias
    pacote.series = null;
    pacote.reps = null;
    pacote.carga = null;
    
    // Injeta a lista de subbérias no pacote que vai para o NodeJS
    pacote.subseries = listaFiltrada;
    return true;
};