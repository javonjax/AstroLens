import { useEffect, useState } from 'react';
import ApodContent from './ApodContent';

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
  const [apod, setApod] = useState<Apod>();

  const fetchAPOD = async (date: Date | null = null): Promise<void> => {
    let url: string = BACKEND_APOD_API_URL;
    if (date) {
      const queryDate: string = date.toLocaleDateString('en-CA');
      url += `?date=${queryDate}`;
    }
    const res: globalThis.Response = await fetch(url);
    const apodData: Apod = await res.json();
    setApod(apodData);
  };

  useEffect(() => {
    fetchAPOD();
  }, []);

  return (
    <div className='flex h-full w-full flex-col items-center'>
      {apod && <ApodContent apod={apod} fetchAPOD={fetchAPOD} />}
    </div>
  );
};

export default ApodLanding;
