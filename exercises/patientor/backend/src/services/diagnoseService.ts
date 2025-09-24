import diagnoses from '../data/diagnosesData'; // tu dataset de diagnósticos
import { Diagnosis } from '../types';

const getDiagnoses = (): Diagnosis[] => diagnoses;

export default { getDiagnoses };
