import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Footer from './components/Footer';
import Missoes from './pages/Missoes';
import Recompensas from './pages/Recompensas';
import Perfil from './pages/Perfil';
import PrivateRoute from './components/PrivateRoute';
import AvisoLogin from './pages/AvisoLogin';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/aviso-login" element={<AvisoLogin />} />
            <Route path="/" element={<Home />} />      
            <Route path="/login" element={<Login />} />

            <Route path="/missoes" element={<PrivateRoute><Missoes /></PrivateRoute>} />
            <Route path="/recompensas" element={<PrivateRoute><Recompensas /></PrivateRoute>} />
            <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter >
  )
}

export default App
