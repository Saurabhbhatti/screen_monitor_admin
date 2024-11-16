import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage, FormikHelpers } from 'formik';
import { documentsDetails } from '../../utils/validation';
import {
  DocumentValues,
  FileInputFieldProps,
  ProfileDocumentDetailsProps,
} from '../../utils/types/profile';

// Reusable File Input Component
const FileInputField: React.FC<FileInputFieldProps> = ({
  label,
  name,
  filePath,
  onChange,
  onRemove,
  error,
}) => (
  <div>
    <label className='form-label'>{label}</label>
    <input
      type='file'
      name={name}
      className='profile-detail-input'
      accept='image/*'
      onChange={onChange}
    />
    {filePath && (
      <div className='file-preview'>
        <img
          src={filePath}
          alt={`${label} Preview`}
          className='image-preview-box'
        />
        <button
          type='button'
          className='remove-btn'
          onClick={() => onRemove(name)}
        >
          Remove
        </button>
      </div>
    )}
    <ErrorMessage name={name} component='div' className='error' />
  </div>
);

const ProfileDocumentDetails: React.FC<ProfileDocumentDetailsProps> = ({
  onDataSubmit,
  loading,
  profileData,
}) => {
  const [fileStates, setFileStates] = useState<{
    panCard: File | null;
    aadharCard: File | null;
  }>({
    panCard: null,
    aadharCard: null,
  });

  const [filePaths, setFilePaths] = useState<{
    panCardPath: string | null;
    aadharCardPath: string | null;
  }>({
    panCardPath: null,
    aadharCardPath: null,
  });

  useEffect(() => {
    if (profileData?.data) {
      const { panCard, aadharCard } = profileData.data;

      if (panCard?.file) {
        setFilePaths((prev) => ({
          ...prev,
          panCardPath: panCard.file.fileUrl,
        }));
        setFileStates((prev) => ({ ...prev, panCard: null }));
      }
      if (aadharCard?.file) {
        setFilePaths((prev) => ({
          ...prev,
          aadharCardPath: aadharCard.file.fileUrl,
        }));
        setFileStates((prev) => ({ ...prev, aadharCard: null }));
      }
    }
  }, [profileData]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: 'panCard' | 'aadharCard',
    setFieldValue: (field: string, value: any) => void
  ): void => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB. Please upload a smaller file.');
        return;
      }

      // Update Formik field value
      setFieldValue(name, file);
      setFileStates((prev) => ({
        ...prev,
        [name]: file,
      }));

      const preview = URL.createObjectURL(file);
      setFilePaths((prev) => ({
        ...prev,
        [`${name}Path`]: preview,
      }));
    }
  };

  // Handle removing the preview image
  const handleRemovePreview = (
    name: 'panCard' | 'aadharCard',
    setFieldValue: (field: string, value: any) => void
  ): void => {
    setFileStates((prev) => ({
      ...prev,
      [name]: null,
    }));
    setFieldValue(name, null);
    setFilePaths((prev) => ({
      ...prev,
      [`${name}Path`]: null,
    }));
  };

  return (
    <Formik
      initialValues={
        {
          panCard: null,
          aadharCard: null,
        } as DocumentValues
      }
      validationSchema={documentsDetails}
      onSubmit={(
        values: DocumentValues,
        { setSubmitting }: FormikHelpers<DocumentValues>
      ) => {
        const formData = new FormData();
        if (values.panCard) formData.append('panCardPic', values.panCard);
        if (values.aadharCard)
          formData.append('aadharCardPic', values.aadharCard);

        onDataSubmit(formData);
        setSubmitting(false);
      }}
    >
      {({ setFieldValue, values }) => {
        const isSaveDisabled = !fileStates.panCard && !fileStates.aadharCard;

        return (
          <Form>
            <div className='profile-form-main'>
              <h2 className='profile-detail-title'>Profile Document</h2>
            </div>

            <div className='profile-detail-grid'>
              <FileInputField
                label='PAN Card'
                name='panCard'
                filePath={filePaths.panCardPath}
                onChange={(e) => handleFileChange(e, 'panCard', setFieldValue)}
                onRemove={(name) => handleRemovePreview(name, setFieldValue)}
                error='panCard'
              />
              <FileInputField
                label='Aadhar Card'
                name='aadharCard'
                filePath={filePaths.aadharCardPath}
                onChange={(e) =>
                  handleFileChange(e, 'aadharCard', setFieldValue)
                }
                onRemove={(name) => handleRemovePreview(name, setFieldValue)}
                error='aadharCard'
              />
            </div>

            <div className='save-btn'>
              <button
                type='submit'
                className='btn btn-primary'
                disabled={loading || isSaveDisabled}
              >
                Save
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProfileDocumentDetails;
