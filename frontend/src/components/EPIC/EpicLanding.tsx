import { useSearchParams } from 'react-router-dom';
import EpicContent from './EpicContent';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import EpicSearchComponents from './EpicSearchComponents';
import { Embla } from '@mantine/carousel';
import { EpicAPIResponse } from '@backend/EPIC/types';

const BACKEND_EPIC_URL = import.meta.env.VITE_BACKEND_EPIC_URL;

export type ImageCollection = 'Natural' | 'Enhanced';

const EpicLanding = (): React.JSX.Element => {
  const [queryDate, setQueryDate] = useState<Date | null>(null); // Querying the API with no date param returns the most recent images.
  const [imageCollection, setImageCollection] =
    useState<ImageCollection>('Natural');
  const [searchParams, setSearchParams] = useSearchParams({
    collection: imageCollection,
  });
  const [embla, setEmbla] = useState<Embla | null>(null); // Carousel API.
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const fetchEpicImageData = async (): Promise<EpicAPIResponse> => {
    console.log('fetching');
    const url: string = `${BACKEND_EPIC_URL}?${searchParams.toString()}`;
    console.log('url', url);
    const res: globalThis.Response = await fetch(url);
    const data: EpicAPIResponse = await res.json();
    console.log('data', data);
    return data;
  };

  const { data: imageData } = useQuery({
    queryKey: ['fetchEpicImageData', searchParams.toString()],
    queryFn: fetchEpicImageData,
  });

  useEffect(() => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('collection', imageCollection.toLowerCase());
      return params;
    });
  }, [imageCollection]);

  // Register carousel event listener.
  useEffect(() => {
    if (!embla) {
      return;
    }
    const onSelect = (): void => setCurrentIndex(embla.selectedScrollSnap());
    embla.on('select', onSelect);
    onSelect();

    return () => {
      embla.off('select', onSelect);
    };
  }, [embla]);

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
      <EpicContent
        imageData={imageData}
        setEmbla={setEmbla}
        currentIndex={currentIndex}
      />
      <button
        onClick={() =>
          setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.set('q', 'hello');
            params.set('date', Math.random().toString());

            return params;
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
