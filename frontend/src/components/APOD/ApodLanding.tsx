import { useEffect, useState } from 'react';
import ApodContent from './ApodContent';
import { useLocation } from 'react-router-dom';


export interface Apod {
  title: string;
  date: string;
  explanation: string;
  url: string;
  hdurl: string;
  copyright?: string;
}

const BACKEND_APOD_API_URL: string = import.meta.env.VITE_BACKEND_APOD_URL;

const ApodLanding = (): React.JSX.Element => {
  const path: string = useLocation().pathname.slice(1).toLowerCase();
  console.log(path)
  const [apod, setApod] = useState<Apod>();

  const fetchAPOD = async (date: Date | null = null): Promise<void> => {
    let url: string = BACKEND_APOD_API_URL;
    if (date) {
      const queryDate: string = date.toLocaleDateString('en-CA'); 
      url += `?date=${queryDate}`
    }
    const res: globalThis.Response = await fetch(url);
    const apodData: Apod = await res.json();
    setApod(apodData);
  };

  useEffect(() => {
    fetchAPOD();
  }, []);

  return (
    <div className='h-full w-full max-w-7xl px-4'>
      {apod && <ApodContent apod={apod} fetchAPOD={fetchAPOD}/>}
    </div>
  );
};

export default ApodLanding;
