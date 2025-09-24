import { useState } from 'react';
import { HealthCheckRating } from '../types';

type Props = {
  onSubmit: (form: {
    description: string;
    date: string;
    specialist: string;
    healthCheckRating: HealthCheckRating;
    diagnosisCodes?: string[];
  }) => Promise<void>;
  onCancel?: () => void;
};

export default function AddHealthCheckForm({ onSubmit, onCancel }: Props) {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(''); // yyyy-mm-dd
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState(''); // separados por comas
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSending(true);
    try {
      const codes = diagnosisCodes
        .split(',')
        .map(c => c.trim())
        .filter(Boolean);
      await onSubmit({
        description,
        date,
        specialist,
        healthCheckRating: Number(healthCheckRating) as HealthCheckRating,
        diagnosisCodes: codes.length ? codes : undefined,
      });
      // reset tras éxito
      setDescription('');
      setDate('');
      setSpecialist('');
      setHealthCheckRating(0);
      setDiagnosisCodes('');
    } catch (err: any) {
      const msg = err?.response?.data?.error ?? err?.message ?? 'Error adding entry';
      setError(msg);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px dashed #888', padding: 12, marginBottom: 16 }}>
      <h3>New HealthCheck entry</h3>

      {error && (
        <div style={{ background: '#fdeaea', border: '1px solid #e99', color: '#900', padding: 8, marginBottom: 12 }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gap: 8 }}>
        <label>
          Description
          <input value={description} onChange={e => setDescription(e.target.value)} required style={{ width: '100%' }} />
        </label>

        <label>
          Date
          <input type="date" value={date} onChange={e => setDate(e.target.value)} required style={{ width: '100%' }} />
        </label>

        <label>
          Specialist
          <input value={specialist} onChange={e => setSpecialist(e.target.value)} required style={{ width: '100%' }} />
        </label>

        <label>
          HealthCheck rating (0–3)
          <input
            type="number"
            min={0}
            max={3}
            value={healthCheckRating}
            onChange={e => setHealthCheckRating(Number(e.target.value))}
            required
            style={{ width: '100%' }}
          />
        </label>

        <label>
          Diagnosis codes (comma separated)
          <input
            placeholder="Z57.1, M51.2"
            value={diagnosisCodes}
            onChange={e => setDiagnosisCodes(e.target.value)}
            style={{ width: '100%' }}
          />
        </label>
      </div>

      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <button type="button" onClick={onCancel} style={{ background: '#f06', color: '#fff', border: 0, padding: '6px 12px', borderRadius: 4 }}>
          CANCEL
        </button>
        <button type="submit" disabled={sending} style={{ padding: '6px 12px', borderRadius: 4 }}>
          {sending ? 'ADDING…' : 'ADD'}
        </button>
      </div>
    </form>
  );
}
