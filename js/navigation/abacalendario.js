import { htmlCalendarioBase } from '../calendario/cldestrutura.js';
import { iniciarCalendarioLogica } from '../calendario/cldtreino.js';

export const htmlCalendario = htmlCalendarioBase;

export const initCalendarioEventos = () => {
    const container = document.getElementById('cld-modulo-wrapper');
    if (container) {
        iniciarCalendarioLogica(container);
    }
};