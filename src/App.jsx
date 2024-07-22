import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import Start from './pages/Start';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
          <Route index element={<Start />} />
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
