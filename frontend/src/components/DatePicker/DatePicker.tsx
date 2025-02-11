import { DatePickerInput } from '@mantine/dates';
import { Calendar } from 'lucide-react';

export interface DatePickerProps {
  label: string;
  queryDate: Date | null;
  setQueryDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const DatePicker = ({
  label,
  queryDate,
  setQueryDate,
}: DatePickerProps): React.JSX.Element => {
  return (
    <DatePickerInput
      label={label || 'Pick a date'}
      clearable
      placeholder='Pick a date'
      className='grow p-4 w-full max-w-[400px]'
      allowDeselect
      leftSection={<Calendar size={16} />}
      leftSectionPointerEvents='none'
      radius='md'
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
