import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export interface apod {
  [key: string]: string;
}

const BACKEND_APOD_API_URL: string = import.meta.env.VITE_BACKEND_APOD_URL;

const ApodLanding = (): React.JSX.Element => {
  const [apod, setApod] = useState<apod>();

  useEffect(() => {
    const fetchAPOD = async (): Promise<void> => {
      const res: globalThis.Response = await fetch(BACKEND_APOD_API_URL);
      const apodData: apod = await res.json();
      setApod(apodData);
    };

    fetchAPOD();
  }, []);

  return (
    <div className='h-full w-full max-w-7xl px-4'>
      <div className='flex flex-col items-center h-full w-full border-2 border-white max-w-7xl text-center'>
        <h1 className='text-5xl m-4'>
          Atronomy Picture of the Day
        </h1>
        <h1 className='text-5xl m-4'>
          {apod?.date}
        </h1>
        <div className='h-[600px] w-full border-2 border-white'>
          <img src={apod?.hdurl} className='w-full h-full object-fill'></img>
        </div>
        <h2 className='text-3xl mt-2'>{apod?.title}</h2>
        <h2 className='text-xl'>{apod?.copyright ? `Image Credit & Copyright: ${apod.copyright}` : ''}</h2>
        <p className='my-2'>
          {apod?.explanation}
        </p>
        <div className='flex flex-col items-center justify-center'>
           <h2 className='text-xl'>
            Find a previous picture of the day
           </h2>
            <div className='flex items-center justify-between'>
              <input type='date' className='border-2 border-white rounded-2xl p-4'></input>
              <button className="bg-yellow-300 p-4 m-4 cursor-pointer text-black rounded-2xl mt-4 hover:bg-yellow-200">
                <Search />
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ApodLanding;
