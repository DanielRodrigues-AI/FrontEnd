export const NOME_MESES = [
    "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
    "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
];

export const obterDiasDoMes = (ano, mes) => {
    const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
    const totalDiasMes = new Date(ano, mes + 1, 0).getDate();
    const totalDiasMesAnterior = new Date(ano, mes, 0).getDate();

    const dias = [];

    // 1. Dias do mês anterior para preencher a primeira semana
    for (let i = primeiroDiaSemana - 1; i >= 0; i--) {
        dias.push({
            numero: totalDiasMesAnterior - i,
            mesCorrente: false,
            dataStr: formatarData(ano, mes - 1, totalDiasMesAnterior - i)
        });
    }

    // 2. Dias do mês atual (Garantindo que roda até o fim do mês)
    for (let i = 1; i <= totalDiasMes; i++) {
        dias.push({
            numero: i,
            mesCorrente: true,
            dataStr: formatarData(ano, mes, i)
        });
    }

    // 3. Dias do próximo mês para fechar o grid (múltiplo de 7)
    const totalCelulas = Math.ceil(dias.length / 7) * 7;
    const faltam = totalCelulas - dias.length;
    for (let i = 1; i <= faltam; i++) {
        dias.push({
            numero: i,
            mesCorrente: false,
            dataStr: formatarData(ano, mes + 1, i)
        });
    }

    return dias;
};

export const formatarData = (ano, mes, dia) => {
    const data = new Date(ano, mes, dia);
    const m = String(data.getMonth() + 1).padStart(2, '0');
    const d = String(data.getDate()).padStart(2, '0');
    return `${data.getFullYear()}-${m}-${d}`;
};