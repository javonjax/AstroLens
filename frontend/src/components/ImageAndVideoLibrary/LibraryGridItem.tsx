import { LibraryData } from '@backend/MultimediaLibrary/types';

export interface LibraryGridItemProps {
  item?: LibraryData;
}

const LibraryGridItem = ({ item }: LibraryGridItemProps): React.JSX.Element => {
  return (
    <div
      key={item?.data[0].nasa_id}
      className='h-full max-h-[300px] cursor-pointer'
    >
      <img
        alt={item?.data[0].title}
        className='h-[80%] w-full object-fill'
        src={item?.links[0].href}
      />
      <h2 className='break-words text-center'>{item?.data[0].title}</h2>
    </div>
  );
};

export default LibraryGridItem;
