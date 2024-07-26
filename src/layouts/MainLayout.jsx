import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <div style={{ padding: '3em', paddingTop: '6em' }}>
        <Outlet />
      </div>
    </>
  );
}
