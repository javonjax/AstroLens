import { data, useSearchParams } from 'react-router-dom';
import EpicContent from './EpicContent';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import DatePicker from '../UI/DatePicker';
import SearchButton from '../UI/SearchButton';
import { Input } from '@mantine/core';
import EpicSearchComponents from './EpicSearchComponents';
import { Embla } from '@mantine/carousel';

const BACKEND_EPIC_URL = import.meta.env.VITE_BACKEND_EPIC_URL;

export type ImageCollection = 'Natural' | 'Enhanced';

const EpicLanding = () => {
  const [queryDate, setQueryDate] = useState<Date | null>(null); // Querying the API with no date param returns the most recent images.
  const [imageCollection, setImageCollection] =
    useState<ImageCollection>('Natural');
  const [searchParams, setSearchParams] = useSearchParams({
    collection: imageCollection,
  });
  const [embla, setEmbla] = useState<Embla | null>(null); // Carousel API.
  const [currentIndex, setCurrentIndex] = useState<number>(0);
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
    setSearchParams((prev) => {
      prev.set('collection', imageCollection.toLowerCase());
      return prev;
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
