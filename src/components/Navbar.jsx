import { NavLink } from 'react-router-dom';
import logo from '../../src/assets/Careplus_logo.png'

function Navbar() {
  return (
    <header className="m-5">
      <nav className="w-[95%] max-w-[750px] mx-auto h-[60px] flex items-center justify-center border-2 border-[#1C9770] rounded-full px-8 py-3 gap-6">
        
        {/* Logo */}
        <img src={logo} alt="Logo Care Plus" className="h-[100px] w-[100px]" />

        {/* Links */}
        <ul className="flex list-none m-0 gap-5">
          <li>
            <NavLink to="/" className={({isActive}) => isActive ? "text-[#93CB52] font-bold" : "text-[#1C9770] font-bold hover:text-[#93CB52] transition-colors"}>
              Início
            </NavLink>
          </li>
          <li>
            <NavLink to="/missoes" className={({isActive}) => isActive ? "text-[#93CB52] font-bold" : "text-[#1C9770] font-bold hover:text-[#93CB52] transition-colors"}>
              Missões
            </NavLink>
          </li>
          <li>
            <NavLink to="/recompensas" className={({isActive}) => isActive ? "text-[#93CB52] font-bold" : "text-[#1C9770] font-bold hover:text-[#93CB52] transition-colors"}>
              Recompensas
            </NavLink>
          </li>
          <li>
            <NavLink to="/perfil" className={({isActive}) => isActive ? "text-[#93CB52] font-bold" : "text-[#1C9770] font-bold hover:text-[#93CB52] transition-colors"}>
              Perfil
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={({isActive}) => isActive ? "text-[#93CB52] font-bold" : "text-[#1C9770] font-bold hover:text-[#93CB52] transition-colors"}>
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;