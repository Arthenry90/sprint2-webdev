import { useState, useEffect } from 'react';
// Importação corrigida para o caminho do arquivo que você me passou
import { listaMissoes } from '../data/missoes';
import mascoteImg from '../assets/MASCOTE _CARE_PLUS.png';

function Home() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const dados = localStorage.getItem('user');
    if (dados) setUsuario(JSON.parse(dados));
  }, []);

  if (!usuario) return null;
  
  const missoesPendentes = listaMissoes.filter(m => m.tipo === 'pendente');

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Lado Esquerdo: Progresso */}
        <section id="progresso">
          <div className="bg-white border-2 border-[#1C9770] rounded-[20px] p-6 shadow-sm h-full max-w-[450px] mx-auto">
            <h2 className="text-xl font-bold text-[#93CB52] text-center mb-6">Progresso</h2>

            <div className="flex items-center mb-6">
              <div className="w-20 h-20 border-[6px] border-[#7AD1C3] rounded-full flex items-center justify-center text-[#7AD1C3] font-bold text-lg">
                75%
              </div>
              <div className="ml-4 flex-grow">
                <p className="text-sm text-gray-500 mb-0">Progresso Semanal</p>
                <hr className="my-1 border-gray-200" />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-700 mb-3 text-center">Missões não iniciadas</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {missoesPendentes.map((m, i) => (
                  <button 
                    key={i} 
                    className="bg-[#1C9770] text-white text-[10px] py-2 px-3 rounded-[10px] font-bold hover:bg-[#93CB52] transition-colors min-w-[100px]"
                  >
                    {m.titulo}
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-gray-200 p-4 rounded bg-gray-50 text-center">
              <h4 className="text-xs font-bold text-gray-600 mb-1">Metas de Saúde</h4>
              <p className="text-[10px] text-gray-400">(Espaço para gráfico dinâmico)</p>
            </div>
          </div>
        </section>

        {/* Lado Direito: Mascote e Status */}
        <div className="flex flex-col gap-6">
          
          <section id="mascote">
            <div className="bg-white border-2 border-[#1C9770] rounded-[20px] p-6 shadow-sm flex justify-center items-center">
              <figure className="m-0">
                <img 
                  src={mascoteImg} 
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
                  { label: "SAÚDE", valor: 60 },
                  { label: "RESISTÊNCIA", valor: 40 },
                  { label: "FORÇA", valor: 50 },
                  { label: "AGILIDADE", valor: 80 }
                ].map((status, idx) => (
                  <div key={idx}>
                    <label className="text-[10px] font-bold text-gray-700 block mb-1">{status.label}</label>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#1C9770]" 
                        style={{ width: `${status.valor}%` }}
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