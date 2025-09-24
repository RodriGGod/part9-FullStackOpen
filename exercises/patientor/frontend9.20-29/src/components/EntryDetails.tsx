import { Entry, Diagnosis, HealthCheckRating } from '../types';

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import FavoriteIcon from '@mui/icons-material/Favorite';

type Props = {
  entry: Entry;
  diagMap: Record<string, Diagnosis>;
};

function assertNever(value: never): never {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
}

function DiagnosisList({
  codes,
  diagMap,
}: {
  codes?: Array<Diagnosis['code']>;
  diagMap: Record<string, Diagnosis>;
}) {
  if (!codes || codes.length === 0) return null;
  return (
    <ul style={{ marginTop: 8 }}>
      {codes.map((code) => (
        <li key={code}>
          {code} {diagMap[code]?.name ? `— ${diagMap[code].name}` : ''}
        </li>
      ))}
    </ul>
  );
}

function HealthCheckHeart({ rating }: { rating: HealthCheckRating }) {
  const color =
    rating === HealthCheckRating.Healthy
      ? 'green'
      : rating === HealthCheckRating.LowRisk
      ? 'gold'
      : rating === HealthCheckRating.HighRisk
      ? 'orange'
      : 'red';
  return <FavoriteIcon style={{ color }} />;
}

export default function EntryDetails({ entry, diagMap }: Props) {
  const cardStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  };

  switch (entry.type) {
    case 'Hospital':
      return (
        <li style={cardStyle}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <b>{entry.date}</b> <LocalHospitalIcon />
          </div>
          <em>{entry.description}</em>
          <DiagnosisList codes={entry.diagnosisCodes} diagMap={diagMap} />
          <div style={{ marginTop: 8 }}>
            <small>
              discharge: {entry.discharge.date} — {entry.discharge.criteria}
            </small>
          </div>
          <div>
            <small>diagnose by {entry.specialist}</small>
          </div>
        </li>
      );

    case 'OccupationalHealthcare':
      return (
        <li style={cardStyle}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <b>{entry.date}</b> <WorkIcon /> <span>{entry.employerName}</span>
          </div>
          <em>{entry.description}</em>
          <DiagnosisList codes={entry.diagnosisCodes} diagMap={diagMap} />
          {entry.sickLeave && (
            <div style={{ marginTop: 8 }}>
              <small>
                sick leave: {entry.sickLeave.startDate} → {entry.sickLeave.endDate}
              </small>
            </div>
          )}
          <div>
            <small>diagnose by {entry.specialist}</small>
          </div>
        </li>
      );

    case 'HealthCheck':
      return (
        <li style={cardStyle}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <b>{entry.date}</b> <MedicalInformationIcon />
          </div>
          <em>{entry.description}</em>
          <div style={{ marginTop: 8 }}>
            <HealthCheckHeart rating={entry.healthCheckRating} />
          </div>
          <DiagnosisList codes={entry.diagnosisCodes} diagMap={diagMap} />
          <div>
            <small>diagnose by {entry.specialist}</small>
          </div>
        </li>
      );

    default:

      return assertNever(entry);
  }
}
