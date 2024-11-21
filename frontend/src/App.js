import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './components/Navbar';
import ScoreHeader from './routes/ScoreHeader';
import ScrollToTopButton from './components/ScrollToTopButton';

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/' && <ScoreHeader />}

      <Navigation />

      <Outlet />

      <ScrollToTopButton />
    </>
  );
}

export default App;
