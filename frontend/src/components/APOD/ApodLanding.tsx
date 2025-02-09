import { useEffect, useState } from 'react';

export interface apod {
  [key: string]: string;
}

const BACKEND_APOD_API_URL: string = import.meta.env.VITE_BACKEND_APOD_URL;

const ApodLanding = (): React.JSX.Element => {
  const [apod, setApod] = useState<apod>();

  
  // useEffect(() => {
  //   const fetchAPOD = async (): Promise<void> => {
  //     const res: globalThis.Response = await fetch(BACKEND_APOD_API_URL);
  //     const apodData: apod = await res.json();
  //     setApod(apodData);
  //   };

  //   fetchAPOD();
  // }, [])
  
  return (
    <div className='flex flex-col items-center h-full w-full border-2 border-white max-w-7xl text-center'>
      <h1 className='text-5xl p-4'>
        Atronomy Picture of the Day 
        <br/> 
        {apod?.date}
      </h1>
      <div className='h-[600px] w-full border-2 border-white'>
        <img src={apod?.hdurl}></img>
      </div>
      <h2>{apod?.title}</h2>
      <p>
        description
      </p>
      <a>check out more</a>
    </div>
  );
};

export default ApodLanding;
