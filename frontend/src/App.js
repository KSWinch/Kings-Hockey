import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './components/Navbar';
import ScoreHeader from './routes/ScoreHeader';

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/' && <ScoreHeader />}
      <Navigation />
      <Outlet />
    </>
  );
}

export default App;
