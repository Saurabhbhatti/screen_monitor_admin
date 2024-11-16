import React, { useEffect, useState } from 'react';
import { Form, ErrorMessage, FormikProvider, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import Flatpickr from 'react-flatpickr';
import styles from './LeaveForm.module.css';
import IconUserPlus from '../../../components/Icon/IconUserPlus';
import 'flatpickr/dist/themes/material_green.css';
import SearchSelect from '../../../components/CustomSelect/CustomSelect';
import Button from '../../../components/CustomButton/CustomButton';
import { IconTrashLines } from '../../../assets';
import { leaveValidationSchema } from '../../../utils/validation';
import {
  formatDate,
  getDateRangeArray,
  isDateInExistingLeaves,
  isValidLeavePeriod,
  isWeekend,
  leaveDateFormat,
} from '../../../utils';
import { leaveReasonOptions } from '../../../utils/mockData';
import { submitLeaveFormRequest } from '../../../redux/leave/action';
import {
  ApplyDate,
  ExistingLeave,
  LeaveHoliday,
  LeaveOption,
} from '../../../utils/type';
import { fetchExistingLeaveRequest } from '../../../redux/leave/existingLeave/action';

const LeaveForm: React.FC = () => {
  const [leaveFormShowForm, setLeaveFormShowFormShowForm] = useState(false);
  const [leaveDateRange, setLeaveDateRange] = useState<Date[]>([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);
  const [tableRows, setTableRows] = useState<
    Array<{ date: Date | string; period: any; count?: number }>
  >([]);
  const [disabledOptions, setDisabledOptions] = useState<string[]>([]);
  const [flattenedExistingLeaveFilter, setFlattenedExistingLeaveFilter] =
    useState<string[]>([]);
  const [flattenedExistingLeave, setFlattenedExistingLeave] = useState<
    string[]
  >([]);

  const dispatch = useDispatch();

  const { loading } = useSelector((state: any) => state?.leave);
  const leaveCountsAndTypes = useSelector(
    (state: any) => state?.leaveRecords?.data?.counts
  );
  const existingLeave = useSelector(
    (state: any) => state?.existingLeave?.data?.data
  );

  const formattedLeaveTypes = leaveCountsAndTypes?.leaveTypes.map(
    (option: LeaveOption) => ({
      label: option.name,
      value: option.value,
    })
  );

  const formik = useFormik({
    initialValues: {
      leaveType: '',
      leaveReason: '',
      leaveRemarks: '',
      applyDate: [] as Array<{
        count: number;
        date: Date;
        period: string;
      }>,
    },
    validationSchema: leaveValidationSchema,
    onSubmit: (values) => {
      // Main filtering function
      const filterApplyDates = (
        applyDates: ApplyDate[],
        existingLeaveFilter: string | string[]
      ) => {
        return applyDates.filter((item) => {
          const validPeriod = isValidLeavePeriod(item);
          const notInExistingLeaves = !isDateInExistingLeaves(
            item.date,
            existingLeaveFilter
          );
          return validPeriod && notInExistingLeaves;
        });
      };

      // Filter applyDate to include only full-day entries and valid half-day entries
      const filteredApplyDate = values.applyDate.filter(
        (item) => item?.period === 'full-day' || isValidLeavePeriod(item)
      );

      //  Apply further filtering based on existing leaves
      const updatedFilteredApplyDate = filterApplyDates(
        filteredApplyDate,
        flattenedExistingLeaveFilter
      );

      // Calculate the total of all the counts in applyDate
      const totalLeaveSelected = updatedFilteredApplyDate.reduce(
        (acc, curr) => acc + curr.count,
        0
      );

      const selectedLeaveType = leaveCountsAndTypes?.leaveTypes.find(
        (leave: { value: string }) => leave.value === values.leaveType
      );

      if (selectedLeaveType.value == 'PL') {
        if (totalLeaveSelected > leaveCountsAndTypes.paidLeave) {
          toast.error(
            `Leave quota exceeded. Please select up to ${leaveCountsAndTypes.paidLeave} days of your available paid leave`
          );
          return;
        }
      } else if (selectedLeaveType.value == 'CL') {
        if (totalLeaveSelected > leaveCountsAndTypes.compoffLeave) {
          toast.error(
            `Leave quota exceeded. Please select up to ${leaveCountsAndTypes.compoffLeave} days of your available compoff leave`
          );
          return;
        }
      }

      if (updatedFilteredApplyDate.length === 0) {
        toast.error('Please select a valid date');
        return;
      }

      // Create the new object with the filtered applyDate
      const leaveFormData = {
        applyDate: updatedFilteredApplyDate,
        leaveReason: values.leaveReason,
        leaveRemarks: values.leaveRemarks,
        leaveType: values.leaveType,
      };

      setIsSubmitDisabled(true);
      dispatch(submitLeaveFormRequest(leaveFormData));
      setIsSubmitDisabled(false);
    },
  });

  useEffect(() => {
    const disabled: string[] = [];
    if (leaveCountsAndTypes.paidLeave === 0) {
      disabled.push('PL');
    }
    if (leaveCountsAndTypes.compoffLeave === 0) {
      disabled.push('CL');
    }
    setDisabledOptions(disabled);
  }, [leaveCountsAndTypes]);

  useEffect(() => {
    if (!loading) {
      setLeaveFormShowFormShowForm(false);
      formik.resetForm();
      setTableRows([]);
      setLeaveDateRange([]);
    }
  }, [loading]);

  const handleLeaveFormButtonClick = () => {
    dispatch(fetchExistingLeaveRequest());
    setLeaveFormShowFormShowForm(true);
    formik.resetForm();
    setTableRows([]);
    setLeaveDateRange([]);
  };

  const handleLeaveFormCloseForm = () => {
    setLeaveFormShowFormShowForm(false);
  };

  const handleDateSelection = (dates: Date[]) => {
    const existingLeaveFilter = existingLeave.leaves.flatMap(
      (leave: ExistingLeave) =>
        leave.applyDate.map((dateItem: any) => leaveDateFormat(dateItem.date))
    );

    const holidaysLeaveFilter = existingLeave.holidays.map(
      (holiday: LeaveHoliday) => leaveDateFormat(holiday.date)
    );

    // Merge the leave and holiday filters
    const mergedLeaveFilter = [...existingLeaveFilter, ...holidaysLeaveFilter];

    // Update the state with the formatted and merged filters
    setFlattenedExistingLeave(existingLeaveFilter);
    setFlattenedExistingLeaveFilter(mergedLeaveFilter);

    setLeaveDateRange(dates);
    if (dates.length === 2) {
      const [startDate, endDate] = dates;
      const dateRange = getDateRangeArray(startDate, endDate);
      const newRows = dateRange.map((date) => {
        const formattedDate = format(new Date(date), 'MM-dd-yyyy');
        return {
          date: formattedDate,
          period: isWeekend(date) ? null : 'full-day',
          count: 1,
        };
      });

      setTableRows(newRows);
      formik.setFieldValue('applyDate', newRows);
    }
  };

  const handlePeriodChange = (index: number, value: string) => {
    const updatedRows = [...tableRows];
    updatedRows[index].period = value;
    updatedRows[index].count = value === 'full-day' ? 1 : 0.5;
    setTableRows(updatedRows);
  };

  const handleRemoveRow = (index: number) => {
    const updatedRows = [...tableRows];
    updatedRows.splice(index, 1);
    setTableRows(updatedRows);
    formik.setFieldValue('applyDate', updatedRows);
  };

  const handleChange = (option: { value: any; label: any }) => {
    if (disabledOptions.includes(option.value)) {
      alert(`Sorry, ${option.label} is unavailable`);
      return;
    }
    formik.setFieldValue('leaveType', option.value);
  };

  return (
    <div className={styles.buttonContainer}>
      <button
        onClick={handleLeaveFormButtonClick}
        className={styles.applyButton}
      >
        <IconUserPlus className='userplus-icon' />
        Apply for Leave
      </button>

      {leaveFormShowForm && (
        <div className={styles.modalOverlay} onClick={handleLeaveFormCloseForm}>
          <div
            className={styles.modalContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleLeaveFormCloseForm}
              className={styles.closeButton}
            >
              &times;
            </button>
            <h2 className={styles.header}>Leave Application Form</h2>

            <FormikProvider value={formik}>
              <Form className={styles.formGroup}>
                <div className={styles.fieldContainer}>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>Leave Type</label>
                    <SearchSelect
                      placeholder='Select Leave Type'
                      options={formattedLeaveTypes.map(
                        (option: LeaveOption) => ({
                          ...option,
                          isDisabled: disabledOptions.includes(option.value),
                        })
                      )}
                      value={formattedLeaveTypes.find(
                        (option: { value: string }) =>
                          option.value === formik.values.leaveType
                      )}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name='leaveType'
                      component='div'
                      className={styles.errorMessage}
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>Leave Reason</label>
                    <SearchSelect
                      placeholder='Select Leave Reason'
                      options={leaveReasonOptions}
                      value={leaveReasonOptions.find(
                        (option) => option.value === formik.values.leaveReason
                      )}
                      onChange={(option) =>
                        formik.setFieldValue('leaveReason', option.value)
                      }
                    />
                    <ErrorMessage
                      name='leaveReason'
                      component='div'
                      className={styles.errorMessage}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Leave Date Range</label>
                  <Flatpickr
                    options={{
                      mode: 'range',
                      dateFormat: 'Y-m-d',
                      minDate: new Date(),
                      maxDate: new Date().setFullYear(
                        new Date().getFullYear() + 1
                      ),
                    }}
                    value={leaveDateRange}
                    onChange={handleDateSelection}
                    className={styles.fieldInput}
                  />
                  <ErrorMessage
                    name='applyDate'
                    component='div'
                    className={styles.errorMessage}
                  />
                </div>

                <div className='attendance-table-container panel'>
                  <div className='attendance-table-wrapper scrollableTableContainer'>
                    <table className='table table-striped table-hover'>
                      {tableRows.length > 0 && (
                        <thead>
                          <tr>
                            <th className='table-header-cell-first'>Date</th>
                            <th className='table-header-cell-first'>Period</th>
                            <th className='table-header-cell-first'>Action</th>
                          </tr>
                        </thead>
                      )}
                      <tbody>
                        {tableRows.map((row, index) => {
                          // Check if the current row date exists in flattenedExistingLeave
                          const isExistingLeaveDate =
                            flattenedExistingLeave.includes(
                              leaveDateFormat(row.date)
                            );

                          // Check if the current row date exists in holidays
                          const holiday = existingLeave.holidays.find(
                            (leave: { date: string }) =>
                              leaveDateFormat(leave.date) ===
                              leaveDateFormat(row.date)
                          );
                          const isHolidayLeaveDate = !!holiday;

                          return (
                            <tr key={index}>
                              <td>{formatDate(row.date)}</td>
                              <td>
                                {isExistingLeaveDate ? (
                                  <span
                                    style={{
                                      marginRight: '10px',
                                      color: 'blue',
                                    }}
                                  >
                                    Applied leave
                                  </span>
                                ) : isHolidayLeaveDate ? (
                                  <span
                                    style={{
                                      marginRight: '10px',
                                      color: 'green',
                                    }}
                                  >
                                    {holiday.name}
                                  </span>
                                ) : isWeekend(row.date) ? (
                                  <span
                                    style={{
                                      marginRight: '10px',
                                      color: 'red',
                                    }}
                                  >
                                    Weekend
                                  </span>
                                ) : (
                                  <select
                                    value={row.period}
                                    onChange={(e) =>
                                      handlePeriodChange(index, e.target.value)
                                    }
                                  >
                                    <option value='full-day'>Full Day</option>
                                    <option value='half-day'>Half Day</option>
                                  </select>
                                )}
                              </td>
                              <td>
                                <Button
                                  type='button'
                                  onClick={() => handleRemoveRow(index)}
                                >
                                  <IconTrashLines className='text-danger w-6 h-6' />
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Remarks</label>
                  <textarea
                    {...formik.getFieldProps('leaveRemarks')}
                    className={styles.fieldInput}
                    rows={3}
                  />
                  <ErrorMessage
                    name='leaveRemarks'
                    component='div'
                    className={styles.errorMessage}
                  />
                </div>

                <Button
                  type='submit'
                  className={styles.submitButton}
                  disabled={isSubmitDisabled || loading}
                >
                  {loading ? (
                    <div
                      className={styles.Loader}
                      role='status'
                    />
                  ) : (
                    'Submit'
                  )}
                </Button>
              </Form>
            </FormikProvider>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveForm;
