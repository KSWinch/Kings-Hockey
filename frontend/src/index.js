import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/Home';
import Schedule from './routes/Schedule';
import Stats from './routes/Stats';
import App from './App';
import Attendance from './routes/Attendance';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'schedule',
        element: <Schedule />,
      },
      {
        path: 'schedule/attendance/:id',
        element: <Attendance />,
      },
      {
        path: 'stats',
        element: <Stats />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);
