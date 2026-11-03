import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MobileNavigation from './MobileNavigation';

export default function AppLayout({ status }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-body">
        <Topbar status={status} />
        <main className="app-main">
          <Outlet />
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
}
