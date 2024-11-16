import {
  FETCH_PROFILE_FAILURE,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from '../../redux/constant';

export interface profileState {
  profile: any;
  loading: boolean;
  profileData: ProfileData | null;
  error: string | null;
}

export type ProfileDetailsComponentProps = {
  loading: boolean;
  profileData: ProfileData | null;
  onDataSubmit: (data: DocumentValues) => void;
};

export type FormValues = {
  dateRangeJoining: string;
  totalExperience: string;
  areaOfExpertise: string;
  currentAddress: string;
  dateRangeBirth: string;
  bloodGroup: { value: string; label: string };
  gender: { value: string; label: string };
  permanentAddress: string;
  aadharNumber: string;
  panNumber: string;
};

export interface ProfileDocumentDetailsProps {
  profileData: ProfileData | null;
  loading: boolean;
  onDataSubmit: (data: DocumentValues) => void;
}

export interface FileInputFieldProps {
  label: string;
  name: 'panCard' | 'aadharCard';
  filePath: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (name: 'panCard' | 'aadharCard') => void;
  error: string | undefined;
}

export type ProfileSection =
  | 'profileDetails'
  | 'bankDetails'
  | 'emergencyContact'
  | 'ProfileDocument';

export interface FetchProfileRequestAction {
  type: typeof FETCH_PROFILE_REQUEST;
}

export interface FetchProfileSuccessAction {
  type: typeof FETCH_PROFILE_SUCCESS;
  payload: ProfileData;
}

export interface FetchProfileFailureAction {
  type: typeof FETCH_PROFILE_FAILURE;
  payload: string;
}

export interface UpdateProfileRequestAction {
  type: typeof UPDATE_PROFILE_REQUEST;
  payload: FormData;
}

export interface UpdateProfileSuccessAction {
  type: typeof UPDATE_PROFILE_SUCCESS;
  payload: ProfileData;
}

export interface UpdateProfileFailureAction {
  type: typeof UPDATE_PROFILE_FAILURE;
  payload: string;
}

export type ProfileActions =
  | FetchProfileRequestAction
  | FetchProfileSuccessAction
  | FetchProfileFailureAction
  | UpdateProfileRequestAction
  | UpdateProfileSuccessAction
  | UpdateProfileFailureAction;

export interface ProfileData {
  message: string;
  data: any;
  basicDetails: {};
  bankDetails: BankDetail;
  emergencyContact: EmergencyContact;
  documentDetails: DocumentValues;
  personalDetail?: {
    profilePic?: string;
    gender: string;
    bloodGroup: string;
    dateOfBirth: string;
    dateOfJoining: string;
    totalExperience: number;
    currentAddress: string;
    permanentAddress: string;
    skills: string[];
  };
  panCard?: { file?: string };
  aadharCard?: { file?: string };
}

export interface EmergencyContact {
  name: string;
  relation: string;
  number: string;
}

export interface ProfileEmergencyProps {
  loading: boolean;
  onDataSubmit: (data: EmergencyContact) => void;
  profileData: ProfileData | null;
}
export type DocumentValues = {
  profilePic: File | null;
  panCard: File | null;
  aadharCard: File | null;
};

export interface BankDetail {
  bankDetail: {
    accountNumber: string;
    accountHolderName: string;
    bankName: string;
    branchName: string;
    ifscCode: string;
  };
}

export interface ProfileBankDetailProps {
  loading: boolean;
  onDataSubmit: (data: BankDetail) => void;
  profileData: ProfileData | null;
}

export interface FileInputProps {
  label: string;
  name: string;
  setFieldValue: (field: string, value: any) => void;
  currentFile: string | null;
  setCurrentFile: any;
  previewUrl: string | null;
  onRemove: () => void;
}

export interface ProfileDocumentDetailsProps {
  profileData: ProfileData | null;
  loading: boolean;
  onDataSubmit: (data: DocumentValues) => void;
}

export interface FileState {
  file: string | null;
  preview: string | null;
}

export interface DocumentFileStates {
  panCard: FileState;
  aadharCard: FileState;
}
