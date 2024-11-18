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
import Tasks from './pages/Tasks/Tasks.jsx';
import CreateTask from './pages/CreateTask/CreateTask.jsx';
import { ProjectProvider } from './contexts/ProjectContext.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <ProjectProvider>
          <MainLayout />
        </ProjectProvider>
      </AuthProvider>
    ),
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
        path: 'tasks',

        children: [
          {
            index: true,
            element: <Tasks />,
          },
          {
            path: 'create',
            element: <CreateTask />,
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
  return <RouterProvider router={router} />;
}

export default App;
