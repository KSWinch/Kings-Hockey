import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider, 
} from "react-router-dom";
import Home from './routes/Home';
import Schedule from './routes/Schedule';
import Navbar from './components/Navbar';
import App from './App';
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home/>,
//   },
//   {
//     path: "/schedule",
//     element: <Schedule/>,
//   }
// ]);

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
          }
      ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} >
      <App />
    </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
