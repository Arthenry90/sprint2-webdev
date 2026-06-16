import CardMissao from '../components/CardMissao';
import { useState, useEffect } from 'react';

function Missoes() {
  const [usuario, setUsuario] = useState(null);
  const [missoes, setMissoes] = useState([]);
  const [inputsProgresso, setInputsProgresso] = useState({});
  const [paginaPendente, setPaginaPendente] = useState(0);
  const [recompensasValendo, setRecompensasValendo] = useState([]);

  const configAbas = {
    concluida: { titulo: "Concluída", fundo: "bg-[#7AD1C3]/30", borda: "border-[#1C9770]", cardFundo: "bg-[#1C9770]/80", btn: "bg-[#93CB52] text-white" },
    progresso: { titulo: "Progresso", fundo: "bg-[#7AD1C3]/40", borda: "border-[#7AD1C3]", cardFundo: "bg-[#7AD1C3]", btn: "bg-[#93CB52] text-white" },
    pendente:  { titulo: "Pendente",  fundo: "bg-[#95E495]/40", borda: "border-[#7AD180]", cardFundo: "bg-[#7AD180]", btn: "bg-[#CB5252] text-white" }
  };

  useEffect(() => {
    const dadosUser = localStorage.getItem('user');
    if (dadosUser) {
      const userObj = JSON.parse(dadosUser);
      setUsuario(userObj);

      const salvas = localStorage.getItem(`missoes_${userObj.id}`);
      if (salvas) {
        setMissoes(JSON.parse(salvas));
      } else {
        fetch('missoes.json')
        .then((resposta) => {
          if (!resposta.ok) throw new Error(`Erro: ${resposta.status}`);
          return resposta.json();
        })
        .then((dadosJson) => {
          const inicializadas = dadosJson.map(m => ({
            ...m,
            progressoAtual: Math.round((m.percentual / 100) * m.meta)
          }));
          setMissoes(inicializadas);
          localStorage.setItem(`missoes_${userObj.id}`, JSON.stringify(inicializadas));
        })
        .catch((erro) => {
          console.error("Falha ao consumir o JSON de missões, aplicando fallback local:", erro);
          const dadosLocais = [
            { "id": 1, "titulo": "Beber 1L de água extra", "pontos": 200, "meta": 1000, "unidade": "ml", "tipo": "pendente", "percentual": 0 },
            { "id": 2, "titulo": "Corrida 5km", "pontos": 300, "meta": 5000, "unidade": "metros", "tipo": "pendente", "percentual": 0 },
            { "id": 3, "titulo": "Sessão de Yoga", "pontos": 250, "meta": 45, "unidade": "minutos", "tipo": "pendente", "percentual": 0 },
            { "id": 4, "titulo": "Comer vegetais", "pontos": 200, "meta": 3, "unidade": "porções", "tipo": "pendente", "percentual": 0 },
            { "id": 5, "titulo": "Yoga", "pontos": 250, "meta": 60, "unidade": "minutos", "tipo": "pendente", "percentual": 0 },
            { "id": 6, "titulo": "Corrida leve", "pontos": 300, "meta": 30, "unidade": "minutos", "tipo": "pendente", "percentual": 0 },
            { "id": 7, "titulo": "Academia", "pontos": 300, "meta": 90, "unidade": "minutos", "tipo": "pendente", "percentual": 0 },
            { "id": 8, "titulo": "Caminhada matinal", "pontos": 200, "meta": 40, "unidade": "minutos", "tipo": "pendente", "percentual": 0 },
            { "id": 9, "titulo": "Beber 2L de água", "pontos": 200, "meta": 2000, "unidade": "ml", "tipo": "pendente", "percentual": 0 },
            { "id": 10, "titulo": "Caminhada 30 min", "pontos": 300, "meta": 30, "unidade": "minutos", "tipo": "pendente", "percentual": 0 },
            { "id": 11, "titulo": "Comer 2 frutas", "pontos": 200, "meta": 2, "unidade": "unidades", "tipo": "pendente", "percentual": 0 },
            { "id": 12, "titulo": "Alongamento 10 min", "pontos": 200, "meta": 10, "unidade": "minutos", "tipo": "pendente", "percentual": 0 }
          ];
          const inicializadas = dadosLocais.map(m => ({
            ...m,
            progressoAtual: Math.round((m.percentual / 100) * m.meta)
          }));
          setMissoes(inicializadas);
          localStorage.setItem(`missoes_${userObj.id}`, JSON.stringify(inicializadas));
        });
      }


      const recSalvas = localStorage.getItem(`recompensas_${userObj.id}`);
      if (recSalvas) {
        setRecompensasValendo(JSON.parse(recSalvas));
      }
    }
  }, []);

  const atualizarEGuardarMissoes = (novasMissoes, novasRecompensas = null) => {
    setMissoes(novasMissoes);
    if (usuario) {
      localStorage.setItem(`missoes_${usuario.id}`, JSON.stringify(novasMissoes));
      if (novasRecompensas) {
        setRecompensasValendo(novasRecompensas);
        localStorage.setItem(`recompensas_${usuario.id}`, JSON.stringify(novasRecompensas));
      }
    }
  };

  const handleIniciar = (id) => {
    const totalEmProgresso = missoes.filter(m => m.tipo === "progresso").length;
    if (totalEmProgresso >= 4) {
      alert("Atenção! Você já possui o limite máximo de 4 missões em andamento. Foque em concluir as atuais antes de iniciar novas!");
      return;
    }
    const modificadas = missoes.map(m => m.id === id ? { ...m, tipo: "progresso", status: "Em progresso" } : m);
    atualizarEGuardarMissoes(modificadas);
    setPaginaPendente(0);
  };

  const handleAdicionarProgresso = (id) => {
    const valorAdicionado = Number(inputsProgresso[id]) || 0;
    if (valorAdicionado <= 0) return;

    let recompensasAdicionais = [...recompensasValendo];

    const modificadas = missoes.map(m => {
      if (m.id === id) {
        const novoProgresso = Math.min(m.progressoAtual + valorAdicionado, m.meta);
        const estaConcluida = novoProgresso >= m.meta;

        if (estaConcluida) {
          recompensasAdicionais.push({
            idResgate: Date.now() + Math.random(),
            titulo: m.titulo,
            pontos: m.pontos,
            meta: m.meta,
            unidade: m.unidade,
            atributo: m.atributo
          });

          return {
            ...m,
            progressoAtual: 0,
            percentual: 0,
            tipo: "pendente",
            status: "Pendente"
          };
        }

        return {
          ...m,
          progressoAtual: novoProgresso,
          percentual: Math.round((novoProgresso / m.meta) * 100),
          tipo: "progresso",
          status: "Em progresso"
        };
      }
      return m;
    });

    atualizarEGuardarMissoes(modificadas, recompensasAdicionais);
    setInputsProgresso(prev => ({ ...prev, [id]: "" }));
  };

  const handleColetarPontos = (recompensa) => {
    const usuarioAtualizado = { ...usuario, pontos: (usuario.pontos || 0) + recompensa.pontos };
    setUsuario(usuarioAtualizado);
    localStorage.setItem('user', JSON.stringify(usuarioAtualizado));


    const concluidasSemana = Number(localStorage.getItem(`concluidas_semana_${usuario.id}`)) || 0;
    localStorage.setItem(`concluidas_semana_${usuario.id}`, concluidasSemana + 1);


    const historico = JSON.parse(localStorage.getItem(`historico_resgates_${usuario.id}`)) || [];
    historico.push(recompensa);
    localStorage.setItem(`historico_resgates_${usuario.id}`, JSON.stringify(historico));

    const filtradas = recompensasValendo.filter(r => r.idResgate !== recompensa.idResgate);
    setRecompensasValendo(filtradas);
    localStorage.setItem(`recompensas_${usuario.id}`, JSON.stringify(filtradas));

    alert(`Sucesso! +${recompensa.pontos} pontos creditados.`);
  };

  if (!usuario) return <div className="text-center p-10 text-gray-500">Buscando missões...</div>;

  const tipos = ['concluida', 'progresso', 'pendente'];

  return (
    <main className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="bg-white border-2 border-[#1C9770] rounded-[20px] p-4 flex justify-between items-center mb-8 shadow-sm">
        <span className="text-[#1C9770] font-bold text-xs md:text-base">PROGRAMA DE PREVENÇÃO DE SAÚDE</span>
        <div className="bg-[#1C9770] text-white px-4 py-1.5 rounded-full font-bold text-sm">
          Seus Pontos: {usuario.pontos} ⭐
        </div>
      </div>

      {tipos.map((tipo) => {
        const itensExibidos = tipo === 'concluida' ? recompensasValendo : missoes.filter(m => m.tipo === tipo);
        
        let listaFinal = [];
        if (tipo === 'pendente') {
          listaFinal = itensExibidos;
        } else {
          listaFinal = itensExibidos.slice(0, 4);
        }

        return (
          <div key={tipo} className="mb-10">
            <div className="flex justify-between items-center mb-3 px-2">
              <h3 className="font-bold text-lg capitalize" style={{ color: configAbas[tipo].cardFundo.includes('1C9770') ? '#1C9770' : '#7AD1C3' }}>
                {configAbas[tipo].titulo} 
                {tipo === 'progresso' && <span className="text-xs text-gray-400 font-normal"> (Máx 4 ativas)</span>}
                {tipo === 'concluida' && recompensasValendo.length > 4 && (
                  <span className="text-xs text-orange-500 font-normal ml-2">({recompensasValendo.length - 4} na fila)</span>
                )}
              </h3>
              
              {tipo === 'pendente' && itensExibidos.length > 4 && (
                <div className="hidden md:flex items-center gap-2">
                  <button 
                    disabled={paginaPendente === 0}
                    onClick={() => setPaginaPendente(p => p - 1)}
                    className="px-2 py-1 bg-white border border-[#7AD180] rounded-lg text-xs font-bold text-[#1C9770] hover:bg-gray-50 disabled:opacity-30 transition-all"
                  >
                    &larr; Anterior
                  </button>
                  <span className="text-xs font-medium text-gray-500">
                    {paginaPendente + 1} / {Math.ceil(itensExibidos.length / 4)}
                  </span>
                  <button 
                    disabled={(paginaPendente + 1) * 4 >= itensExibidos.length}
                    onClick={() => setPaginaPendente(p => p + 1)}
                    className="px-2 py-1 bg-white border border-[#7AD180] rounded-lg text-xs font-bold text-[#1C9770] hover:bg-gray-50 disabled:opacity-30 transition-all"
                  >
                    Próximo &rarr;
                  </button>
                </div>
              )}
            </div>

            <section className={`p-5 rounded-[25px] border-2 ${configAbas[tipo].fundo} ${configAbas[tipo].borda} shadow-inner`}>
              {listaFinal.length === 0 ? (
                <p className="text-gray-500 text-xs italic text-center py-4">Nenhuma atividade registrada aqui.</p>
              ) : (
                <div className={`
                  ${tipo === 'progresso' || tipo === 'concluida'
                    ? 'grid grid-cols-2 gap-4 md:grid-cols-4' 
                    : 'flex flex-row overflow-x-auto gap-4 pb-2 md:grid md:grid-cols-4 md:overflow-visible scrollbar-none'
                  }
                `}>
                  
                  {(tipo === 'pendente' && window.innerWidth >= 768 
                    ? listaFinal.slice(paginaPendente * 4, (paginaPendente * 4) + 4) 
                    : listaFinal
                  ).map((item) => (
                    <div 
                      key={tipo === 'concluida' ? item.idResgate : item.id} 
                      className={`
                        p-4 rounded-[18px] text-white flex flex-col items-center justify-between shadow flex-shrink-0 md:w-full 
                        ${tipo === 'progresso' || tipo === 'concluida' ? 'w-full' : 'w-[240px]'} 
                        ${configAbas[tipo].cardFundo}
                      `}
                    >
                      <p className="font-bold text-xs md:text-sm text-center mb-3 min-h-[32px] flex items-center">{item.titulo}</p>
                      <div 
                        className="rounded-full w-16 h-16 flex items-center justify-center mb-3 shadow-sm"
                        style={{ 
                          background: `conic-gradient(#93CB52 ${tipo === 'concluida' ? 100 : item.percentual}%, #e5e7eb ${tipo === 'concluida' ? 100 : item.percentual}%)` 
                        }}
                      >
                        <div className="rounded-full w-[54px] h-[54px] flex flex-col items-center justify-center font-bold text-xs" style={{ backgroundColor: '#1C9770' }}>
                          <span>{tipo === 'concluida' ? '100%' : `${item.percentual}%`}</span>
                        </div>
                      </div>

                      <span className="text-[10px] text-white/90 mb-3 bg-black/10 px-2 py-0.5 rounded-full">
                        {tipo === 'concluida' ? `${item.meta} / ${item.meta}` : `${item.progressoAtual} / ${item.meta}`} {item.unidade}
                      </span>

                      <div className="w-full mt-auto">
                        {tipo === 'pendente' && (
                          <button 
                            onClick={() => handleIniciar(item.id)}
                            className="w-full py-1.5 rounded-full font-bold text-xs bg-white text-[#1C9770] hover:bg-gray-100 transition-all active:scale-95"
                          >
                            Iniciar Atividade
                          </button>
                        )}

                        {tipo === 'progresso' && (
                          <div className="flex flex-col gap-1.5 w-full">
                            <input 
                              type="number" 
                              placeholder={`Valor (${item.unidade})`}
                              value={inputsProgresso[item.id] || ''}
                              onChange={(e) => setInputsProgresso({ ...inputsProgresso, [item.id]: e.target.value })}
                              className="w-full text-center text-gray-900 text-xs p-1.5 rounded-full focus:outline-none"
                            />
                            <button 
                              onClick={() => handleAdicionarProgresso(item.id)}
                              className="w-full py-1.5 rounded-full font-bold text-xs bg-gray-900 text-white hover:bg-black transition-all"
                            >
                              Somar Progresso
                            </button>
                          </div>
                        )}

                        {tipo === 'concluida' && (
                          <button 
                            onClick={() => handleColetarPontos(item)}
                            className="w-full py-1.5 rounded-full font-bold text-xs bg-yellow-400 text-gray-900 hover:bg-yellow-300 shadow-md animate-pulse transition-all"
                          >
                            Resgatar +{item.pontos} Pts
                          </button>
                        )}
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        );
      })}
    </main>
  );
}

export default Missoes;