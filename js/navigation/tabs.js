import { $, $class, $query } from '../utils/dom.js';
import { apiGet } from '../utils/api.js'; 
import { renderHome } from './abahome.js';
import { htmlCalendario, initCalendarioEventos } from './abacalendario.js';
import { htmlConfig } from './abaconfig.js';
import { htmlTreino, initAbatreinoEventos } from './abatreino.js';

export const initTabs = () => {
  const botoes = document.querySelectorAll('nav button');
  const containerApp = $('app');

  const navegarPara = async (nomeDaAba) => {

    if (nomeDaAba === 'home') {
      const idUsuario = localStorage.getItem('usuarioId');

      if (idUsuario) {
        const { ok, dados } = await apiGet(`/usuario/${idUsuario}`);
        if (ok) {
          containerApp.innerHTML = renderHome(dados.nome);
        } else {
          containerApp.innerHTML = renderHome("Atleta");
        }
      } else {
        containerApp.innerHTML = renderHome("Atleta");
      }
    } else {
      const telas = {
        treinos: htmlTreino,
        calendario: htmlCalendario,
        config: htmlConfig
      };
      containerApp.innerHTML = telas[nomeDaAba] || `<h2>Tela não encontrada</h2>`;
    }

    if (nomeDaAba === 'treinos') {
      initAbatreinoEventos();
    }
    
    if (nomeDaAba === 'calendario') {
      initCalendarioEventos();
    }

    botoes.forEach(btn => btn.classList.remove('active'));
    const botaoAtivo = $query(`button[data-tab="${nomeDaAba}"]`);
    if (botaoAtivo) botaoAtivo.classList.add('active');
  };

  botoes.forEach(botao => {
    botao.addEventListener('click', () => {
      const abaAlvo = botao.dataset.tab;
      navegarPara(abaAlvo);
    });
  });

  navegarPara('home');
};