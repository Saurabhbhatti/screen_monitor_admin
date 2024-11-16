import React from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import CustomTextInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomModalComponent from '../../components/CustomModal/CustomModal';
import { projectValidation } from '../../utils/validation';
import ImageComponent from '../../components/ImageComponent/ImageComponent';
import { IconX } from '../../assets';
import './Projects.css';
import { AddEditProjectProps } from '../../utils/type';

const AddEditProject: React.FC<AddEditProjectProps> = ({
  isProjectModal,
  setIsProjectModal,
  onSubmit,
  projectData,
  onUpdate,
  isLoadingAddProject,
  isLoadingUpdateProject,
}) => {
  const handleCloseModal = () => {
    setIsProjectModal(false);
  };

  const initialValues = {
    addProject: projectData?.projectName || '',
    isScreenshot: projectData?.isScreenshot || false,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: projectValidation,
    onSubmit: (values, { setSubmitting }) => {
      if (projectData?._id) {
        onUpdate(values);
      } else {
        onSubmit(values);
      }
      setSubmitting(false);
    },
  });

  const { getFieldProps, handleSubmit } = formik;

  return (
    <CustomModalComponent isOpen={isProjectModal} onClose={handleCloseModal}>
      <>
        <ImageComponent onClick={handleCloseModal}>
          <IconX className='close-icon' />
        </ImageComponent>
        <div className='project-title'>
          {projectData ? 'Edit Project' : 'Add Project'}
        </div>
        <div className='p-5'>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <div className='grid gap-5'>
                <div>
                  <label htmlFor='title'>Project Name</label>
                  <CustomTextInput
                    labelVisibility='hidden'
                    placeholder={'Add Project'}
                    {...getFieldProps('addProject')}
                    name='addProject'
                    label='Add Project'
                  />
                </div>
              </div>
              <div className='modal-button-container'>
                <CustomButton
                  label='Cancel'
                  onClick={() => setIsProjectModal(false)}
                  type='button'
                  className='cancel-btn btn-outline-danger bg-red-500'
                  children={undefined}
                />
                {projectData ? (
                  <CustomButton
                    label='Update'
                    isLoading={isLoadingUpdateProject}
                    type='submit'
                    className='update-add-btn bg-blue-500'
                    children={undefined}
                  />
                ) : (
                  <CustomButton
                    isLoading={isLoadingAddProject}
                    label='Add'
                    type='submit'
                    className='update-add-btn bg-blue-500'
                    children={undefined}
                  />
                )}
              </div>
            </Form>
          </FormikProvider>
        </div>
      </>
    </CustomModalComponent>
  );
};

export default AddEditProject;
