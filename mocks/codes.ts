import { MedicalCode } from '@/types';

export const mockCodes: MedicalCode[] = [
  {
    id: '1',
    code: '99213',
    description: 'Office or other outpatient visit for the evaluation and management of an established patient, which requires a medically appropriate history and/or examination and low level of medical decision making.',
    type: 'CPT',
    coverage: {
      status: 'Covered',
      insurance: 'Both',
    },
    documentation: [
      'Patient history documentation',
      'Physical examination notes',
      'Medical decision making rationale',
      'Time spent with patient (if applicable)'
    ],
    billing: [
      'Verify patient eligibility',
      'Use appropriate modifier if necessary',
      'Include diagnosis code',
      'Submit within timely filing limits'
    ]
  },
  {
    id: '2',
    code: '99214',
    description: 'Office or other outpatient visit for the evaluation and management of an established patient, which requires a medically appropriate history and/or examination and moderate level of medical decision making.',
    type: 'CPT',
    coverage: {
      status: 'Covered',
      insurance: 'Both',
    },
    documentation: [
      'Detailed patient history',
      'Comprehensive examination',
      'Moderate complexity medical decision making',
      'Time documentation if counseling exceeds 50% of visit'
    ],
    billing: [
      'Verify patient eligibility',
      'Ensure documentation supports level of service',
      'Include appropriate diagnosis codes',
      'Submit with required modifiers if applicable'
    ]
  },
  {
    id: '3',
    code: 'E11.9',
    description: 'Type 2 diabetes mellitus without complications',
    type: 'ICD-10',
    coverage: {
      status: 'Covered',
      insurance: 'Both',
    },
    documentation: [
      'Diabetes diagnosis confirmation',
      'Blood glucose levels',
      'HbA1c results',
      'Treatment plan documentation'
    ],
    billing: [
      'Use as primary or secondary diagnosis',
      'Include complications if present',
      'Link to appropriate procedure codes',
      'Verify coverage requirements'
    ]
  },
  {
    id: '4',
    code: '97110',
    description: 'Therapeutic procedure, 1 or more areas, each 15 minutes; therapeutic exercises to develop strength and endurance, range of motion and flexibility',
    type: 'CPT',
    coverage: {
      status: 'Conditional',
      insurance: 'Medicare',
      conditions: 'Requires prior authorization and physician referral'
    },
    documentation: [
      'Physician referral or prescription',
      'Initial evaluation findings',
      'Treatment goals and plan',
      'Progress notes for each session'
    ],
    billing: [
      'Obtain prior authorization',
      'Bill in 15-minute increments',
      'Include appropriate modifiers',
      'Document medical necessity'
    ]
  },
  {
    id: '5',
    code: 'I10',
    description: 'Essential (primary) hypertension',
    type: 'ICD-10',
    coverage: {
      status: 'Covered',
      insurance: 'Both',
    },
    documentation: [
      'Blood pressure readings',
      'Hypertension diagnosis',
      'Risk factors assessment',
      'Treatment response monitoring'
    ],
    billing: [
      'Use as primary diagnosis when appropriate',
      'Include secondary conditions',
      'Link to monitoring procedures',
      'Document treatment compliance'
    ]
  },
  {
    id: '6',
    code: '90834',
    description: 'Psychotherapy, 45 minutes with patient',
    type: 'CPT',
    coverage: {
      status: 'Conditional',
      insurance: 'Both',
      conditions: 'Requires mental health diagnosis and treatment plan'
    },
    documentation: [
      'Mental health diagnosis',
      'Treatment plan',
      'Session notes',
      'Progress assessment'
    ],
    billing: [
      'Verify mental health benefits',
      'Include appropriate diagnosis',
      'Document session duration',
      'Submit with required modifiers'
    ]
  },
  {
    id: '7',
    code: '71020',
    description: 'Radiologic examination, chest, 2 views, frontal and lateral',
    type: 'CPT',
    coverage: {
      status: 'Covered',
      insurance: 'Both',
    },
    documentation: [
      'Clinical indication for imaging',
      'Radiologist interpretation',
      'Comparison with prior studies',
      'Findings and recommendations'
    ],
    billing: [
      'Include clinical indication',
      'Verify facility vs professional billing',
      'Use appropriate modifiers',
      'Submit with supporting documentation'
    ]
  },
  {
    id: '8',
    code: 'Z00.00',
    description: 'Encounter for general adult medical examination without abnormal findings',
    type: 'ICD-10',
    coverage: {
      status: 'Covered',
      insurance: 'Both',
    },
    documentation: [
      'Comprehensive history',
      'Physical examination findings',
      'Preventive care counseling',
      'Screening test results'
    ],
    billing: [
      'Use for preventive visits',
      'Include age-appropriate screenings',
      'Document counseling provided',
      'Link to preventive services'
    ]
  },
  {
    id: '9',
    code: '36415',
    description: 'Collection of venous blood by venipuncture',
    type: 'CPT',
    coverage: {
      status: 'Covered',
      insurance: 'Both',
    },
    documentation: [
      'Order for blood work',
      'Collection site documentation',
      'Patient identification verification',
      'Specimen handling notes'
    ],
    billing: [
      'Bill with laboratory codes',
      'Include collection date',
      'Verify coverage for tests ordered',
      'Use appropriate modifiers'
    ]
  },
  {
    id: '10',
    code: 'M79.3',
    description: 'Panniculitis, unspecified',
    type: 'ICD-10',
    coverage: {
      status: 'Not Covered',
      insurance: 'Neither',
    },
    documentation: [
      'Clinical examination findings',
      'Biopsy results if performed',
      'Differential diagnosis consideration',
      'Treatment plan'
    ],
    billing: [
      'Verify coverage before treatment',
      'Consider alternative diagnoses',
      'Document medical necessity',
      'Inform patient of coverage status'
    ]
  },
  {
    id: '11',
    code: '99215',
    description: 'Office or other outpatient visit for the evaluation and management of an established patient, which requires a medically appropriate history and/or examination and high level of medical decision making.',
    type: 'CPT',
    coverage: {
      status: 'Covered',
      insurance: 'Both',
    },
    documentation: [
      'Comprehensive history',
      'Detailed examination',
      'High complexity medical decision making',
      'Time documentation if counseling predominates'
    ],
    billing: [
      'Ensure documentation supports complexity',
      'Include all relevant diagnoses',
      'Use time-based billing if appropriate',
      'Verify patient eligibility'
    ]
  },
  {
    id: '12',
    code: 'J44.1',
    description: 'Chronic obstructive pulmonary disease with acute exacerbation',
    type: 'ICD-10',
    coverage: {
      status: 'Covered',
      insurance: 'Both',
    },
    documentation: [
      'COPD diagnosis confirmation',
      'Exacerbation symptoms',
      'Pulmonary function tests',
      'Treatment response'
    ],
    billing: [
      'Use for acute episodes',
      'Include severity indicators',
      'Link to respiratory treatments',
      'Document hospitalization if applicable'
    ]
  },
  {
    id: '13',
    code: '93000',
    description: 'Electrocardiogram, routine ECG with at least 12 leads; with interpretation and report',
    type: 'CPT',
    coverage: {
      status: 'Covered',
      insurance: 'Both',
    },
    documentation: [
      'Clinical indication for ECG',
      'ECG interpretation',
      'Comparison with prior ECGs',
      'Clinical correlation'
    ],
    billing: [
      'Include interpretation component',
      'Document medical necessity',
      'Use appropriate modifiers',
      'Verify facility vs professional billing'
    ]
  },
  {
    id: '14',
    code: 'F32.9',
    description: 'Major depressive disorder, single episode, unspecified',
    type: 'ICD-10',
    coverage: {
      status: 'Covered',
      insurance: 'Both',
    },
    documentation: [
      'Depression screening results',
      'Symptom assessment',
      'Functional impairment evaluation',
      'Treatment plan'
    ],
    billing: [
      'Use for initial episodes',
      'Include severity specifiers',
      'Link to mental health services',
      'Document treatment response'
    ]
  },
  {
    id: '15',
    code: '45378',
    description: 'Colonoscopy, flexible; diagnostic, including collection of specimen(s) by brushing or washing, when performed',
    type: 'CPT',
    coverage: {
      status: 'Covered',
      insurance: 'Both',
    },
    documentation: [
      'Indication for colonoscopy',
      'Procedure findings',
      'Pathology results if applicable',
      'Follow-up recommendations'
    ],
    billing: [
      'Include all procedures performed',
      'Use appropriate modifiers',
      'Document screening vs diagnostic',
      'Submit with pathology codes if applicable'
    ]
  }
];