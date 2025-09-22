import diagnoseData from '../data/diagnosesData';
import { DiagnoseEntryWithoutLatin } from '../types';

import { DiagnoseEntry } from '../types';

const getDiagnoses = (): DiagnoseEntry[] => {
    return diagnoseData;
};

const getNonLatinDiagnoses = (): DiagnoseEntryWithoutLatin[] => {
    return diagnoseData.map(({ code, name }) => ({
        code,
        name
    }));
};

export default {
    getDiagnoses,
    getNonLatinDiagnoses
};