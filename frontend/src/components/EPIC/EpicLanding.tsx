import { data, useSearchParams } from 'react-router-dom';
import EpicContent from './EpicContent';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import DatePicker from '../DatePicker/DatePicker';
import SearchButton from '../UI/SearchButton';
import { Input } from '@mantine/core';
import EpicSearchComponents from './EpicSearchComponents';

const BACKEND_EPIC_URL = import.meta.env.VITE_BACKEND_EPIC_URL;

export type ImageCollection = 'Natural' | 'Enhanced';

const EpicLanding = () => {
  // Date is initially null because excluding the date from requests to the NASA EPIC API
  // will return the most recent image collection.
  const [queryDate, setQueryDate] = useState<Date | null>(null);
  const [imageCollection, setImageCollection] =
    useState<ImageCollection>('Natural');
  const [searchParams, setSearchParams] = useSearchParams({
    collection: imageCollection,
  });
  const fetchEpicImageData = async () => {
    console.log('fetching');
    const url: string = `${BACKEND_EPIC_URL}?${searchParams.toString()}`;
    console.log('url', url);
    const res: globalThis.Response = await fetch(url);
    const data = await res.json();
    console.log('data', data);
    return data;
  };

  const { data: imageData } = useQuery({
    queryKey: ['fetchEpicImageData', searchParams.toString()],
    queryFn: fetchEpicImageData,
  });

  useEffect(() => {
    console.log('param change', searchParams);
  }, [searchParams]);

  useEffect(() => {
    if (queryDate) {
      const date: string = queryDate.toLocaleDateString('en-CA');
      console.log(date);
    }
  }, [queryDate]);

  return (
    <div className='flex h-full w-full max-w-7xl flex-col items-center px-4'>
      <h1 className='m-2 text-center text-5xl'>
        Earth Polychromatic Imaging Camera (EPIC)
      </h1>
      <EpicSearchComponents
        queryDate={queryDate}
        setQueryDate={setQueryDate}
        setSearchParams={setSearchParams}
        imageCollection={imageCollection}
        setImageCollection={setImageCollection}
      />
      <EpicContent imageData={imageData} />
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
