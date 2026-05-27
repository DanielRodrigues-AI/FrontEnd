export const renderHome = (nomeUsuario) => {
    const nomeExibicao = nomeUsuario || "Atleta";

    return `
        <h2>Olá, ${nomeExibicao}! 💪</h2>
        <p>Monitore sua evolução física hoje.</p>
        <div class="dashboard-grid">
            <div class="card-treino destaque">
                <h3>Treino do Dia</h3>
                <p>Status: <strong>Pendente</strong></p>
            </div>
            <div class="card-treino">
                <h3>Frequência Semanal</h3>
                <p><strong>3 / 5</strong> Dias Concluídos</p>
            </div>
        </div>
    `;
};