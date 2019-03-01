export interface ContractDate {
    month: number;
    contractType: string;
    contractEnd: Date;
    terms: number;
    termsLessChurn: number;
    monthsRemaining: number;
    perUnitTermFee: number;
    totalTermFee: number;
}