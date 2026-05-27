export const criarBotoesGrid = (listaOpcoes, classeEspecial = '') => {
    let htmlBotoes = '';

    for (let i = 0; i < 4; i++) {
        if (listaOpcoes[i]) {
            htmlBotoes += `
<button class="card-grid-item ${classeEspecial}" data-valor="${listaOpcoes[i]}">
${listaOpcoes[i].toUpperCase()}
</button>
`;
        } else {
            htmlBotoes += `<div class="card-grid-vazio"></div>`;
        }
    }
    return htmlBotoes;
};

export const criarFormularioMetricas = () => {
    return `
        <section class="treino-secao-especial-container">
            <div class="treino-especial-header">
                <div class="treino-especial-texto">
                    <h2>TREINO ESPECIAL / DROP SET</h2>
                    <p>Ative para configurar repetições e cargas individuais por série.</p>
                </div>
                <label class="switch-container">
                    <input type="checkbox" id="chk-ativar-especial">
                    <span class="switch-slider"></span>
                </label>
            </div>
        </section>

        <div class="treino-secao-metricas" id="bloco-metricas-normais">
            <div class="grupo-input-metrica">
                <label for="input-series">SÉRIES</label>
                <input type="number" id="input-series" placeholder="Ex: 4" min="1">
            </div>
            <div class="grupo-input-metrica">
                <label for="input-reps">REPS</label>
                <input type="number" id="input-reps" placeholder="Ex: 12" min="1">
            </div>
            <div class="grupo-input-metrica">
                <label for="input-carga">CARGA (KG)</label>
                <input type="number" id="input-carga" placeholder="Ex: 60" min="0">
            </div>
        </div>

        <div id="container-subseries-dinamicas" class="treino-subseries-grid escondido">
            <div class="treino-especial-controles">
                <button id="btn-adicionar-subserie" class="btn-adicionar-card">+ ADICIONAR SÉRIE</button>
                <span id="contador-series-especiais" class="contador-txt">0 / 12 SÉRIES</span>
            </div>
            <div id="lista-cards-subseries" class="treino-cards-wrapper"></div>
        </div>

        <div class="treino-container-data-horizontal">
            <label for="input-data-treino">DATA DO TREINO</label>
            <input type="date" id="input-data-treino">
        </div>

        <button id="btn-treino-finalizar" class="desabilitado" disabled>Finalizar Treino</button>
    `;
};
export const criarCardSubSerie = (numeroDaSerie) => {
    return `
<div class="card-subserie-item" data-index="${numeroDaSerie}">
<div class="card-subserie-header">
<span>SÉRIE ${numeroDaSerie}</span>
<button type="button" class="btn-remover-subserie" data-remove="${numeroDaSerie}">✕</button>
</div>
<div class="card-subserie-inputs-bloco">
<div class="subserie-campo">
<label>REPS</label>
<input type="number" class="input-subserie-rep" placeholder="Ex: 10" min="1" max="999">
</div>
<div class="subserie-campo">
<label>PESO (KG)</label>
<input type="number" class="input-subserie-carga" placeholder="Ex: 30" min="1" max="999">
</div>
</div>
</div>
`;
};