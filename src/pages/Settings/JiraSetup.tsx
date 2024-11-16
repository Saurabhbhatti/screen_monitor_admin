import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Button from '../../components/CustomButton/CustomButton';
import { fetchaAddUpdateSettingRequest } from '../../redux/setting/action';
import { JiraPayload, JiraSettings, SettingRootState } from '../../utils/type';

const JiraSetup = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: SettingRootState) => state?.settings);
  const jira = data?.jira || {};

  const initialValues: JiraSettings = {
    jiraBaseUrl: jira.jiraBaseUrl || '',
    jiraEmail: jira.jiraEmail || '',
    jiraApiToken: jira.jiraApiToken || '',
  };

  const isEmptyFields = !initialValues.jiraBaseUrl && !initialValues.jiraEmail && !initialValues.jiraApiToken;

  const handleSubmit = (values: JiraSettings) => {
    if (!values.jiraBaseUrl || !values.jiraEmail || !values.jiraApiToken) {
      toast.error('Please fill out all fields before submitting.');
      return;
    }
    const payload: JiraPayload = {
      jira: {
        jiraBaseUrl: values.jiraBaseUrl,
        jiraEmail: values.jiraEmail,
        jiraApiToken: values.jiraApiToken,
      },
    };

    dispatch(fetchaAddUpdateSettingRequest(payload));
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
      <Form>
        <div className='flex items-center space-x-4'>
          <div className='flex-1'>
            <label>Base URL</label>
            <Field
              name='jiraBaseUrl'
              type='text'
              className='border border-gray-400 h-9 w-full'
              placeholder='Base URL'
            />
            <ErrorMessage
              name='jiraBaseUrl'
              component='div'
              className='text-red-500 text-sm'
            />
          </div>
          <div className='flex-1'>
            <label>Email</label>
            <Field
              name='jiraEmail'
              type='email'
              className='border border-gray-400 h-9 w-full'
              placeholder='Email'
            />
            <ErrorMessage
              name='jiraEmail'
              component='div'
              className='text-red-500 text-sm'
            />
          </div>
        </div>

        <div className='flex items-center space-x-4 mt-5'>
          <div className='flex-1'>
            <label>API Token</label>
            <Field
              name='jiraApiToken'
              type='text'
              className='border border-gray-400 h-9 w-full'
              placeholder='API Token'
            />
            <ErrorMessage
              name='jiraApiToken'
              component='div'
              className='text-red-500 text-sm'
            />
          </div>
        </div>

        <Button type='submit' className='update-button-style mt-10'>
          {isEmptyFields ? 'Add' : 'Update'}
        </Button>
      </Form>
    </Formik>
  );
};

export default JiraSetup;
