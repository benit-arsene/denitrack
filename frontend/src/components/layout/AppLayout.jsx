import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MobileNavigation from './MobileNavigation';

export default function AppLayout({ status, children }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-body">
        <Topbar status={status} />
        <main className="app-main">
          {children}
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
}
