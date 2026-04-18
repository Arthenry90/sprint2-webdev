import Button from '../components/Button';

function Home() {
  return (
    <div className="bg-blue-100 min-h-screen flex flex-col items-center justify-center p-4 gap-10">
      
      <h1 className="text-4xl font-bold text-blue-900 mb-4">
        Olá!
      </h1>

      <p className="text-lg text-slate-700 text-center max-w-sm">
        Este é um teste simples para ver se o Tailwind e o React estão funcionando juntos.
      </p>

    <Button to="/login">Fazer login</Button>

    </div>
  );
}

export default Home;