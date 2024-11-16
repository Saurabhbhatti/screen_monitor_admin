import { Fragment, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import './Calendar.css';
import { setPageTitle } from '../../redux/themeConfigSlice';
import { IconX } from '../../assets';
import { EventParams } from '../../utils/type';

const defaultParams: EventParams = {
  id: null,
  title: '',
  start: '',
  end: '',
  description: '',
  type: 'primary',
};

const Calendar = (): JSX.Element => {
  const [events, setEvents] = useState<EventParams[]>([]);
  const [isAddEventModal, setIsAddEventModal] = useState<boolean>(false);
  const [params, setParams] = useState<EventParams>(defaultParams);
  const [minStartDate, setMinStartDate] = useState<Date | string>('');
  const [minEndDate, setMinEndDate] = useState<Date | string>('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle('Calendar'));
  }, [dispatch]);

  const now = new Date();

  const editEvent = (data: any | null): void => {
    let paramsCopy: EventParams = { ...defaultParams };
    setParams(paramsCopy);

    if (data) {
      let obj = JSON.parse(JSON.stringify(data.event));
      setParams({
        id: obj.id ? obj.id : null,
        title: obj.title ? obj.title : '',
        start: dateFormat(obj.start),
        end: dateFormat(obj.end),
        type: obj.classNames ? obj.classNames[0] : 'primary',
        description: obj.extendedProps ? obj.extendedProps.description : '',
      });
      setMinStartDate(new Date());
      setMinEndDate(dateFormat(obj.start));
    } else {
      setMinStartDate(new Date());
      setMinEndDate(new Date());
    }

    setIsAddEventModal(true);
  };

  const editDate = (data: any): void => {
    let obj = {
      event: {
        start: data.startStr,
        end: data.endStr,
      },
    };
    editEvent(obj as any);
  };

  const dateFormat = (dt: string | number | Date): string => {
    dt = new Date(dt);
    const month =
      dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
    const date = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
    const hours = dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours();
    const mins = dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes();
    dt = `${dt.getFullYear()}-${month}-${date}T${hours}:${mins}`;
    return dt;
  };

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  return (
    <div>
      <div className='calendar-panel mb-5'>
        <div className='calendar-header'>
          <div className='header-title'>
            <div className='calendar-title'>Calendar</div>
          </div>
        </div>
        <div className='calendar-wrapper'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView='dayGridMonth'
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            editable={true}
            dayMaxEvents={true}
            selectable={true}
            droppable={true}
            eventClick={(event: any) => editEvent(event)}
            select={(event: any) => editDate(event)}
            eventContent={(eventInfo) => {
              return (
                <div className='calendar-contain'>
                  <div>{eventInfo.timeText}</div>
                  <div className='ml-2'>{eventInfo.event.title}</div>
                  <div className='ml-2'>
                    {eventInfo.event.extendedProps?.label}
                  </div>
                </div>
              );
            }}
            dayCellContent={(dayCellInfo) => {
              const date = new Date(dayCellInfo.date);
              const isWeekend = date.getDay() === 0 || date.getDay() === 6;
              const isWeekday = date.getDay() >= 1 && date.getDay() <= 5;
              const isCurrentDate = isSameDay(date, now);
              const cellStyles = isCurrentDate ? 'bg-gray-300' : '';

              return (
                <div
                  className={`calendar-container ${
                    isWeekday ? 'bg-blue-100' : isWeekend ? 'bg-red-100' : ''
                  } ${cellStyles}`}
                >
                  <div className='text-lg font-semibold'>
                    {dayCellInfo.dayNumberText}
                  </div>
                  {isWeekend && (
                    <div className='text-xs text-red-500 mt-1'>Weekend</div>
                  )}
                  {isWeekday && (
                    <div className='text-xs text-blue-500 mt-1'>8:30 Hrs</div>
                  )}
                </div>
              );
            }}
          />
        </div>
      </div>

      <Transition appear show={isAddEventModal} as={Fragment}>
        <Dialog
          as='div'
          onClose={() => setIsAddEventModal(false)}
          open={isAddEventModal}
          className='fixed inset-0 z-50 overflow-y-auto'
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
            <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='calendar-dialog'>
              <Transition.Child
                as={Fragment}
                enter='duration-300 ease-out'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='duration-200 ease-in'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='modal-panel relative'>
                  <button
                    type='button'
                    className='modal-close-button absolute'
                    onClick={() => setIsAddEventModal(false)}
                  >
                    <IconX />
                  </button>
                  <div className='modal-header text-lg font-medium'>8h 30m</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Calendar;
