import { SetURLSearchParams } from 'react-router-dom';
import DatePicker from '../UI/DatePicker';
import SearchButton from '../UI/SearchButton';

export interface ApodSearchComponentsProps {
  queryDate: Date | null;
  setQueryDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setSearchParams: SetURLSearchParams;
}

const ApodSearchComponents = ({
  queryDate,
  setQueryDate,
  setSearchParams,
}: ApodSearchComponentsProps) => {
  return (
    <div className='flex w-full items-center justify-center'>
      <DatePicker
        placeholder='Pick a date'
        queryDate={queryDate}
        setQueryDate={setQueryDate}
      />
      <SearchButton
        className='ml-4'
        onClick={() => {
          if (queryDate) {
            setSearchParams((prev) => {
              const date: string = queryDate.toLocaleDateString('en-CA');
              const params = new URLSearchParams(prev);
              params.set('date', date);
              return params;
            });
          }
        }}
        disabled={queryDate ? false : true}
      />
    </div>
  );
};

export default ApodSearchComponents;
