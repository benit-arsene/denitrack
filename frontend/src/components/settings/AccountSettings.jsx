import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

export default function AccountSettings() {
  const [accountName, setAccountName] = useState('Grace Mukantwari');
  const [accountEmail, setAccountEmail] = useState('grace@denitrack.rw');
  const [accountPhone, setAccountPhone] = useState('+250 788 123 456');
  const [editMode, setEditMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState('idle');

  const handleSave = (event) => {
    event.preventDefault();
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('success');
      setEditMode(false);
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 800);
  };

  const handleCancel = () => {
    setAccountName('Grace Mukantwari');
    setAccountEmail('grace@denitrack.rw');
    setAccountPhone('+250 788 123 456');
    setEditMode(false);
    setSaveStatus('idle');
  };

  return (
    <section className="dt-settings-section">
      <div className="dt-section-header">
        <h2>Account Settings</h2>
        <p>Manage your personal account profile information.</p>
      </div>

      <Card title="Account Profile" padded>
        {editMode ? (
          <form onSubmit={handleSave} className="dt-settings-form">
            <Input
              label="Full name"
              value={accountName}
              onChange={(event) => setAccountName(event.target.value)}
              required
              autoFocus
            />
            <Input
              label="Email address"
              type="email"
              value={accountEmail}
              onChange={(event) => setAccountEmail(event.target.value)}
              required
            />
            <Input
              label="Phone number"
              type="tel"
              value={accountPhone}
              onChange={(event) => setAccountPhone(event.target.value)}
              required
            />
            <div className="dt-form-actions">
              {saveStatus === 'success' && (
                <span className="dt-save-feedback">Profile saved successfully.</span>
              )}
              {saveStatus === 'saving' && (
                <Button variant="primary" type="submit" disabled loading>
                  Saving...
                </Button>
              )}
              {saveStatus === 'idle' && (
                <Button variant="primary" type="submit">Save changes</Button>
              )}
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            </div>
          </form>
        ) : (
          <>
            <div className="dt-account-grid">
              <div className="dt-account-field">
                <span className="dt-account-label">Full name</span>
                <span className="dt-account-value">{accountName}</span>
              </div>
              <div className="dt-account-field">
                <span className="dt-account-label">Email address</span>
                <span className="dt-account-value">{accountEmail}</span>
              </div>
              <div className="dt-account-field">
                <span className="dt-account-label">Phone number</span>
                <span className="dt-account-value">{accountPhone}</span>
              </div>
            </div>
            <div className="dt-form-actions">
              <Button variant="outline" onClick={() => setEditMode(true)}>Edit profile</Button>
            </div>
          </>
        )}
      </Card>
    </section>
  );
}

AccountSettings.displayName = 'AccountSettings';
