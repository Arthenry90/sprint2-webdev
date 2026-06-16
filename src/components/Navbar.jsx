import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../../src/assets/Careplus_logo.png';

function Navbar() {
  const [isLogged, setIsLogged] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Verificar se o usuario está logado em sistema
  useEffect(() => {
    const status = localStorage.getItem('isLogged') === 'true';
    setIsLogged(status);
    setMenuAberto(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('isLogged');
    localStorage.removeItem('user');
    setIsLogged(false);
    window.location.href = '/login';
  };

  const linkClasse = ({ isActive }) =>
    isActive
      ? "text-[#93CB52] font-bold text-base transition-colors"
      : "text-[#1C9770] font-bold hover:text-[#93CB52] text-base transition-colors";

  return (
    <header className="m-5">
      <nav className="w-[95%] max-w-[750px] mx-auto h-[60px] flex items-center justify-center border-2 border-[#1C9770] rounded-full px-8 py-3 gap-6">
        <div>
          <NavLink to="/">
            <img src={logo} alt="Logo Care Plus" className="h-[100px] w-[100px]" />
          </NavLink>
        </div>
        <button 
          onClick={() => setMenuAberto(!menuAberto)}
          className="flex flex-col justify-center items-center md:hidden w-9 h-9 gap-1 border-2 border-[#1c9770ff] rounded-md p-1 bg-white hover:bg-red-50 transition-all"
          aria-label="Menu"
        >
          <span className={`h-0.5 w-5 bg-[#1c9770ff] transition-all duration-300 ${menuAberto ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`h-0.5 w-5 bg-[#1c9770ff] transition-all duration-300 ${menuAberto ? 'opacity-0' : ''}`}></span>
          <span className={`h-0.5 w-5 bg-[#1c9770ff] transition-all duration-300 ${menuAberto ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>

        <ul className={`
          absolute right-[2.5%] top-[70px] w-[200px] bg-white border-2 border-[#1c9770ff] rounded-[15px] shadow-xl p-4 flex flex-col gap-4
          transition-all duration-300 ease-in-out
          
          ${menuAberto ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}

          md:static md:w-auto md:bg-transparent md:border-0 md:shadow-none md:p-0 md:flex-row md:gap-5 md:opacity-100 md:visible md:translate-y-0
        `}>
          <li>
            <NavLink to="/" className={({isActive}) => isActive ? "text-[#93CB52] font-bold" : "text-[#1C9770] font-bold hover:text-[#93CB52]"}>Início</NavLink>
          </li>
          <li>
            <NavLink to="/missoes" className={({isActive}) => isActive ? "text-[#93CB52] font-bold" : "text-[#1C9770] font-bold hover:text-[#93CB52]"}>Missões</NavLink>
          </li>
          <li>
            <NavLink to="/recompensas" className={({isActive}) => isActive ? "text-[#93CB52] font-bold" : "text-[#1C9770] font-bold hover:text-[#93CB52]"}>Recompensas</NavLink>
          </li>
          <li>
            <NavLink to="/perfil" className={({isActive}) => isActive ? "text-[#93CB52] font-bold" : "text-[#1C9770] font-bold hover:text-[#93CB52]"}>Perfil</NavLink>
          </li>
          
          <li>
            {isLogged ? (
              <button onClick={handleLogout} className="text-[#1C9770] font-bold hover:text-red-500 transition-colors">
                Logout
              </button>
            ) : (
              <NavLink to="/login" className={({isActive}) => isActive ? "text-[#93CB52] font-bold" : "text-[#1C9770] font-bold hover:text-[#93CB52]"}>
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;