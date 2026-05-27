import { API_URL } from './config.js';

/**
 * Cliente HTTP isolado para requisições POST // POST = MANDAR
 */
export const apiPost = async (endpoint, dados) => {
    try {
        const resposta = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();
        return { ok: resposta.ok, dados: resultado };

    } catch (error) {
        console.error(`Erro na requisição para ${endpoint}:`, error);
        return { ok: false, dados: { erro: 'Servidor offline ou falha na rede.' } };
    }
};

/**
 * Cliente HTTP isolado para requisições GET // GET = PEDIR
 */
export const apiGet = async (endpoint) => {
    try {
        const resposta = await fetch(`${API_URL}${endpoint}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const resultado = await resposta.json();
        return { ok: resposta.ok, dados: resultado };

    } catch (error) {
        console.error(`Erro na requisição GET para ${endpoint}:`, error);
        return { ok: false, dados: { erro: 'Falha na rede ou servidor offline.' } };
    }
};