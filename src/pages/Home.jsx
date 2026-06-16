import { useState, useEffect } from 'react';
import { listaMissoes } from '../data/missoes';
import mascoteImg from '../assets/MASCOTE_CARE_PLUS.png';
import mascoteSaudavel from '../assets/MASCOTE_SAUDAVEL.png';
import mascoteDoente from '../assets/MASCOTE_DOENTE.png';

function Home() {
  const [usuario, setUsuario] = useState(null);
  const [missoesReativas, setMissoesReativas] = useState([]);
  // Sincronizado os valores iniciais com os valores base de design (60, 40, 50, 80)
  const [statusValores, setStatusValores] = useState({ SAÚDE: 60, RESISTÊNCIA: 40, FORÇA: 50, AGILIDADE: 80 });
  const [bonecoImagem, setBonecoImagem] = useState(mascoteImg);

  useEffect(() => {
    const dados = localStorage.getItem('user');
    if (dados) {
      const userObj = JSON.parse(dados);
      setUsuario(userObj);
      const salvas = localStorage.getItem(`missoes_${userObj.id}`);
      
      if (salvas) {
        const listaAtual = JSON.parse(salvas);
        setMissoesReativas(listaAtual);
        calcularEstadoEspecifico(listaAtual, userObj.id);
      } else {
        setMissoesReativas(listaMissoes);
        calcularEstadoEspecifico(listaMissoes, userObj.id);
      }
    }
  }, []);

  const calcularEstadoEspecifico = (listaAtividades, userId) => {
    let imagemDefinitiva = mascoteImg;
    const umaSemanaAtras = Date.now() - (7 * 24 * 60 * 60 * 1000);
    
    const temMissaoNegligenciada = listaAtividades.some(m => 
      m.tipo === 'progresso' && m.dataInicio && m.dataInicio < umaSemanaAtras
    );

    const totalConcluidasSemana = Number(localStorage.getItem(`concluidas_semana_${userId}`)) || 0;

    if (temMissaoNegligenciada) {
      imagemDefinitiva = mascoteDoente;
    } else if (totalConcluidasSemana >= 6) {
      imagemDefinitiva = mascoteSaudavel;
    } else {
      imagemDefinitiva = mascoteImg;
    }
    setBonecoImagem(imagemDefinitiva);

    const historicoResgates = JSON.parse(localStorage.getItem(`historico_resgates_${userId}`)) || [];
    
    let saude = 60;
    let resistencia = 40;
    let forca = 50;
    let agilidade = 80;

    historicoResgates.forEach(m => {
      if (m.atributo === 'FORÇA') forca += 5;
      if (m.atributo === 'RESISTÊNCIA') resistencia += 5;
      if (m.atributo === 'AGILIDADE') agilidade += 5;
      if (m.atributo === 'SAÚDE') saude += 5;
    });

    setStatusValores({
      SAÚDE: Math.min(saude, 100),
      RESISTÊNCIA: Math.min(resistencia, 100),
      FORÇA: Math.min(forca, 100),
      AGILIDADE: Math.min(agilidade, 100)
    });
  };

  if (!usuario) return null;
  
  const missoesPendentes = missoesReativas.filter(m => m.tipo === 'pendente');
  const missoesEmProgresso = missoesReativas.filter(m => m.tipo === 'progresso');
  const pendentesLimitadas = missoesPendentes.slice(0, 4);
  const mediaProgresso = missoesEmProgresso.length > 0 
    ? Math.round(missoesEmProgresso.reduce((acc, m) => acc + m.percentual, 0) / missoesEmProgresso.length)
    : 0;

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Lado Esquerdo: Progresso */}
        <section id="progresso">
          <div className="bg-white border-2 border-[#1C9770] rounded-[20px] p-6 shadow-sm h-full max-w-[450px] mx-auto">
            <h2 className="text-xl font-bold text-[#93CB52] text-center mb-6">Progresso</h2>

            <div className="flex items-center gap-5 mb-8">
              <div 
                className="rounded-full w-24 h-24 flex items-center justify-center shadow-md"
                style={{ 
                  background: `conic-gradient(#1C9770 ${mediaProgresso}%, #f3f4f6 ${mediaProgresso}%)` 
                }}
              >
                <div className="bg-white rounded-full w-[76px] h-[76px] flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#1C9770]">
                    {mediaProgresso}%
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-gray-600 font-medium border-b border-gray-100 pb-1">
                  Progresso de missões
                </h3>
                <p className="text-[10px] text-gray-400 mt-1 italic">
                  Média concluída de todas as missões em progresso
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-700 mb-3 text-center">Missões não iniciadas</h3>
              <div className="grid grid-cols-2 gap-3 justify-items-center">
                {pendentesLimitadas.map((m, i) => (
                  <button 
                    key={i} 
                    className="bg-[#1C9770] text-white text-[10px] py-3 px-3 rounded-[12px] font-bold hover:bg-[#93CB52] transition-colors w-full max-w-[160px] h-[45px] flex items-center justify-center text-center"
                  >
                    {m.titulo}
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-gray-200 p-4 rounded bg-gray-50 text-center">
              <h4 className="text-[10px] font-bold text-[#1C9770] mb-4 uppercase">Desempenho de Missões</h4>
              
              <div className="flex items-end justify-around h-[120px] px-2 rounded-lg">
                {missoesEmProgresso.map((missao, index) => (
                  <div key={index} className="flex flex-col items-center w-full group relative h-full justify-end">
                    
                    <div className="opacity-0 group-hover:opacity-100 absolute top-0 transition-opacity text-[8px] font-bold text-[#1C9770]">
                      {missao.percentual}%
                    </div>

                    <div 
                      className="w-6 rounded-t-md transition-all duration-500 ease-out shadow-sm"
                      style={{ 
                        height: `${missao.percentual}%`, 
                        backgroundColor: '#c7cb52',
                        minHeight: '2px'
                      }}
                    ></div>

                    <span className="text-[8px] font-bold text-gray-500 mt-2 truncate w-full px-1">
                      {missao.titulo}
                    </span>

                    <span className="text-[9px] font-bold text-gray-400">
                      {missao.percentual}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Lado Direito: Mascote e Status */}
        <div className="flex flex-col gap-6">
          
          <section id="mascote">
            <div className="bg-white border-2 border-[#1C9770] rounded-[20px] p-6 shadow-sm flex justify-center items-center">
              <figure className="m-0">
                <img 
                  src={bonecoImagem} 
                  alt="Mascote Careplus" 
                  className="max-h-[250px] object-contain hover:scale-105 transition-transform duration-300"
                />
              </figure>
            </div>
          </section>

          <section id="usuario-status">
            <div className="bg-white border-2 border-[#1C9770] rounded-[20px] p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#1C9770] mb-6 text-center">Status</h3>
              
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {[
                  { label: "SAÚDE" },
                  { label: "RESISTÊNCIA" },
                  { label: "FORÇA" },
                  { label: "AGILIDADE" }
                ].map((status, idx) => (
                  <div key={idx}>
                    <label className="text-[10px] font-bold text-gray-700 block mb-1">{status.label}</label>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#1C9770] transition-all duration-500 ease-out" 
                        style={{ width: `${statusValores[status.label]}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Home;