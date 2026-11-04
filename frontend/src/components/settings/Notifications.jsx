import { useState } from 'react';
import Card from '../ui/Card';

export default function Notifications() {
  const [paymentReminders, setPaymentReminders] = useState(true);
  const [overdueNotifications, setOverdueNotifications] = useState(true);
  const [newTransactionNotifications, setNewTransactionNotifications] = useState(false);

  return (
    <section className="dt-settings-section">
      <div className="dt-section-header">
        <h2>Notifications</h2>
        <p>Choose which notifications you would like to receive.</p>
      </div>

      <Card title="Notification Preferences" padded>
        <div className="dt-notifications-list">
          <div className="dt-notification-item">
            <div className="dt-notification-info">
              <h3 className="dt-notification-title">Payment reminders</h3>
              <p className="dt-notification-description">Receive reminders when customer payments are due.</p>
            </div>
            <div className="dt-toggle" role="switch" aria-checked={paymentReminders} aria-label="Payment reminders" onClick={() => setPaymentReminders(!paymentReminders)} tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setPaymentReminders(!paymentReminders); } }}>
              <input type="checkbox" checked={paymentReminders} readOnly />
              <span className="dt-toggle-thumb" aria-hidden="true"></span>
            </div>
          </div>
          <div className="dt-notification-item">
            <div className="dt-notification-info">
              <h3 className="dt-notification-title">Overdue account notifications</h3>
              <p className="dt-notification-description">Receive alerts when customer accounts become overdue.</p>
            </div>
            <div className="dt-toggle" role="switch" aria-checked={overdueNotifications} aria-label="Overdue account notifications" onClick={() => setOverdueNotifications(!overdueNotifications)} tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setOverdueNotifications(!overdueNotifications); } }}>
              <input type="checkbox" checked={overdueNotifications} readOnly />
              <span className="dt-toggle-thumb" aria-hidden="true"></span>
            </div>
          </div>
          <div className="dt-notification-item">
            <div className="dt-notification-info">
              <h3 className="dt-notification-title">New transaction notifications</h3>
              <p className="dt-notification-description">Receive alerts when new credit sales or payments are recorded.</p>
            </div>
            <div className="dt-toggle" role="switch" aria-checked={newTransactionNotifications} aria-label="New transaction notifications" onClick={() => setNewTransactionNotifications(!newTransactionNotifications)} tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setNewTransactionNotifications(!newTransactionNotifications); } }}>
              <input type="checkbox" checked={newTransactionNotifications} readOnly />
              <span className="dt-toggle-thumb" aria-hidden="true"></span>
            </div>
          </div>
        </div>
      </Card>

      <div className="dt-info-note">
        <strong>Note:</strong> These are preference controls only. No notification delivery service is configured in this demo.
      </div>
    </section>
  );
}

Notifications.displayName = 'Notifications';
