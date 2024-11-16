import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import SearchSelect from '../../components/CustomSelect/CustomSelect';
import CustomButton from '../../components/CustomButton/CustomButton';
import Flatpickr from 'react-flatpickr';
import { hasPermission, UserRole } from '../../utils';
import { TimeRegulationModalProps } from '../../utils/type';
import './TimeRegulationModal.css';
import Button from '../../components/CustomButton/CustomButton';
import { IconX } from '../../assets';

const TimeRegulationModal: React.FC<TimeRegulationModalProps> = ({
  memberOptions,
  addProjectModal,
  setAddProjectModal,
  dateTime,
  selectedUser,
  setDateTime,
  userRole,
  handleChangeUser,
  projectOption,
  selectedProjectOption,
  regularizeStartTime,
  regularizeEndTime,
  error,
  description,
  handleStartTimeChange,
  handleEndTimeChange,
  handleDescriptionChange,
  isApplyEnabled,
  handleApplyButton,
  handleCancelButton,
  loading,
  allProjectOptions,
  handleChangeProject,
}) => {
  return (
    <div>
      <Transition appear show={addProjectModal} as={Fragment}>
        <Dialog
          as='div'
          open={addProjectModal}
          onClose={() => setAddProjectModal(false)}
          className='relative z-[51]'
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-[black]/60' />
          </Transition.Child>
          <div className='main-model-wrap'>
            <div className='sub-model-wrap'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='panel panel-wrap'>
                  <div className='panel'>
                    <div>
                      <Button
                        type='button'
                        onClick={handleCancelButton}
                        className='closeIcon'
                      >
                        <IconX />
                      </Button>
                    </div>
                    <div className='table-regulation-h2-Flatpickr'>
                      <h2 className='table-regulation-h2'>Add Time Request</h2>
                      <div className='time-regulation-selecter-Flatpickr'>
                        {hasPermission(
                          userRole,
                          'regulariseRequest',
                          'read'
                        ) && (
                          <div className='time-regulation-user-selecter'>
                            <h2 className='label-header'>User :</h2>
                            <SearchSelect
                              placeholder='Select User'
                              options={memberOptions}
                              isSearchable={true}
                              value={selectedUser}
                              isClearable={true}
                              className='select-project'
                              onChange={handleChangeUser}
                              styles={{
                                menuPortal: (base: any) => ({
                                  ...base,
                                  zIndex: 9999,
                                }),
                              }}
                            />
                          </div>
                        )}
                        <div className='time-regulation-project-selector'>
                          <h2 className='label-header'>Project :</h2>
                          <SearchSelect
                            placeholder='Select Project'
                            options={
                              userRole !== UserRole.EMPLOYEE
                                ? projectOption
                                : allProjectOptions
                            }
                            isSearchable={true}
                            value={selectedProjectOption}
                            className='select-user'
                            isDisabled={
                              userRole !== UserRole.EMPLOYEE
                                ? !selectedUser
                                : false
                            }
                            onChange={handleChangeProject}
                            styles={{
                              menuPortal: (base: any) => ({
                                ...base,
                                zIndex: 9999,
                              }),
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='date-picker-container-data'>
                      <label className='date-picker-label'>Date :</label>
                      <Flatpickr
                        value={dateTime}
                        options={{
                          enableTime: false,
                          dateFormat: 'd-m-Y',
                          position: 'auto right',
                          maxDate: 'today',
                        }}
                        className='time-activity-date-picker-model'
                        onChange={(dates) => setDateTime(dates[0])}
                      />
                    </div>
                    <div className='time-regulation-sub-detail'>
                      <div className='time-display-div'>
                        <div className='time-regulation-start-time'>
                          <label className='time-label'>Start Time:</label>
                          <input
                            type='time'
                            className='time-regulation-input'
                            value={regularizeStartTime}
                            onChange={handleStartTimeChange}
                          />
                        </div>
                        <div className='time-regulation-end-time'>
                          <label className='time-label'>End Time:</label>
                          <input
                            type='time'
                            className='time-regulation-input'
                            value={regularizeEndTime}
                            onChange={handleEndTimeChange}
                            disabled={!regularizeStartTime}
                          />
                        </div>
                      </div>

                      {error && <div className='validation-error'>{error}</div>}

                      <div className='description-container'>
                        <label className='description-label'>Description</label>
                        <textarea
                          className='title-description'
                          value={description}
                          onChange={handleDescriptionChange}
                        ></textarea>
                      </div>

                      <div className='action-button'>
                        <CustomButton
                          type='button'
                          className='time-regulation-action-button hover:shadow-none btn-outline-danger'
                          onClick={handleCancelButton}
                        >
                          Cancel
                        </CustomButton>

                        <CustomButton
                          type='submit'
                          className='button-style bg-primary'
                          isLoading={loading}
                          onClick={handleApplyButton}
                          disabled={!isApplyEnabled}
                        >
                          Apply
                        </CustomButton>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default TimeRegulationModal;
