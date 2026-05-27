export const navegarSlide = (numeroSlide) => {
    const carrossel = document.getElementById('treino-carrossel-slides');
    if (carrossel) {
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
    
    if (numeroSlide === 1) {
        btnVoltar.classList.add('escondido');
    } else {
        btnVoltar.classList.remove('escondido');
    }
};