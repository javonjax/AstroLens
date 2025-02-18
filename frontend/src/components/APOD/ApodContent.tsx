import { Search } from 'lucide-react';
import DatePicker from '../DatePicker/DatePicker';
import { Apod } from './ApodLanding';
import { useState } from 'react';
import SearchButton from '../UI/SearchButton';

export interface ApodContentProps {
  apod: Apod;
  fetchAPOD: (date: Date | null) => Promise<void>;
}

const ApodContent = ({
  apod: { title, date, explanation, url, hdurl, media_type, copyright },
  fetchAPOD: fetchAPOD,
}: ApodContentProps): React.JSX.Element => {
  const [queryDate, setQueryDate] = useState<Date | null>(null);
  const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString(
    'en-US',
    {
      timeZone: 'America/New_York',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    },
  );

  return (
    <>
      <div className='flex w-full max-w-7xl flex-col items-center px-4'>
        <div className='flex w-full items-center justify-center'>
          <DatePicker
            label='Find an APOD'
            queryDate={queryDate}
            setQueryDate={setQueryDate}
          />
          <SearchButton classname='ml-4' onClick={() => fetchAPOD(queryDate)} />
        </div>
        <div className='flex w-full max-w-7xl flex-col items-center text-center'>
          <h1 className='m-4 text-5xl'>Atronomy Picture of the Day</h1>
          <h1 className='m-4 text-5xl'>{formattedDate}</h1>
          {media_type === 'image' && (
            <a
              className='max-h-[600px] max-w-full'
              target='_blank'
              href={hdurl}
            >
              <img src={url} className='h-full w-full object-fill'></img>
            </a>
          )}
          {media_type === 'video' && (
            <iframe
              className='h-[600px] w-full'
              src={url}
              title='Astrology Video of the Day'
              allowFullScreen={true}
            />
          )}
          <h2 className='mt-2 text-3xl'>{title}</h2>
          <h2 className='text-xl'>
            {copyright ? `Image Credit: ${copyright}` : ''}
          </h2>
          <p className='my-2'>{explanation}</p>
        </div>
      </div>
    </>
  );
};

export default ApodContent;
