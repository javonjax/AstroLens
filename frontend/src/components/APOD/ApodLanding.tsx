import { useState } from 'react';
import ApodContent from './ApodContent';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ApodSearchComponents from './ApodSearchComponents';

export interface Apod {
  title: string;
  date: string;
  explanation: string;
  url: string;
  hdurl: string;
  media_type: string;
  copyright?: string;
}

const BACKEND_APOD_API_URL: string = import.meta.env.VITE_BACKEND_APOD_URL;

const ApodLanding = (): React.JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryDate, setQueryDate] = useState<Date | null>(null);

  const fetchAPOD = async (): Promise<Apod> => {
    let url: string = `${BACKEND_APOD_API_URL}`;
    if (searchParams.get('date')) {
      url += `?${searchParams.toString()}`;
    }
    const res: globalThis.Response = await fetch(url);
    const data: Apod = await res.json();
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ['fetchAPOD', searchParams.toString()],
    queryFn: fetchAPOD,
    retry: 1,
  });

  return (
    <div className='flex h-full w-full flex-col items-center px-4'>
      <h1 className='m-2 text-center text-5xl'>Atronomy Picture of the Day</h1>
      <ApodSearchComponents
        queryDate={queryDate}
        setQueryDate={setQueryDate}
        setSearchParams={setSearchParams}
      />
      <ApodContent apod={data} isLoading={isLoading} />
    </div>
  );
};

export default ApodLanding;
