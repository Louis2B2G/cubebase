import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FiEdit2 } from 'react-icons/fi'; // Make sure to install react-icons

// Set up the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

// Update the meetings type
interface Meeting {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description: string;
  attendees: string[];
}

// Update sample meetings data
const meetings: Meeting[] = [
  {
    id: '1',
    title: 'Meeting with Steiner Logistics',
    start: new Date(moment().startOf('week').add(1, 'days').hour(10).minute(0).toDate()),
    end: new Date(moment().startOf('week').add(1, 'days').hour(11).minute(0).toDate()),
    description: 'Discuss logistics partnership opportunities',
    attendees: ['John Doe', 'Jane Smith'],
  },
  {
    id: '2',
    title: 'Product Demo for DSV',
    start: new Date(moment().startOf('week').add(3, 'days').hour(14).minute(0).toDate()),
    end: new Date(moment().startOf('week').add(3, 'days').hour(15).minute(30).toDate()),
    description: 'Showcase our latest logistics software solutions',
    attendees: ['John Doe', 'Sarah Johnson'],
  },
  {
    id: '3',
    title: 'Follow-up Call with Coca-Cola',
    start: new Date(moment().startOf('week').add(4, 'days').hour(11).minute(0).toDate()),
    end: new Date(moment().startOf('week').add(4, 'days').hour(11).minute(30).toDate()),
    description: 'Review proposal and address any questions',
    attendees: ['Jane Smith', 'Mike Brown'],
  },
];

interface MeetingPopupProps {
  meeting: Meeting | null;
  onClose: () => void;
}

const MeetingPopup: React.FC<MeetingPopupProps> = ({ meeting, onClose }) => {
  if (!meeting) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{meeting.title}</h2>
          <button className="text-[#fe5000]">
            <FiEdit2 size={20} />
          </button>
        </div>
        <div className="space-y-3 mb-6">
          <p className="text-gray-600">
            <span className="font-semibold">Start:</span> {moment(meeting.start).format('MMM D, YYYY h:mm A')}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">End:</span> {moment(meeting.end).format('MMM D, YYYY h:mm A')}
          </p>
          <div className="text-gray-600">
            <p className="font-semibold mb-1">Description:</p>
            <p>{meeting.description}</p>
          </div>
          <div className="text-gray-600">
            <p className="font-semibold mb-1">Attendees:</p>
            <p>{meeting.attendees.join(', ')}</p>
          </div>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-150"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-[#fe5000] text-white px-4 py-2 rounded-md hover:bg-[#fe5000] transition-colors duration-150"
          >
            Set Reminder
          </button>
        </div>
      </div>
    </div>
  );
};

const Meetings: React.FC = () => {
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  const handleSelectEvent = (event: Meeting) => {
    setSelectedMeeting(event);
  };

  return (
    <div className="p-6 bg-[#fcf9f8] min-h-screen">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Meetings booked by June</h1>
      <div className="bg-white rounded-xl shadow p-6" style={{ height: '800px' }}>
        <Calendar
          localizer={localizer}
          events={meetings}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          defaultView={Views.MONTH}
          views={['month', 'week', 'day', 'agenda']}
          toolbar={true}
          formats={{
            dateFormat: 'D',
            dayFormat: 'ddd D/M',
            monthHeaderFormat: 'MMMM YYYY',
          }}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: '#fff4e4',
              color: '#fe5000',
              border: 'none',
              borderRadius: '6px',
              padding: '4px 8px',
            },
          })}
          dayPropGetter={(date) => ({
            style: {
              backgroundColor: date.getDay() === 0 || date.getDay() === 6 ? 'white' : 'white',
            },
          })}
          onSelectEvent={handleSelectEvent}
        />
      </div>
      <MeetingPopup meeting={selectedMeeting} onClose={() => setSelectedMeeting(null)} />
    </div>
  );
};

export default Meetings;