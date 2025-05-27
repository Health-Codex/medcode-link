export type CodeType = 'CPT' | 'ICD-10';

export type CoverageStatus = 'Covered' | 'Not Covered' | 'Conditional';

export type InsuranceType = 'Medicare' | 'Medicaid' | 'Both' | 'Neither';

export interface MedicalCode {
  id: string;
  code: string;
  description: string;
  type: CodeType;
  coverage: {
    status: CoverageStatus;
    insurance: InsuranceType;
    conditions?: string;
  };
  documentation: string[];
  billing: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  organization?: string;
  specialty?: string;
}

export interface ProfileUpdateData {
  name?: string;
  organization?: string;
  specialty?: string;
}