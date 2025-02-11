import { DatePickerInput } from '@mantine/dates';
import { Calendar } from 'lucide-react';
import { useState } from 'react';

const DatePicker = () => {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className="flex border-2 border-white p-4 w-[400px]">
        <DatePickerInput
          label='Find an APOD by selecting a date'
          clearable
          placeholder='Pick a date'
          className='w-full' 
          allowDeselect
          leftSection={<Calendar size={16}/>}
          leftSectionPointerEvents='none'
          radius='md'
          minDate={new Date(1995, 5, 16)}
          maxDate={new Date()}
          date={date}
          onDateChange={setDate}
          firstDayOfWeek={0}
          hideOutsideDates
        />
    </div>
  )
}

export default DatePicker