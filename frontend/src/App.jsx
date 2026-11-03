import { useEffect, useState } from 'react';
import { fetchHealth } from './services/api';
import './App.css';

const STATUS_LOADING = 'loading';
const STATUS_CONNECTED = 'connected';
const STATUS_ERROR = 'error';

function statusLabel(status) {
  switch (status) {
    case STATUS_LOADING:
      return 'Connecting to API...';
    case STATUS_CONNECTED:
      return 'Connected';
    case STATUS_ERROR:
      return 'Connection error';
    default:
      return 'Initializing';
  }
}

function App() {
  const [status, setStatus] = useState(STATUS_LOADING);
  const [health, setHealth] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    fetchHealth()
      .then((data) => {
        if (mounted) {
          setStatus(STATUS_CONNECTED);
          setHealth(data);
        }
      })
      .catch((err) => {
        if (mounted) {
          setStatus(STATUS_ERROR);
          setError(err.message);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="app">
      <header className="header">
        <div className="container">
          <h1>DeniTrack</h1>
          <p className="tagline">A smarter way to manage your business credit.</p>
        </div>
      </header>

      <section className="status-section">
        <div className="container">
          <h2>API Connection</h2>
          <div className={`status-indicator status-${status}`} role="status" aria-live="polite">
            <span className="status-dot" aria-hidden="true"></span>
            <span className="status-text">{statusLabel(status)}</span>
          </div>

          {status === STATUS_CONNECTED && health && (
            <pre className="health-json" aria-label="API health response">
              {JSON.stringify(health, null, 2)}
            </pre>
          )}

          {status === STATUS_ERROR && error && (
            <p className="error-text">{error}</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
