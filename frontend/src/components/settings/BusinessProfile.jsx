import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

export default function BusinessProfile() {
  const [businessName, setBusinessName] = useState('DeniTrack Traders');
  const [businessPhone, setBusinessPhone] = useState('+250 788 123 456');
  const [businessEmail, setBusinessEmail] = useState('info@denitrack.rw');
  const [businessDescription, setBusinessDescription] = useState('Credit management for small businesses.');
  const [saveStatus, setSaveStatus] = useState('idle');

  const handleSave = (event) => {
    event.preventDefault();
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 800);
  };

  return (
    <section className="dt-settings-section">
      <div className="dt-section-header">
        <h2>Business Profile</h2>
        <p>Manage your business details shown on invoices and customer communications.</p>
      </div>

      <Card title="Business Information" padded>
        <form onSubmit={handleSave} className="dt-settings-form">
          <Input
            label="Business name"
            placeholder="e.g. DeniTrack Traders"
            value={businessName}
            onChange={(event) => setBusinessName(event.target.value)}
            required
            autoFocus
          />
          <Input
            label="Business phone"
            type="tel"
            placeholder="+250 788 123 456"
            value={businessPhone}
            onChange={(event) => setBusinessPhone(event.target.value)}
            required
          />
          <Input
            label="Business email (optional)"
            type="email"
            placeholder="info@denitrack.rw"
            value={businessEmail}
            onChange={(event) => setBusinessEmail(event.target.value)}
          />
          <Input
            label="Business description (optional)"
            placeholder="Credit management for small businesses."
            value={businessDescription}
            onChange={(event) => setBusinessDescription(event.target.value)}
          />
          <div className="dt-form-actions">
            {saveStatus === 'success' && (
              <span className="dt-save-feedback">Saved successfully.</span>
            )}
            {saveStatus === 'saving' && (
              <Button variant="primary" type="submit" disabled loading>
                Saving...
              </Button>
            )}
            {saveStatus === 'idle' && (
              <Button variant="primary" type="submit">Save changes</Button>
            )}
          </div>
        </form>
      </Card>
    </section>
  );
}

BusinessProfile.displayName = 'BusinessProfile';
