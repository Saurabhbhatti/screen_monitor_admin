import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import './AddMember.css';
import CustomButton from '../../components/CustomButton/CustomButton';
import { AddMemberPopupProps } from '../../utils/type';

const AddMember: React.FC<AddMemberPopupProps> = ({ onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [memberType, setMemberType] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [selectedProject, setSelectedProject] = useState('');

  const handleAddMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Transition appear show as={Fragment}>
      <Dialog as='div' className='add-member-dialog' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='add-member-overlay' />
        </Transition.Child>

        <div className='add-member-container'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Dialog.Panel className='add-member-panel'>
              <div className='add-member-header'>Add Team Member</div>
              <div className='add-member-body'>
                <form onSubmit={handleAddMember}>
                  <div className='add-member-form-group'>
                    <label htmlFor='firstName'>First Name</label>
                    <input
                      type='text'
                      id='firstName'
                      placeholder='Enter First Name'
                      className='add-member-input'
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className='add-member-form-group'>
                    <label htmlFor='lastName'>Last Name</label>
                    <input
                      type='text'
                      id='lastName'
                      placeholder='Enter Last Name'
                      className='add-member-input'
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                  <div className='add-member-form-group'>
                    <label htmlFor='email'>Email Address</label>
                    <input
                      type='email'
                      id='email'
                      placeholder='Enter Email Address'
                      className='add-member-input'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className='add-member-form-group'>
                    <label htmlFor='mobileNumber'>Mobile Number</label>
                    <input
                      type='text'
                      id='mobileNumber'
                      placeholder='Enter Mobile Number'
                      className='add-member-input'
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div className='add-member-form-group'>
                    <label htmlFor='memberType'>Member Type</label>
                    <select
                      id='memberType'
                      className='add-member-select'
                      value={memberType}
                      onChange={(e) => setMemberType(e.target.value)}
                      required
                    >
                      <option value=''>Select Member Type</option>
                      <option value='admin'>Admin</option>
                      <option value='developer'>Developer</option>
                      <option value='designer'>Designer</option>
                      <option value='manager'>Manager</option>
                    </select>
                  </div>
                  <div className='add-member-form-group'>
                    <label htmlFor='companyName'>Company Name</label>
                    <input
                      type='text'
                      id='companyName'
                      placeholder='Enter Company Name'
                      className='add-member-input'
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                    />
                  </div>
                  <div className='add-member-form-group'>
                    <label htmlFor='selectedProject'>Select Project</label>
                    <select
                      id='selectedProject'
                      className='add-member-select'
                      value={selectedProject}
                      onChange={(e) => setSelectedProject(e.target.value)}
                      required
                    >
                      <option value=''>Select Project</option>
                      <option value='projectA'>Project A</option>
                      <option value='projectB'>Project B</option>
                      <option value='projectC'>Project C</option>
                    </select>
                  </div>
                  <div className='add-member-footer'>
                    <CustomButton
                      variant='outlined'
                      className='cancel-button'
                      onClick={onClose}
                    >
                      Cancel
                    </CustomButton>
                    <CustomButton type='submit' className='add-button'>
                      Add
                    </CustomButton>
                  </div>
                </form>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddMember;
