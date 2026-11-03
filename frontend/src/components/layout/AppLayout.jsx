import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MobileNavigation from './MobileNavigation';

export default function AppLayout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-body">
        <Topbar />
        <main className="app-main">
          {children}
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
}
