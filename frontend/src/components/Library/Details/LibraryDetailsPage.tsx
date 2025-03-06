import { LibraryData } from '@backend/Library/types.ts';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { LibraryAPIResponse } from '../LibraryPage';
import { useState } from 'react';
import LibraryDetailsContent from './LibraryDetailsContent';

export interface LibraryDetailsProps {
  nasaId: string;
}

// Environment variables.
const BACKEND_LIB_URL: string = import.meta.env.VITE_BACKEND_LIBRARY_URL;

const LibraryDetailsPage = (): React.JSX.Element => {
  const loc = useLocation();
  const searchParams = new URLSearchParams(loc.search);
  const [contentSource, setContentSource] = useState<string | undefined>();

  const fetchLibraryItem = async (): Promise<LibraryData | undefined> => {
    const url: string = `${BACKEND_LIB_URL}?${searchParams.toString()}`;
    const res: globalThis.Response = await fetch(url);
    const data: LibraryAPIResponse = await res.json();
    let item = undefined;
    if (data.items) {
      item = data.items[0];
    }

    if (item?.data[0].media_type === 'image') {
      const imageSource: string | undefined = item?.links.find((link) =>
        link.href.includes('~orig'),
      )?.href;
      setContentSource(imageSource);
    }

    // Audio and video contain are stored in a collection from which we must retrieve the appropriate source.
    if (item?.data[0].media_type === 'video') {
      const url: string = item.href;
      const res: globalThis.Response = await fetch(url);
      const data: string[] = await res.json();
      let videoSource: string | undefined = data.find((link) =>
        link.includes('~orig'),
      );
      videoSource = videoSource?.replace(/^http:\/\//, 'https://');
      setContentSource(videoSource);
    }

    if (item?.data[0].media_type === 'audio') {
      const url: string = item.href;
      const res: globalThis.Response = await fetch(url);
      const data: string[] = await res.json();
      const audioSource: string | undefined = data.find((link) =>
        link.includes('~orig'),
      );
      setContentSource(audioSource);
    }
    return item;
  };

  const { data: item, isLoading } = useQuery({
    queryKey: ['fetchLibraryItem', searchParams.toString()],
    queryFn: fetchLibraryItem,
    enabled: searchParams.toString() !== '',
    retry: 1,
  });

  return (
    <div className='flex h-full w-full max-w-7xl flex-col items-center px-4'>
      <LibraryDetailsContent
        isLoading={isLoading}
        contentSource={contentSource}
        item={item}
      />
    </div>
  );
};

export default LibraryDetailsPage;
