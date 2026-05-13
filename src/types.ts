export interface FormData {
  // Header / Elector Identification
  electorName: string;
  epicNumber: string;
  acNo: string;
  partNo: string;
  srNo: string;
  
  // Table A
  address: string;
  dob: string; // YYYY-MM-DD format
  aadhaarNo: string;
  mobileNo: string;
  fatherName: string;
  fatherEpic: string;
  motherName: string;
  motherEpic: string;
  spouseName: string;
  spouseEpic: string;

  // Table B (Elector Details)
  bElectorName: string;
  bEpicNo: string;
  bRelativeName: string;
  bRelationship: string;
  bDistrict: string;
  bState: string;
  bAcName: string;
  bAcNumber: string;
  bPartNo: string;
  bSrNo: string;

  // Table C (Relative Details)
  cName: string;
  cEpicNo: string;
  cRelativeName: string;
  cRelationship: string;
  cDistrict: string;
  cState: string;
  cAcName: string;
  cAcNumber: string;
  cPartNo: string;
  cSrNo: string;
  
  // Signature info
  electorSignatureName: string;
  electorRelationship: string;
  date: string;
}

export const initialFormData: FormData = {
  electorName: '',
  epicNumber: '',
  acNo: '',
  partNo: '',
  srNo: '',
  address: '',
  dob: '',
  aadhaarNo: '',
  mobileNo: '',
  fatherName: '',
  fatherEpic: '',
  motherName: '',
  motherEpic: '',
  spouseName: '',
  spouseEpic: '',
  bElectorName: '',
  bEpicNo: '',
  bRelativeName: '',
  bRelationship: '',
  bDistrict: '',
  bState: '',
  bAcName: '',
  bAcNumber: '',
  bPartNo: '',
  bSrNo: '',
  cName: '',
  cEpicNo: '',
  cRelativeName: '',
  cRelationship: '',
  cDistrict: '',
  cState: '',
  cAcName: '',
  cAcNumber: '',
  cPartNo: '',
  cSrNo: '',
  electorSignatureName: '',
  electorRelationship: '',
  date: '',
};

export interface SavedForm {
  id: string;
  name: string;
  data: FormData;
  createdAt: string;
  updatedAt: string;
}
