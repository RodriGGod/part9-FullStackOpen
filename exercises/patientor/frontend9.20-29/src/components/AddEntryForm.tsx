import { useMemo, useState } from 'react';
import {
  Diagnosis,
  HealthCheckRating,
  NewEntryFormValues,
} from '../types';
import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  InputLabel,
  FormControl,
  OutlinedInput,
  Chip,
  Alert,
} from '@mui/material';

type Props = {
  diagnoses: Diagnosis[];
  onSubmit: (values: NewEntryFormValues) => Promise<void>;
  onCancel?: () => void;
};

type EntryType = 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';

const isISO = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);

export default function AddEntryForm({ diagnoses, onSubmit, onCancel }: Props) {
  const [type, setType] = useState<EntryType>('HealthCheck');

  // comunes
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [codes, setCodes] = useState<string[]>([]);

  // HealthCheck
  const [rating, setRating] = useState<number>(0);

  // Hospital
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  // Occupational
  const [employerName, setEmployerName] = useState('');
  const [slStart, setSlStart] = useState('');
  const [slEnd, setSlEnd] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const codeOptions = useMemo(() => diagnoses.map(d => d.code), [diagnoses]);

  const handleCodesChange = (e: SelectChangeEvent<string[]>) => {
    const v = e.target.value;
    setCodes(typeof v === 'string' ? v.split(',') : v);
  };

  const validate = (): string | null => {
    if (!description.trim()) return 'Description is required';
    if (!date || !isISO(date)) return 'Date must be yyyy-mm-dd';
    if (!specialist.trim()) return 'Specialist is required';

    if (type === 'HealthCheck') {
      const n = Number(rating);
      if (!(n >= 0 && n <= 3)) return 'HealthCheckRating must be 0-3';
    }

    if (type === 'Hospital') {
      if (!dischargeDate || !isISO(dischargeDate)) return 'Discharge date must be yyyy-mm-dd';
      if (!dischargeCriteria.trim()) return 'Discharge criteria is required';
    }

    if (type === 'OccupationalHealthcare') {
      if (!employerName.trim()) return 'Employer name is required';
      if ((slStart && !isISO(slStart)) || (slEnd && !isISO(slEnd))) {
        return 'Sick leave dates must be yyyy-mm-dd';
      }
    }
    return null;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const msg = validate();
    if (msg) { setError(msg); return; }

    setError(null);
    setSending(true);
    try {
      let payload: NewEntryFormValues;
      const base = {
        description,
        date,
        specialist,
        diagnosisCodes: codes.length ? codes : undefined,
      };

      switch (type) {
        case 'HealthCheck':
          payload = { type, ...base, healthCheckRating: rating as HealthCheckRating };
          break;
        case 'Hospital':
          payload = {
            type,
            ...base,
            discharge: { date: dischargeDate, criteria: dischargeCriteria },
          };
          break;
        case 'OccupationalHealthcare':
          payload = {
            type,
            ...base,
            employerName,
            ...(slStart && slEnd ? { sickLeave: { startDate: slStart, endDate: slEnd } } : {}),
          };
          break;
        default:
          return;
      }

      await onSubmit(payload);

      // reset tras éxito (dejamos type como está)
      setDescription('');
      setDate('');
      setSpecialist('');
      setCodes([]);
      setRating(0);
      setDischargeDate('');
      setDischargeCriteria('');
      setEmployerName('');
      setSlStart('');
      setSlEnd('');
    } catch (err: any) {
      const msg = err?.response?.data?.error ?? err?.message ?? 'Error adding entry';
      setError(msg);
    } finally {
      setSending(false);
    }
  };

  return (
    <Box component="form" onSubmit={submit} sx={{ p: 2, border: '1px dashed #999', mb: 3, borderRadius: 2 }}>
      <h3>New entry</h3>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box sx={{ display: 'grid', gap: 2 }}>
        {/* Tipo */}
        <FormControl>
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value as EntryType)}
            input={<OutlinedInput label="Type" />}
          >
            <MenuItem value="HealthCheck">HealthCheck</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
          </Select>
        </FormControl>

        {/* Comunes */}
        <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <TextField label="Date" type="date" InputLabelProps={{ shrink: true }} value={date} onChange={e => setDate(e.target.value)} />
        <TextField label="Specialist" value={specialist} onChange={e => setSpecialist(e.target.value)} />

        {/* Diagnosis codes multiple select */}
        <FormControl>
          <InputLabel id="codes-label">Diagnosis codes</InputLabel>
          <Select
            multiple
            labelId="codes-label"
            value={codes}
            onChange={handleCodesChange}
            input={<OutlinedInput label="Diagnosis codes" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((v) => <Chip key={v} label={v} />)}
              </Box>
            )}
          >
            {codeOptions.map(code => (
              <MenuItem key={code} value={code}>{code}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Campos por tipo */}
        {type === 'HealthCheck' && (
          <TextField
            label="HealthCheck rating (0–3)"
            type="number"
            inputProps={{ min: 0, max: 3 }}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
        )}

        {type === 'Hospital' && (
          <>
            <TextField label="Discharge date" type="date" InputLabelProps={{ shrink: true }} value={dischargeDate} onChange={e => setDischargeDate(e.target.value)} />
            <TextField label="Discharge criteria" value={dischargeCriteria} onChange={e => setDischargeCriteria(e.target.value)} />
          </>
        )}

        {type === 'OccupationalHealthcare' && (
          <>
            <TextField label="Employer name" value={employerName} onChange={e => setEmployerName(e.target.value)} />
            <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr' }, gap: 2 }}>
              <TextField label="Sick leave start" type="date" InputLabelProps={{ shrink: true }} value={slStart} onChange={e => setSlStart(e.target.value)} />
              <TextField label="Sick leave end" type="date" InputLabelProps={{ shrink: true }} value={slEnd} onChange={e => setSlEnd(e.target.value)} />
            </Box>
          </>
        )}
      </Box>

      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        <Button variant="contained" color="inherit" onClick={onCancel}>Cancel</Button>
        <Button variant="contained" type="submit" disabled={sending}>
          {sending ? 'Adding…' : 'Add'}
        </Button>
      </Box>
    </Box>
  );
}
