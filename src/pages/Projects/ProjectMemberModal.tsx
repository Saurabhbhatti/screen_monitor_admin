import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Button from '../../components/CustomButton/CustomButton';
import { IconX } from '../../assets';
import SearchSelect from '../../components/CustomSelect/CustomSelect';
import { ProjectMemberModalProps } from '../../utils/type';
import './ProjectMemberModal.css';

const ProjectMemberModal: React.FC<ProjectMemberModalProps> = ({
  setAddMemberModal,
  addMemberModal,
  memberOptions,
  selectedEditMember,
  handleEditSelectedMemberChange,
  isModifyingProject,
  handleEditMember,
  customMemberStyles,
}) => {
  return (
    <Transition appear show={addMemberModal} as={Fragment}>
      <Dialog
        as='div'
        open={addMemberModal}
        onClose={() => setAddMemberModal(false)}
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
          <div className='main-transition' />
        </Transition.Child>
        <div className='dialog-div'>
          <div className='sub-dialog-div'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='panel dialog-panel-list'>
                <Button
                  type='button'
                  onClick={() => setAddMemberModal(false)}
                  className='closeIcon'
                >
                  <IconX />
                </Button>
                <div className='lable-modal'>{'Add Member'}</div>
                <div className='p-5'>
                  <form>
                    <div className='mb-5 z-20'>
                      <label htmlFor='name'>Member</label>

                      <SearchSelect
                        placeholder='Select an option'
                        options={memberOptions}
                        isMulti
                        styles={customMemberStyles}
                        isSearchable={true}
                        value={selectedEditMember}
                        onChange={handleEditSelectedMemberChange}
                      />
                    </div>
                    <div className='btn-div'>
                      <Button
                        type='button'
                        className='cancel btn-outline-danger'
                        onClick={() => setAddMemberModal(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        disabled={!selectedEditMember?.length}
                        isLoading={isModifyingProject}
                        onClick={handleEditMember}
                        className={`save ${
                          selectedEditMember?.length
                            ? 'btn-inable-save'
                            : 'btn-disable-save'
                        }`}
                      >
                        Save
                      </Button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProjectMemberModal;