export const htmlCalendarioBase = `
    <div id="cld-modulo-wrapper">
        
        <div class="cld-topo-bloco-container">
            <div class="cld-bloco-esquerdo">
                <h1>HISTÓRICO DE TREINOS</h1>
                <p>Monitore seus dias ativos e clique para ver a ficha realizada.</p>
            </div>
            <div class="cld-bloco-direito">
                <div class="cld-status-card">
                    <span class="cld-status-label">STATUS</span>
                    <span class="cld-status-valor">2º TREINO DO DIA</span>
                </div>
            </div>
        </div>

        <div class="cld-secao-calendario-corpo">
            <div class="cld-controle-mes">
                <button id="btn-cld-voltar" class="cld-btn-seta">◀</button>
                <h2 id="cld-titulo-mes-ano">MAIO 2026</h2>
                <button id="btn-cld-avancar" class="cld-btn-seta">▶</button>
            </div>

            <div class="cld-container-grid">
                <div class="cld-dias-letras">
                    <div>DOM</div><div>SEG</div><div>TER</div><div>QUA</div><div>QUI</div><div>SEX</div><div>SÁB</div>
                </div>
                <div id="cld-grid-render" class="cld-grid-numeros"></div>
            </div>
        </div>

        <section class="cld-detalhes-treino">
            <h3 id="cld-texto-dia-clicado">Clique em um dia destacado para inspecionar</h3>
            
            <div class="cld-layout-colunas-fixas">
                <div class="cld-coluna-treino">
                    <div class="cld-coluna-header cld-txt-superior">SUPERIOR</div>
                    <div id="cld-lista-exercicios-superior" class="cld-coluna-corpo">
                        <p class="cld-placeholder-texto">Nenhum exercício registrado.</p>
                    </div>
                </div>

                <div class="cld-coluna-treino">
                    <div class="cld-coluna-header cld-txt-inferior">INFERIOR</div>
                    <div id="cld-lista-exercicios-inferior" class="cld-coluna-corpo">
                        <p class="cld-placeholder-texto">Nenhum exercício registrado.</p>
                    </div>
                </div>
            </div>
        </section>

    </div>
`;

export const renderizarBotoesDias = (arrayDias, listaDatasTreinadas) => {
    return arrayDias.map(item => {
        const temTreino = listaDatasTreinadas.includes(item.dataStr);
        const classeMes = item.mesCorrente ? 'cld-dia-atual' : 'cld-dia-fora';
        const classeNeon = temTreino ? 'cld-dia-neon' : '';

        return `
            <button class="cld-botao-dia ${classeMes} ${classeNeon}" data-data="${item.dataStr}">
                ${item.numero}
            </button>
        `;
    }).join('');
};

export const htmlItemTreino = (treino) => {
    if (typeof treino === 'string' || !treino) {
        return `
            <div class="cld-card-exercicio-item">
                <h5>${(treino || 'EXERCÍCIO').toUpperCase()}</h5>
                <p>Métricas indisponíveis</p>
            </div>
        `;
    }

    if (treino.es_especial === 1) {
        const subseries = treino.subseries || [];
        
        const htmlSubseries = subseries.map(sub => `
            <div class="cld-subserie-linha">
                <span class="cld-subserie-numero">SÉRIE ${sub.serie_numero}</span>
                <span class="cld-subserie-reps">${sub.reps} REPS</span>
                <span class="cld-subserie-carga">${sub.carga} KG</span>
            </div>
        `).join('');

        return `
            <div class="cld-card-exercicio-item cld-treino-especial">
                <h5>
                    ${treino.exercicio ? treino.exercicio.toUpperCase() : 'EXERCÍCIO ESPECIAL'} 
                    <span class="cld-badge-drop">DROP SET</span>
                </h5>
                <div class="cld-detalhes-especiais-lista">
                    ${htmlSubseries || '<p class="cld-placeholder-texto">Nenhuma subserie encontrada.</p>'}
                </div>
            </div>
        `;
    }

    return `
        <div class="cld-card-exercicio-item">
            <h5>${treino.exercicio ? treino.exercicio.toUpperCase() : 'EXERCÍCIO'}</h5>
            <p>SÉRIES: <strong>${treino.series}</strong> | REPS: <strong>${treino.reps}</strong> | CARGA: <strong>${treino.carga} KG</strong></p>
        </div>
    `;
};