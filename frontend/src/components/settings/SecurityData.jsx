import Card from '../ui/Card';

export default function SecurityData() {
  return (
    <section className="dt-settings-section">
      <div className="dt-section-header">
        <h2>Security &amp; Data</h2>
        <p>Account security and data protection information.</p>
      </div>

      <div className="dt-security-grid">
        <Card title="Account Security" padded>
          <p>No password changes or authentication actions are available in this demo. Backend authentication is not implemented.</p>
        </Card>

        <Card title="Data Protection" padded>
          <p>Customer and transaction data is held in local frontend state only. Data resets on page refresh. No remote storage is configured.</p>
        </Card>

        <Card title="Backup Status" padded>
          <div className="dt-demo-badge" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
            <span>Demo — Not configured</span>
          </div>
          <p style={{ marginTop: 16 }}>Backup is a placeholder for future functionality. No backup process is running and no data is stored remotely.</p>
        </Card>

        <Card title="Password Management" padded>
          <p>Password reset and change functionality is reserved for future implementation.</p>
        </Card>
      </div>
    </section>
  );
}

SecurityData.displayName = 'SecurityData';
