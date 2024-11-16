import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TeamMemberData } from '../../utils/mockData';
import './TeamMemberGridView.css';
import { setPageTitle } from '../../redux/themeConfigSlice';


const TeamMemberGridView: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Contacts'));
  }, [dispatch]);

  const [view, setView] = useState<string>('list');

  const defaultParams = {
    id: null,
    name: '',
    email: '',
    phone: '',
    role: '',
    location: '',
  };

  const [params, setParams] = useState<{ [key: string]: any }>(
    JSON.parse(JSON.stringify(defaultParams))
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setParams({ ...params, [id]: value });
  };

  const [searchTerm, setSearchTerm] = useState<string>('');
  const contactList = TeamMemberData;
  const [filteredItems, setFilteredItems] = useState(contactList);

  useEffect(() => {
    setFilteredItems(
      contactList.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, contactList]);

  return (
    <div>
      <div className='main-div'>
        {filteredItems.map((contact: any) => {
          return (
            <div className='upper-div' key={contact.id}>
              <div className='sub-div'>
                <div className='image-container'>
                  <img
                    className='bg-img-contain'
                    src={`/assets/images/${contact.path}`}
                    alt='contact_image'
                  />
                </div>
                <div className='card-div'>
                  <div className='card-sub-div'>
                    <div className='text-xl'>{contact.name}</div>
                    <div className='text-dark'>{contact.type}</div>
                  </div>
                  <div className='main-info-div'>
                    <div className='user-info-div'>
                      <div className='key-info'>Name :</div>
                      <div className='value-info'>{contact.name}</div>
                    </div>
                    <div className='user-info-div'>
                      <div className='key-info'>Role :</div>
                      <div className='text-white-dark'>{contact.type}</div>
                    </div>
                    <div className='user-info-div'>
                      <div className='key-info'>Comapany :</div>
                      <div className='value-info'>{contact.company}</div>
                    </div>
                    <div className='user-info-div'>
                      <div className='key-info'>Mobile :</div>
                      <div className='value-info'>{contact.mobile}</div>
                    </div>
                  </div>
                </div>
                <div className='button-group'>
                  <button
                    type='button'
                    className='btn btn-lg btn-outline-primary'
                  >
                    Update
                  </button>
                  <button
                    type='button'
                    className='btn btn-lg btn-outline-danger'
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamMemberGridView;
