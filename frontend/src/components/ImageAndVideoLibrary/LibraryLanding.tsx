import { useEffect, useState } from 'react';
import LibrarySearch, { MediaType } from './LibrarySearch';
import { LibraryResponseData } from '../../../../backend/src/libraryRoutes/libraryRoutes.ts';
import LibraryContent from './LibraryContent.tsx';
import { useSearchParams } from 'react-router-dom';

// Environment variables.
const BACKEND_LIB_URL = import.meta.env.VITE_BACKEND_LIBRARY_URL;

const LibraryLanding = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<
    LibraryResponseData[] | undefined
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
      const searchResults: LibraryResponseData[] = await res.json();
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

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    // Set search params here. When they update, the useEffect is triggered to fetch data.
    const mediaTypes: string = Object.keys(queryMediaTypes)
      .filter((key) => queryMediaTypes[key as MediaType])
      .join(',');

    setSearchParams((prev) => {
      prev.set('q', inputValue);
      prev.set('media_type', mediaTypes);
      return prev;
    });
  };

  const onClickSuggestedTerm = async (searchTerm: string) => {
    // Set search params here. When they update, the useEffect is triggered to fetch data.
    const mediaTypes: string = Object.keys(queryMediaTypes)
      .filter((key) => queryMediaTypes[key as MediaType])
      .join(',');

    // Search bar input is set as a reminder of what suggeted term was selected.
    setInputValue(searchTerm);
    setSearchParams((prev) => {
      prev.set('q', searchTerm);
      prev.set('media_type', mediaTypes);
      return prev;
    });
  };

  return (
    <div className='flex h-full w-full max-w-7xl flex-col items-center px-4'>
      <LibrarySearch
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSearch={onSearch}
        queryMediaTypes={queryMediaTypes}
        handleCheck={handleCheck}
      />
      <LibraryContent
        content={searchResults}
        onClickSuggestedTerm={onClickSuggestedTerm}
      />
    </div>
  );
};

export default LibraryLanding;
