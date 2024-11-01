import { Outlet } from 'react-router-dom';
import Navigation from './components/Navbar';

function App() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default App;
