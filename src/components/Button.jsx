import { Link } from 'react-router-dom';

function Button({ to, children }) {
  return (
    <Link 
      to={to} 
      className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition-colors inline-block text-center"
    >
      {children}
    </Link>
  );
}

export default Button;