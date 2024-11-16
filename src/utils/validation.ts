import * as Yup from 'yup';

export const LoginValidation = Yup.object({
  username: Yup.string()
    .trim()
    .min(8, 'username minimum length should be 8')
    .email('Invalid email & username format')
    .required('User name is required'),
  password: Yup.string()
    .min(8, 'Password minimum length should be 8')
    .required('Password is Required'),
});

export const forgotPasswordValidation = Yup.object({
  email: Yup.string()
    .trim()
    .email('Enter valid email')
    .required('Email is Required'),
});

export const ChangePasswordValidationScheme = Yup.object({
  oldPassword: Yup.string().required('Old password required'),
  newPassword: Yup.string()
    .min(8, 'Password minimum length should be 8')
    .required('New password required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match with new password')
    .required('Confirm password required'),
});

export const projectValidation = Yup.object().shape({
  addProject: Yup.string().required('project name is required'),
});

export const companyAddEditValidation = Yup.object().shape({
  companyName: Yup.string()
    .min(2, 'Company Name must be at least 2 characters long')
    .max(100, 'Company Name cannot exceed 100 characters')
    .required('Company Name is required'),

  companyEmail: Yup.string()
    .email('Invalid email format')
    .required('Company Email is required'),

  companyPhone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Company Phone No. must be exactly 10 digits')
    .required('Company Phone No. is required'),

  companyAddress: Yup.string()
    .min(5, 'Company Address must be at least 5 characters long')
    .required('Company Address is required'),

  companyWebsite: Yup.string()
    .matches(
      /^(www\.)[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/,
      'Invalid website format, must start with "www."'
    )
    .required('Company Website is required'),

  firstName: Yup.string()
    .min(2, 'First Name must be at least 2 characters long')
    .max(50, 'First Name cannot exceed 50 characters')
    .required('First Name is required'),

  lastName: Yup.string()
    .min(2, 'Last Name must be at least 2 characters long')
    .max(50, 'Last Name cannot exceed 50 characters')
    .required('Last Name is required'),

  designation: Yup.string()
    .min(2, 'Designation must be at least 2 characters long')
    .max(100, 'Designation cannot exceed 100 characters')
    .required('Designation is required'),

  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone must be exactly 10 digits')
    .required('Phone is required'),
  role: Yup.mixed().required('Please select a role'),

  empCode: Yup.string()
    .matches(
      /^[A-Za-z0-9]{6,10}$/,
      'Employee Code must be alphanumeric and between 6 and 10 characters'
    )
    .required('Employee Code is required'),
});

export const uservalidation = () =>
  Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'First Name must be at least 2 characters long')
      .max(50, 'First Name cannot exceed 50 characters')
      .required('First Name is required'),

    lastName: Yup.string()
      .min(2, 'Last Name must be at least 2 characters long')
      .max(50, 'Last Name cannot exceed 50 characters')
      .required('Last Name is required'),

    empCode: Yup.string()
      .matches(
        /^[A-Za-z0-9]{6,10}$/,
        'Employee code must be alphanumeric and between 6 and 10 characters long'
      )
      .required('Employee code is required'),

    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),

    phone: Yup.string()
      .matches(/^\d{10}$/, 'Mobile No must be exactly 10 digits long')
      .required('Mobile No is required'),

    designation: Yup.string()
      .min(2, 'Designation must be at least 2 characters long')
      .max(100, 'Designation cannot exceed 100 characters')
      .required('Designation is required'),

    role: Yup.mixed().required('Please select a role'),
  });

export const addEditProjectValidation = () =>
  Yup.object().shape({
    projectName: Yup.string().required('Project Name is required'),
    memberIds: Yup.array()
      .min(1, 'At least one member is required')
      .required('At least one member is required'),
  });

export const leaveValidationSchema = Yup.object().shape({
  leaveType: Yup.string().required('Please select leave type'),
  leaveReason: Yup.string().required('Please select leave reason'),
  applyDate: Yup.array().min(1, 'Please select leave date range').required(),
  leaveRemarks: Yup.string().max(
    500,
    'Remarks cannot be more than 500 characters'
  ),
});

export const profileDetails = Yup.object().shape({
  dateRangeJoining: Yup.string().required('Date of Joining is required'),

  totalExperience: Yup.string()
    .required('Total Work Experience is required')
    .matches(/^[0-9]+$/, 'Total Work Experience must be a valid number'),

  areaOfExpertise: Yup.string()
    .required('Area Of Expertise is required')
    .min(3, 'Area of Expertise must be at least 3 characters long')
    .max(500, 'Area of Expertise must be less than 500 characters'),

  currentAddress: Yup.string()
    .required('Current Address is required')
    .min(10, 'Current Address must be at least 10 characters long')
    .max(1000, 'Current Address must be less than 1000 characters'),

  dateRangeBirth: Yup.string().required('Date of Birth is required'),

  bloodGroup: Yup.object({
    value: Yup.string()
      .required('Blood Group is required')
      .notOneOf([''], 'Blood Group is required'),
  }).nullable(),

  gender: Yup.object({
    value: Yup.string()
      .required('Gender is required')
      .notOneOf([''], 'Gender is required'),
  }).nullable(),

  permanentAddress: Yup.string()
    .required('Permanent Address is required')
    .min(10, 'Permanent Address must be at least 10 characters long')
    .max(1000, 'Permanent Address must be less than 1000 characters'),

  aadharNumber: Yup.string()
    .required('Aadhar number is required')
    .matches(/^\d{12}$/, 'Aadhar number must be exactly 12 digits'),

  panNumber: Yup.string()
    .required('PAN number is required')
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format'),
});

export const bankDetails = Yup.object().shape({
  bankName: Yup.string().required('Bank Name is required'),
  branchName: Yup.string().required('Branch Name is required'),
  ifscCode: Yup.string().required('IFSC Code is required'),
  accountNumber: Yup.string().required('Account Number is required'),
  accountHolderName: Yup.string().required('Account Holder Name is required'),
});

export const emergencyContactDetails = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  relation: Yup.string().required('Relation is required'),
  number: Yup.string()
    .required('Number is required')
    .matches(/^[0-9]+$/, 'Number must be digits only'),
});

export const documentsDetails = Yup.object().shape({
  panCard: Yup.mixed()
    .required('PAN Card is required')
    .test('fileSize', 'File size is too large (max 2MB)', (value) => {
      return value && value.size <= 2 * 1024 * 1024; // 2 MB
    }),
  aadharCard: Yup.mixed()
    .required('Aadhar Card is required')
    .test('fileSize', 'File size is too large (max 2MB)', (value) => {
      return value && value.size <= 2 * 1024 * 1024; // 2 MB
    }),
});
export const attendanceValidationSchema = Yup.object({
  totalWorkingHours: Yup.number().positive('Must be a positive number'),
  flexibleTotalHours: Yup.number().positive('Must be a positive number'),
  elegibleCompoff: Yup.number().max(8, 'CompOff hours cannot exceed 8 hours'),
  halfLeave: Yup.number().max(8, 'Half leave hours cannot exceed 8 hours'),
});
