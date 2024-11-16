import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import Button from '../../components/CustomButton/CustomButton';
import { IconX } from '../../assets';
import SearchSelect from '../../components/CustomSelect/CustomSelect';
import { AddProjectModalProps } from '../../utils/type';
import './AddProjectModal.css'

const AddProjectModal: React.FC<AddProjectModalProps> = ({
  addProjectModal,
  setAddProjectModal,
  projectOption,
  customMemberStyles,
  selectedProject,
  onChange,
  handleProjectSave,
  isUserModifyLoading
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
                  <Button
                    type='button'
                    className='add-modal-button'
                    onClick={() => setAddProjectModal(false)}
                  >
                    <IconX />
                  </Button>
                  <div className='title-head'>
                    {'Add Project'}
                  </div>
                  <div className='p-5'>
                    <form>
                      <div className='mb-5 z-20'>
                        <label htmlFor='name'>Projects</label>
                        <SearchSelect
                          placeholder='Select Project'
                          options={projectOption}
                          isMulti
                          isSearchable={true}
                          styles={customMemberStyles}
                          value={selectedProject}
                          onChange={onChange}
                        />
                      </div>
                      <div className='button-group-wrap'>
                        <Button
                          type='button'
                          className='relative flex items-center justify-center rounded-md border px-5 py-2 text-sm  outline-none transition duration-300 hover:shadow-none  btn-outline-danger'
                          onClick={() => setAddProjectModal(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          disabled={selectedProject?.length ? false : true}
                          isLoading={isUserModifyLoading}
                          onClick={handleProjectSave}
                          type='button'
                          className={`relative flex items-center justify-center rounded-md border px-5 py-2 text-sm font-semibold shadow-[0_10px_20px_-10px] outline-none transition duration-300 hover:shadow-none ltr:ml-4 rtl:mr-4 ${selectedProject?.length
                            ? 'border-primary bg-primary text-white shadow-primary/60'
                            : 'border-gray-400 bg-gray-400 text-gray-200 shadow-none'
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
    </div>
  );
};

export default AddProjectModal;
