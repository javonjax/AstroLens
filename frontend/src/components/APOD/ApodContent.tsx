import { Search } from 'lucide-react';
import DatePicker from '../DatePicker/DatePicker';
import { Apod } from './ApodLanding';
import { useState } from 'react';


export interface ApodContentProps {
  apod: Apod;
  fetchAPOD: (date: Date | null) => Promise<void>;
}

const ApodContent = ({
  apod: {
    title,
    date,
    explanation,
    url,
    hdurl,
    copyright,
  },
  fetchAPOD: fetchAPOD
}: ApodContentProps): React.JSX.Element => {
  const [queryDate, setQueryDate] = useState<Date | null>(null);
  const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
    timeZone: 'America/New_York',
    month: 'long', 
    day: 'numeric', 
    year: 'numeric'
  });

  return (
    <>
      <div className='flex flex-col items-center w-full max-w-7xl text-center'>
        <h1 className='text-5xl m-4'>Atronomy Picture of the Day</h1>
        <h1 className='text-5xl m-4'>{formattedDate}</h1>
        <a 
          className='max-h-[600px] max-w-full'
          target='_blank'
          href={hdurl}
          >
          <img src={url} className='w-full h-full object-fill'></img>
        </a>
        <h2 className='text-3xl mt-2'>{title}</h2>
        <h2 className='text-xl'>
          {copyright ? `Image Credit: ${copyright}` : ''}
        </h2>
        <p className='my-2'>{explanation}</p>
      </div>
      <div className='flex items-end justify-center w-full max-w-7xl'>
        
          <DatePicker
            label='Find an APOD'
            queryDate={queryDate}
            setQueryDate={setQueryDate}
          />
          <button
            type='button' 
            className='bg-yellow-300 hover:bg-yellow-200 p-4 mb-4 cursor-pointer text-black rounded-xl mt-4 h-[36px] flex items-center'
            onClick={() => fetchAPOD(queryDate)}
            >
            <Search size={16}/>
          </button>
      
      </div>
    </>
  );
};

export default ApodContent;
