import { LibraryData } from '@backend/MultimediaLibrary/types';

export interface LibraryGridItemProps {
  item?: LibraryData;
}

const LibraryGridItem = ({ item }: LibraryGridItemProps) => {
  return (
    <div
      key={item?.data[0].nasa_id}
      className='h-full max-h-[300px] cursor-pointer border-2 border-white'
    >
      <img
        alt={item?.data[0].title}
        className='h-[80%] w-full object-fill'
        src={item?.links[0].href}
      />
      <h1 className='break-words text-center'>{item?.data[0].title}</h1>
    </div>
  );
};

export default LibraryGridItem;
