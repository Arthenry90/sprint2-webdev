import CardMissao from '../components/CardMissao';
import { listaMissoes } from '../data/missoes';

function Missoes() {
  const config = {
    concluida: { fundo: "bg-[#1C9770]/50", frente: "#1C9770", btn: "#93CB52", tituloCor: "#1C9770" },
    progresso: { fundo: "bg-[#7AD1C3]/50", frente: "#7AD1C3", btn: "#93CB52", tituloCor: "#7AD1C3" },
    pendente:  { fundo: "bg-[#95E495]/60", frente: "#7AD180", btn: "#CB5252", tituloCor: "#7AD180" }
  };
  const tipos = ['concluida', 'progresso', 'pendente'];
  

  return (
    <main className="container mx-auto py-8 px-4">

      {tipos.map((tipo) => (
        <div key={tipo} className="mb-8">
        <h3 className="font-bold mb-4 capitalize" style={{ color: config[tipo].tituloCor }}>{tipo}</h3>
        <section key={tipo} className={`p-6 rounded-[20px] mb-8 ${config[tipo].fundo}`}>
          
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
            {listaMissoes.filter(m => m.tipo === tipo).map((m, i) => (
              <CardMissao 
                key={i} 
                titulo={m.titulo} 
                percentual={m.percentual} 
                status={m.status} 
                corBotao={config[tipo].btn}
                corProgresso={config[tipo].btn} 
                corFrente={config[tipo].frente} 
              />
            ))}
          </div>
        </section>
        </div>
      ))}
      
    </main>
  );
}
export default Missoes;