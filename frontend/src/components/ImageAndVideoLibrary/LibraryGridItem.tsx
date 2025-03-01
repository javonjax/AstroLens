import { LibraryData } from '@backend/MultimediaLibrary/types';

export interface LibraryGridItemProps {
  item?: LibraryData;
}

const LibraryGridItem = ({ item }: LibraryGridItemProps): React.JSX.Element => {
  console.log(item);
  return (
    <div className='duration-250 h-full max-h-[300px] cursor-pointer overflow-hidden rounded-lg border-2 border-white shadow-[0px_0px_8px_2px_rgba(255,255,255,0.36)] transition-shadow hover:shadow-[0px_0px_8px_8px_rgba(255,255,255,0.36)]'>
      <img
        alt={item?.data[0].title}
        className='h-[80%] w-full object-fill'
        src={item?.links[0].href}
      />
      <h2 className='break-words p-1 text-center'>{item?.data[0].title}</h2>
    </div>
  );
};

export default LibraryGridItem;
