import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [identificador, setIdentificador] = useState(''); // CPF ou Carteirinha
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if ((identificador === "11111111111" || identificador === "8472A91B5C03") && senha === "Testes123") {
      localStorage.setItem('isLogged', 'true');
      localStorage.setItem('user', JSON.stringify({ nome: "Marina Silva Santos", id: identificador }));
      navigate('/perfil');
    } else {
      alert("Identificador ou senha inválidos.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <form 
        onSubmit={handleLogin} 
        className="border-2 border-[#1C9770] rounded-[40px] p-8 w-[90%] max-w-sm flex flex-col gap-4 bg-white shadow-xl"
      >
        <h2 className="text-[#1C9770] font-bold text-2xl text-center mb-2">Login Care Plus</h2>
        
        <input 
          type="text" 
          placeholder="CPF ou Nº da Carteirinha" 
          className="p-3 border-2 border-[#1C9770] rounded-full text-center focus:outline-none focus:ring-2 focus:ring-[#93CB52]"
          value={identificador}
          onChange={(e) => setIdentificador(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Senha" 
          className="p-3 border-2 border-[#1C9770] rounded-full text-center focus:outline-none focus:ring-2 focus:ring-[#93CB52]"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        
        <button 
          type="submit" 
          className="bg-[#1C9770] text-white py-3 rounded-full font-bold hover:bg-[#93CB52] hover:text-[#1C9770] transition-all"
        >
          Acessar Sistema
        </button>
      </form>
    </div>
  );
}

export default Login;