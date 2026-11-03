import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { fetchHealth } from './services/api';
import AppLayout from './components/layout/AppLayout';
import Overview from './pages/Overview';
import Customers from './pages/Customers';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import './App.css';

const STATUS_LOADING = 'loading';
const STATUS_CONNECTED = 'connected';
const STATUS_ERROR = 'error';

export default function App() {
  const [status, setStatus] = useState(STATUS_LOADING);

  useEffect(() => {
    let mounted = true;

    fetchHealth()
      .then(() => {
        if (mounted) {
          setStatus(STATUS_CONNECTED);
        }
      })
      .catch(() => {
        if (mounted) {
          setStatus(STATUS_ERROR);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <BrowserRouter>
      <AppLayout status={status}>
        <Routes>
          <Route path="/" element={<Navigate to="/overview" replace />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
