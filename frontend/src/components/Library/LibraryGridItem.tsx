import { LibraryData } from '@backend/Library/types.ts';
import { AudioLines, Play } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export interface LibraryGridItemProps {
  item?: LibraryData;
}
// #TODO: render grid item based on media type use preview img.
const LibraryGridItem = ({ item }: LibraryGridItemProps): React.JSX.Element => {
  const mediaType = item?.data[0].media_type;
  const previewImage: string | undefined = item?.links?.find(
    (link) =>
      link.href.includes('~small') ||
      link.href.includes('~large') ||
      link.href.includes('thumb'),
  )?.href;

  return (
    <>
      {item && (
        <NavLink
          to={`/library/details?nasa_id=${item.data[0].nasa_id}`}
          state={item.data[0].nasa_id}
          className='flex h-[300px] cursor-pointer flex-col items-center rounded-lg'
        >
          {mediaType === 'audio' && (
            <div className='duration-250 flex h-[75%] w-full items-center justify-center overflow-hidden rounded-lg border-2 border-white transition-shadow hover:shadow-[0px_0px_8px_8px_rgba(255,255,255,0.36)]'>
              <AudioLines size={64} />
            </div>
          )}
          {mediaType === 'image' && (
            <div className='duration-250 h-[75%] w-full overflow-hidden rounded-lg border-2 border-white transition-shadow hover:shadow-[0px_0px_8px_8px_rgba(255,255,255,0.36)]'>
              <img
                alt={item.data[0].title}
                className='h-full w-full object-cover'
                src={previewImage}
              />
            </div>
          )}
          {mediaType === 'video' && (
            <div className='duration-250 relative h-[75%] w-full overflow-hidden rounded-lg border-2 border-white shadow-[0px_0px_8px_2px_rgba(255,255,255,0.36)] transition-shadow hover:shadow-[0px_0px_8px_8px_rgba(255,255,255,0.36)]'>
              <img
                alt={item.data[0].title}
                className='h-full w-full object-cover'
                src={previewImage}
              />
              <div className='translate-[-50%] backdrop absolute left-[50%] top-[50%] w-fit rounded-[50%] border-4 border-white p-2 backdrop-blur-lg'>
                <Play
                  size={48}
                  absoluteStrokeWidth={true}
                  strokeWidth={4}
                  className='translate-x-[2px]'
                />
              </div>
            </div>
          )}
          <div className='flex h-[25%] w-full items-center justify-center'>
            <h2 className='line-clamp-2 text-center'>{item?.data[0].title}</h2>
          </div>
        </NavLink>
      )}
    </>
  );
};

export default LibraryGridItem;
