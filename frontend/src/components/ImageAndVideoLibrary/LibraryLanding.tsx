import { useState } from 'react';
import LibrarySearch, { MediaType } from './LibrarySearch';
import { LibraryResponseData } from '../../../../backend/src/libraryRoutes/libraryRoutes.ts';
import LibraryContent from './LibraryContent.tsx';

// Environment variables.
const BACKEND_LIB_URL = import.meta.env.VITE_BACKEND_LIBRARY_URL;

const LibraryLanding = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<
    LibraryResponseData[] | undefined
  >();
  const [checked, setChecked] = useState<Record<MediaType, boolean>>({
    image: true,
    video: true,
    audio: true,
  });

  const handleCheck = (mediaType: MediaType) => {
    setChecked((prev) => ({
      ...prev,
      [mediaType]: !prev[mediaType],
    }));
  };

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    // Construct query params.
    const mediaTypes: string = Object.keys(checked)
      .filter((key) => checked[key as MediaType])
      .join(',');

    const queryParams: Record<string, string | number> = {
      q: searchValue,
      media_type: mediaTypes,
    };

    const paramString: string = Object.entries(queryParams)
      .map(([key, value]) => {
        return `${key}=${value}`;
      })
      .join('&');

    const url: string = `${BACKEND_LIB_URL}?${paramString}`;

    // Fetch data.
    const res: globalThis.Response = await fetch(url);
    const searchResults: LibraryResponseData[] = await res.json();
    console.log(searchResults);
    setSearchResults(searchResults);
  };

  return (
    <div className='flex h-full w-full max-w-7xl flex-col items-center px-4'>
      <LibrarySearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onSearch={onSearch}
        checked={checked}
        handleCheck={handleCheck}
      />
      <LibraryContent content={searchResults} />
    </div>
  );
};

export default LibraryLanding;
