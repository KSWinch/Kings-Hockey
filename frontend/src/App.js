import { Outlet } from 'react-router-dom';
import Navigation from './components/Navbar';
import ScoreHeader from './routes/ScoreHeader';

function App() {
  return (
    <>
      <ScoreHeader />
      <Navigation />
      <Outlet />
    </>
  );
}

export default App;
