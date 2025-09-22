export interface DiagnoseEntry{
    code: string;
    name: string;
    latin?: string;
}

export type DiagnoseEntryWithoutLatin = Omit<DiagnoseEntry, 'latin'>;