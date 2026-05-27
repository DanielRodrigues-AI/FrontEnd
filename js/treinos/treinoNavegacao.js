export const navegarSlide = (numeroSlide) => {
    const carrossel = document.getElementById('treino-carrossel-slides');
    if (carrossel) {
        // Multiplica o número do slide por -25% (pois são 4 slides de 100% cada um dentro do container)
        const deslocamento = (numeroSlide - 1) * -25;
        carrossel.style.transform = `translateX(${deslocamento}%)`;
    }
};

export const atualizarBreadcrumb = (tipo, grupo, subgrupo) => {
    const txtRota = document.getElementById('treino-breadcrumb-texto');
    if (!txtRota) return;

    let rota = 'Início';
    if (tipo) rota += ` ➔ ${tipo}`;
    if (grupo) rota += ` ➔ ${grupo}`;
    if (subgrupo && subgrupo !== 'geral') rota += ` ➔ ${subgrupo}`;

    txtRota.textContent = rota;
};

export const controlarSetaVoltar = (numeroSlide) => {
    const btnVoltar = document.getElementById('btn-treino-voltar');
    if (!btnVoltar) return;
    
    // Esconde a seta se estiver no primeiro slide, mostra nos outros
    if (numeroSlide === 1) {
        btnVoltar.classList.add('escondido');
    } else {
        btnVoltar.classList.remove('escondido');
    }
};