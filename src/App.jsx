import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import ErrorPage from './pages/ErrorPage';
import About from './pages/About';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import MainLayout from './layouts/MainLayout';
import CreateProject from './pages/CreateProject/CreateProject.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import ProtectedRoute from './layouts/ProtectedRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <About />,
      },
      {
        path: 'projects',
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: 'create',
            element: <CreateProject />,
          },
        ],
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
