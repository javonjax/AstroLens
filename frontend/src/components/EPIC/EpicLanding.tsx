import { data, useSearchParams } from 'react-router-dom';
import EpicContent from './EpicContent';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import DatePicker from '../DatePicker/DatePicker';
import SearchButton from '../UI/SearchButton';

const BACKEND_EPIC_URL = import.meta.env.VITE_BACKEND_EPIC_URL;

const EpicLanding = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryDate, setQueryDate] = useState<Date | null>(null);
  const fetchEpicImageData = async (): Promise<string> => {
    console.log('running func');
    const url: string = `${BACKEND_EPIC_URL}?${searchParams.toString()}`;
    const res: globalThis.Response = await fetch(url);
    const data = await res.json();
    console.log(data);
    return data;
  };

  const { data } = useQuery({
    queryKey: ['fetchEpicImageData', searchParams.toString()],
    queryFn: fetchEpicImageData,
  });

  useEffect(() => {
    console.log('param change');
  }, [searchParams]);

  useEffect(() => {
    if (queryDate) {
      const date: string = queryDate.toLocaleDateString('en-CA');
      console.log(date);
    }
  }, [queryDate]);

  return (
    <div className='flex h-full w-full max-w-7xl flex-col items-center px-4'>
      <div className='m-2 flex w-full items-center justify-center'>
        <DatePicker
          placeholder='Pick a date'
          queryDate={queryDate}
          setQueryDate={setQueryDate}
        />
        <SearchButton
          disabled={queryDate ? false : true}
          className='ml-4'
          onClick={() => {
            setSearchParams((prev) => {
              if (queryDate) {
                const date: string = queryDate.toLocaleDateString('en-CA');
                prev.set('date', date);
                prev.set('collection', 'natural');
              }
              return prev;
            });
          }}
        />
      </div>
      <EpicContent />
      <button
        onClick={() =>
          setSearchParams((prev) => {
            prev.set('q', 'hello');
            prev.set('date', Math.random().toString());
            return prev;
          })
        }
      >
        {' '}
        test button
      </button>
    </div>
  );
};

export default EpicLanding;
