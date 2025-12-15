import { Calendar, DateData } from 'react-native-calendars';

type Props = {
  selectedDate: string;
  onSelectDate: (date: string) => void;
};

export const CalendarPicker = ({ selectedDate, onSelectDate }: Props) => {
  return (
    <Calendar
      onDayPress={(day: DateData) => onSelectDate(day.dateString)}
      markedDates={{
        [selectedDate]: {
          selected: true,
          disableTouchEvent: true,
          selectedColor: '#6780f1',
          selectedTextColor: '#fff',
        },
      }}
      theme={{
        todayTextColor: '#6780f1',
        arrowColor: '#6780f1',
        textDayFontSize: 14,
        textMonthFontSize: 16,
        textMonthFontWeight: '600',
      }}
    />
  );
};
