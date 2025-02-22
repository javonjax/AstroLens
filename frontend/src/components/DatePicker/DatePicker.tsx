import { Button, Stack } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { Calendar } from 'lucide-react';

export interface DatePickerProps {
  placeholder?: string;
  queryDate: Date | null;
  setQueryDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const DatePicker = ({
  placeholder,
  queryDate,
  setQueryDate,
}: DatePickerProps): React.JSX.Element => {
  /*
    Styling for this component is added through the Mantine styles API rather than tailwind.
  */
  return (
    <DatePickerInput
      clearable
      placeholder={placeholder}
      styles={{
        root: {
          marginBottom: '1rem',
          marginTop: '1rem',
          width: '100%',
          maxWidth: '400px',
        },
      }}
      allowDeselect
      leftSection={<Calendar size={16} />}
      leftSectionPointerEvents='none'
      minDate={new Date(1995, 5, 16)}
      maxDate={new Date()}
      value={queryDate}
      onChange={setQueryDate}
      firstDayOfWeek={0}
      hideOutsideDates
    />
  );
};

export default DatePicker;
