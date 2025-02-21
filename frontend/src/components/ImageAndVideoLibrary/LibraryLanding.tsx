import { useEffect, useState } from 'react';
import LibrarySearch, { MediaType } from './LibrarySearch';
import { LibraryData } from '@backend/MultimediaLibrary/libraryRoutes.ts';
import LibraryContent from './LibraryContent.tsx';
import { useSearchParams } from 'react-router-dom';

// Environment variables.
const BACKEND_LIB_URL = import.meta.env.VITE_BACKEND_LIBRARY_URL;

const LibraryLanding = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState<string>('');
  const [yearRange, setYearRange] = useState<[number, number]>([
    1920,
    new Date().getFullYear(),
  ]);
  const [searchResults, setSearchResults] = useState<
    LibraryData[] | undefined
  >();
  const [queryMediaTypes, setQueryMediaTypes] = useState<
    Record<MediaType, boolean>
  >({
    image: true,
    video: true,
    audio: true,
  });
  useEffect(() => {
    const fetchLibraryData = async () => {
      const url: string = `${BACKEND_LIB_URL}?${searchParams.toString()}`;
      const res: globalThis.Response = await fetch(url);
      const searchResults: LibraryData[] = await res.json();
      console.log(searchResults);
      setSearchResults(searchResults);
    };

    // Only fetch if there are query params.
    if (searchParams.size > 0) {
      fetchLibraryData();
    }
  }, [searchParams]);

  // Event handlers.
  const handleCheck = (mediaType: MediaType) => {
    setQueryMediaTypes((prev) => ({
      ...prev,
      [mediaType]: !prev[mediaType],
    }));
  };

  const onSearch = async (e: React.FormEvent, searchTerm?: string) => {
    e.preventDefault();
    const mediaTypes: string = Object.keys(queryMediaTypes)
      .filter((key) => queryMediaTypes[key as MediaType])
      .join(',');

    // Fill in the search bar if a suggested term button is used for searching.
    if (searchTerm) {
      setInputValue(searchTerm);
    }

    //When search params update, the useEffect is triggered to fetch data.
    setSearchParams((prev) => {
      prev.set('q', searchTerm ? searchTerm : inputValue);
      prev.set('media_type', mediaTypes);
      prev.set('year_start', String(yearRange[0]));
      prev.set('year_end', String(yearRange[1]));
      return prev;
    });
  };

  return (
    <div className='flex h-full w-full max-w-7xl flex-col items-center px-4'>
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
        searchParam={searchParams.get('q')}
        content={searchResults}
        onClickSuggestedTerm={onSearch}
      />
    </div>
  );
};

export default LibraryLanding;
