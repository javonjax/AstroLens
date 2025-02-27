import { useState } from 'react';
import LibrarySearch, { MediaType } from './LibrarySearchComponents.tsx';
import LibraryContent from './LibraryContent.tsx';
import { useSearchParams } from 'react-router-dom';
import { LibraryData } from '@backend/MultimediaLibrary/types.ts';
import { useQuery } from '@tanstack/react-query';

export interface LibraryAPIResponse {
  items?: LibraryData[];
  next?: string;
  prev?: string;
}

// Environment variables.
const BACKEND_LIB_URL = import.meta.env.VITE_BACKEND_LIBRARY_URL;

const LibraryLanding = (): React.JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState<string>(''); // Search bar input.
  const [yearRange, setYearRange] = useState<[number, number]>([
    // Date range slider values.
    1920,
    new Date().getFullYear(),
  ]);
  const [queryMediaTypes, setQueryMediaTypes] = useState<
    Record<MediaType, boolean>
  >({
    // Media type controlled by checkboxes.
    image: true,
    video: true,
    audio: true,
  });

  // Query function.
  const fetchLibraryData = async (): Promise<LibraryAPIResponse> => {
    const url: string = `${BACKEND_LIB_URL}?${searchParams.toString()}`;
    const res: globalThis.Response = await fetch(url);
    const data: LibraryAPIResponse = await res.json();
    return data;
  };

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['fetchLibraryData', searchParams.toString()],
    queryFn: fetchLibraryData,
    enabled: searchParams.toString() !== '',
    retry: 1,
  });

  // Event handlers.
  const handleCheck = (mediaType: MediaType) => {
    setQueryMediaTypes((prev) => ({
      ...prev,
      [mediaType]: !prev[mediaType],
    }));
  };

  const onSearch = (e: React.FormEvent, searchTerm?: string) => {
    e.preventDefault();
    if (!isFetching) {
      const mediaTypes: string = Object.keys(queryMediaTypes)
        .filter((key) => queryMediaTypes[key as MediaType])
        .join(',');

      // Fill in the search bar if a suggested term button is used for searching.
      if (searchTerm) {
        setInputValue(searchTerm);
      }

      //When search params update, the useEffect is triggered to fetch data.
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set('q', searchTerm ? searchTerm : inputValue);
        params.set('media_type', mediaTypes);
        params.set('year_start', String(yearRange[0]));
        params.set('year_end', String(yearRange[1]));
        params.set('page', '1');
        return params;
      });
    }
  };

  return (
    <div className='flex h-full w-full max-w-7xl flex-col items-center px-4'>
      <h1 className='m-2 text-center text-5xl'>
        Explore the NASA multimedia library.
      </h1>
      <LibrarySearch
        inputValue={inputValue}
        setInputValue={setInputValue}
        yearRange={yearRange}
        setYearRange={setYearRange}
        onSearch={onSearch}
        queryMediaTypes={queryMediaTypes}
        handleCheck={handleCheck}
      />
      <LibraryContent
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        content={data?.items}
        isLoading={isLoading}
        onClickSuggestedTerm={onSearch}
        next={data?.next}
        prev={data?.prev}
      />
    </div>
  );
};

export default LibraryLanding;
