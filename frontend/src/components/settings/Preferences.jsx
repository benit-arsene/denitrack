import { useState } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';

export default function Preferences() {
  const [currency, setCurrency] = useState('RWF');
  const [timezone, setTimezone] = useState('Africa/Kigali');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [displayDensity, setDisplayDensity] = useState('Comfortable');
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
        <h2>Preferences</h2>
        <p>Configure application display and regional preferences.</p>
      </div>

      <Card title="Regional Preferences" padded>
        <div className="dt-preferences-list">
          <div className="dt-preference-item">
            <div>
              <span className="dt-preference-label">Currency</span>
              <span className="dt-preference-value">{currency} — Rwandan Franc</span>
            </div>
            <select
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
              className="dt-preference-select"
            >
              <option value="RWF">RWF — Rwandan Franc</option>
              <option value="USD">USD — US Dollar</option>
              <option value="EUR">EUR — Euro</option>
              <option value="KES">KES — Kenyan Shilling</option>
              <option value="UGX">UGX — Ugandan Shilling</option>
              <option value="TZS">TZS — Tanzanian Shilling</option>
            </select>
          </div>
          <div className="dt-preference-item">
            <div>
              <span className="dt-preference-label">Timezone</span>
              <span className="dt-preference-value">{timezone}</span>
            </div>
            <select
              value={timezone}
              onChange={(event) => setTimezone(event.target.value)}
              className="dt-preference-select"
            >
              <option value="Africa/Kigali">Africa/Kigali</option>
              <option value="Africa/Nairobi">Africa/Nairobi</option>
              <option value="Africa/Kampala">Africa/Kampala</option>
              <option value="Africa/Dar_es_Salaam">Africa/Dar es Salaam</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
          <div className="dt-preference-item">
            <div>
              <span className="dt-preference-label">Date format</span>
              <span className="dt-preference-value">{dateFormat}</span>
            </div>
            <select
              value={dateFormat}
              onChange={(event) => setDateFormat(event.target.value)}
              className="dt-preference-select"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
          <div className="dt-preference-item">
            <div>
              <span className="dt-preference-label">Display density</span>
              <span className="dt-preference-value">{displayDensity}</span>
            </div>
            <select
              value={displayDensity}
              onChange={(event) => setDisplayDensity(event.target.value)}
              className="dt-preference-select"
            >
              <option value="Comfortable">Comfortable</option>
              <option value="Compact">Compact</option>
            </select>
          </div>
        </div>
        <div className="dt-form-actions">
          {saveStatus === 'success' && (
            <span className="dt-save-feedback">Preferences saved successfully.</span>
          )}
          {saveStatus === 'saving' && (
            <Button variant="primary" disabled loading>Saving...</Button>
          )}
          {saveStatus === 'idle' && (
            <Button variant="primary" onClick={handleSave}>Save changes</Button>
          )}
        </div>
      </Card>

      <div className="dt-info-note">
        <strong>Note:</strong> Currency is used for display only. No currency conversion is performed.
      </div>
    </section>
  );
}

Preferences.displayName = 'Preferences';
