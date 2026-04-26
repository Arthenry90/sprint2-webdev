import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  // Aqui você busca no localStorage se o usuário está autenticado
  // Exemplo: const isAuthenticated = !!localStorage.getItem('userToken');
  
  // Para este teste, vamos simular uma verificação simples:
  const isAuthenticated = localStorage.getItem('isLogged') === 'true';

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;