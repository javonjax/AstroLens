import { LibraryData } from '@backend/MultimediaLibrary/types';
import { Loader } from '@mantine/core';
import { motion } from 'framer-motion';
import { AudioLines } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export interface LibraryDetailsContentProps {
  item?: LibraryData;
  contentSource?: string;
  isLoading: boolean;
}

const LibraryDetailsContent = ({
  item,
  contentSource,
  isLoading,
}: LibraryDetailsContentProps): React.JSX.Element => {
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
    <>
      {isLoading && (
        <div className='flex h-full w-full items-center justify-center'>
          <Loader size={50} type='dots' />
        </div>
      )}
      {item && !isLoading && (
        <motion.div
          className='flex h-full w-full flex-col items-center justify-center gap-y-2'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: -50 },
          }}
        >
          {media_type === 'video' && (
            <div className='my-2 h-full max-h-[700px] w-full overflow-hidden rounded-lg border-2 border-white shadow-[0px_0px_8px_2px_rgba(255,255,255,0.36)]'>
              <iframe
                className='aspect-video h-full w-full'
                src={contentSource}
                title={`NASA library video ${title ? title : ''}`}
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
          <div className='flex flex-col items-start justify-center gap-y-2 rounded-lg border-2 border-white p-4 shadow-[0px_0px_8px_2px_rgba(255,255,255,0.36)]'>
            {title && <h1 className='text-3xl'>{title}</h1>}
            {keywords && (
              <div className='flex flex-wrap items-end gap-x-2'>
                <h2 className='text-xl'>Keywords:</h2>
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
                      className='text-yellow-500 underline'
                    >
                      {keyword}
                    </NavLink>
                  );
                })}
              </div>
            )}
            {photographer && (
              <div className='flex items-end gap-x-2'>
                <h2 className='text-xl'>Photographer:</h2>
                <span>{photographer}</span>
              </div>
            )}
            {dateCreated && (
              <div className='flex items-end gap-x-2'>
                <h2 className='text-xl'>Created:</h2>
                <span>{dateCreated}</span>
              </div>
            )}
            {location && (
              <div className='flex items-end gap-x-2'>
                <h2 className='text-xl'>Location:</h2>
                <span>{location}</span>
              </div>
            )}
            {center && (
              <div className='flex items-end gap-x-2'>
                <h2 className='text-xl'>Center:</h2>
                <span>{center}</span>
              </div>
            )}
            {/* A lot of the audio content in the media library includes a text transcript in place of a description. These transcripts can get lengthy, so they are excluded.*/}
            {description && media_type !== 'audio' && (
              <div>
                <h2 className='text-xl'>Description:</h2>
                <p>{description}</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default LibraryDetailsContent;
