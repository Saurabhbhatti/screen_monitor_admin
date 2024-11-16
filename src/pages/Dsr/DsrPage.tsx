import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDsrDataRequest } from '../../redux/dsr/actions';
import {
  RootStateDsr,
  UserState,
  FileFormat,
  OptionType,
  MemberOption,
  TeamMember,
} from '../../utils/type';
import './DsrPage.css';
import 'flatpickr/dist/flatpickr.css';
import {
  getEndOfCurrentWeek,
  getPreviosSevenDays,
  getUnixTimestamps,
  getUserRole,
  hasPermission,
  UserRole,
} from '../../utils';
import { format } from 'date-fns';
import DsrHeader from './DsrHeader';
import DsrCard from './DsrCard';
import { toast } from 'react-toastify';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import { getAllUserRequest } from '../../redux/user/action';

const ReportCard: React.FC = () => {
  const dispatch = useDispatch();
  const userRole = getUserRole();

  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const initialRange = getPreviosSevenDays();
  const [dateRange, setDateRange] = useState<any>(initialRange);
  const [fileFormat, setFileFormat] = useState<FileFormat>({
    value: 'xlsx',
    label: 'Export',
  });
  const [isFile, setIsFile] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<OptionType | null>(null);

  const { user } = useSelector((state: UserState) => state.auth);
  const { dsrs, loading, error } = useSelector(
    (state: RootStateDsr) => state.dsr
  );
  const { allUserData } = useSelector((state: TeamMember) => state.user);

  const [startUnixTime, endUnixTime] = getUnixTimestamps(dateRange);
  const userId =
    userRole === UserRole.EMPLOYEE ? user?.data?._id : selectedMember?.value;

  const memberOptions: OptionType[] =
    allUserData?.data?.map(({ firstName, _id }: MemberOption) => ({
      label: firstName,
      value: _id,
    })) || [];

  useEffect(() => {
    const selectedMemberIds = selectedMember
      ? [selectedMember.value]
      : userRole === UserRole.EMPLOYEE
      ? [userId]
      : undefined;
    if (startUnixTime && endUnixTime && selectedMemberIds) {
      dispatch(
        fetchDsrDataRequest({
          startTime: startUnixTime,
          endTime: endUnixTime,
          memberId: selectedMemberIds,
        })
      );
    }
  }, [startUnixTime, endUnixTime, userId]);

  useEffect(() => {
    if (isFile) {
      downloadFile();
      setIsFile(false);
    }
  }, [isFile]);

  useEffect(() => {
    if (
      !allUserData?.data?.length &&
      hasPermission(userRole, 'report', 'write')
    ) {
      dispatch(getAllUserRequest());
    } else if (allUserData?.data.length > 0 && !selectedMember) {
      const initialMember =
        userRole === UserRole.EMPLOYEE
          ? allUserData.data.find(
              (user: { _id: string }) => user._id === userId
            )
          : allUserData.data[0];
      setSelectedMember(
        initialMember
          ? { label: initialMember.firstName, value: initialMember._id }
          : null
      );
    }
  }, [allUserData?.data, userRole, selectedMember, userId]);

  const toggleExpand = (index: number) =>
    setExpandedItem((prevIndex) => (prevIndex === index ? null : index));

  const handleFormatChange = (selectedFormat: FileFormat) => {
    setFileFormat(selectedFormat);
    setIsFile(true);
  };

  const handleMemberChange = (memberOption: OptionType | null) => {
    setSelectedMember(memberOption);
    setFileFormat({ value: '', label: 'Export' });
    setIsFile(false);
  };

  const downloadFile = async () => {
    const baseUrl = import.meta.env.VITE_APP_BASE_URL;
    const selectedMemberId =
      userRole === UserRole.EMPLOYEE ? [userId] : [selectedMember?.value || ''];
    const empName =
      userRole === UserRole.EMPLOYEE
        ? user?.data?.firstName
        : selectedMember?.label || 'unknown';
    const month =
      dateRange.length > 0 ? format(dateRange[0], 'MMMM') : 'unknown-month';
    const token = localStorage.getItem('userToken') ?? '';
    const fileExtension = fileFormat.value === 'xlsx' ? 'xlsx' : 'pdf';
    const fileName = `${empName}-${month}.${fileExtension}`;

    try {
      const response = await fetch(`${baseUrl}/admin/report`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startTime: startUnixTime,
          endTime: endUnixTime,
          memberId: selectedMemberId,
          fileFormat: fileFormat.value,
          isFile,
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('File downloaded successfully!');
      } else {
        console.error('Network response was not ok:', response.statusText);
      }
    } catch (error) {
      console.error('Fetch operation error:', error);
    }
  };

  if (loading) {
    return (
      <div className='loader-container'>
        <CustomLoader />
      </div>
    );
  }

  if (error) {
    return <div>{typeof error === 'string' ? error : 'An error occurred'}</div>;
  }

  return (
    <div className='report-container'>
      <header className='report-header'>
        <h2 className='text-2xl font-semibold'>DSR(Task)</h2>
      </header>
      <section className='dsr-header-main'>
        <DsrHeader
          userRole={userRole}
          memberOptions={memberOptions}
          handleMemberChange={handleMemberChange}
          selectedMember={selectedMember}
          startTime={startUnixTime}
          endTime={endUnixTime}
          dateRange={dateRange}
          setDateRange={setDateRange}
          fileFormat={fileFormat}
          isFile={isFile}
          onFormatChange={handleFormatChange}
        />
      </section>
      {dateRange.length > 0 && (
        <DsrCard
          userRole={userRole}
          data={dsrs}
          selectedMember={selectedMember}
          expandedItem={expandedItem}
          onToggleExpand={toggleExpand}
        />
      )}
    </div>
  );
};

export default ReportCard;
