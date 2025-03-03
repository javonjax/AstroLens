import { LibraryData, LibraryItem } from '@backend/MultimediaLibrary/types';
import { useQuery } from '@tanstack/react-query';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { LibraryAPIResponse } from '../LibraryPage';
import { AudioLines, CirclePlay } from 'lucide-react';
import { useState } from 'react';

export interface LibraryDetailsProps {
  nasaId: string;
}

// Environment variables.
const BACKEND_LIB_URL: string = import.meta.env.VITE_BACKEND_LIBRARY_URL;

const LibraryDetailsPage = () => {
  const loc = useLocation();
  const searchParams = new URLSearchParams(loc.search);
  const [contentSource, setContentSource] = useState<string | undefined>();
  console.log(contentSource);
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
      const videoSource: string | undefined = data.find((link) =>
        link.includes('~orig'),
      );
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
    console.log(item);
    return item;
  };

  const { data: item, isLoading } = useQuery({
    queryKey: ['fetchLibraryItem', searchParams.toString()],
    queryFn: fetchLibraryItem,
    enabled: searchParams.toString() !== '',
    retry: 1,
  });

  const title: string | undefined = item?.data[0].title;
  const nasaId: string | undefined = item?.data[0].nasa_id;
  const dateCreated: string | undefined = new Date(
    item?.data[0].date_created || '',
  ).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const center: string | undefined = item?.data[0].center;
  const description: string | undefined = item?.data[0].description;
  const keywords: string[] | undefined = item?.data[0].keywords;
  const media_type: string | undefined = item?.data[0].media_type;
  const location: string | undefined = item?.data[0].location;
  const photographer: string | undefined = item?.data[0].photographer;

  return (
    <div className='flex h-full w-full max-w-7xl flex-col items-center px-4'>
      {item && (
        <div className='flex h-full w-full flex-col items-center'>
          <h1 className='mb-2 text-center text-3xl'>{title}</h1>
          {media_type === 'video' && (
            <div className='my-2 h-full max-h-[700px] w-full overflow-hidden rounded-lg border-2 border-white shadow-[0px_0px_8px_2px_rgba(255,255,255,0.36)]'>
              <iframe
                className='aspect-video h-full w-full'
                src={contentSource}
                title='Astrology Video of the Day'
                allowFullScreen={true}
              />
            </div>
          )}
          {media_type === 'image' && (
            <div className='my-2 max-h-[600px] max-w-full overflow-hidden rounded-lg border-2 border-white shadow-[0px_0px_8px_2px_rgba(255,255,255,0.36)]'>
              <img
                className='h-full w-full object-contain'
                alt={title}
                src={contentSource}
              ></img>
            </div>
          )}
          {media_type === 'audio' && (
            <div className='my-2 flex aspect-video h-full max-h-[700px] w-full flex-col items-center overflow-hidden rounded-lg border-2 border-white shadow-[0px_0px_8px_2px_rgba(255,255,255,0.36)]'>
              <div className='flex h-full w-full items-center justify-center'>
                <AudioLines size={116} />
              </div>
              <audio controls className='w-full'>
                <source src={contentSource}></source>
              </audio>
            </div>
          )}

          <div>NASA ID: {nasaId}</div>
          <div>Created: {dateCreated}</div>
          <div>Center: {center}</div>
          {photographer && <div>Photographer: {photographer}</div>}
          <div>{description}</div>
          {keywords && (
            <div className=''>
              Keywords:{' '}
              {keywords?.map((keyword) => {
                const searchParams: string = new URLSearchParams({
                  q: keyword,
                  media_type: 'image,video,audio',
                  year_start: '1920',
                  year_end: new Date().getFullYear().toString(),
                  page: '1',
                }).toString();
                return (
                  <NavLink
                    to={`/library?${searchParams}`}
                    className='mx-2 text-yellow-500 underline'
                  >
                    {keyword}
                  </NavLink>
                );
              })}
            </div>
          )}
          {/* <div className='h-full w-[50%] border-2 border-white'>
            {item.data[0].title}
          </div> */}
        </div>
      )}
    </div>
  );
};

export default LibraryDetailsPage;
