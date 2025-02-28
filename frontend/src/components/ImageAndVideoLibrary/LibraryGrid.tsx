import { LibraryData } from '@backend/MultimediaLibrary/types';
import LibraryGridItem from './LibraryGridItem';
import React from 'react';

interface LibraryGridProps {
  content?: LibraryData[];
}
const LibraryGrid = ({ content }: LibraryGridProps): React.JSX.Element => {
  return (
    <div className='m-4 grid h-full w-full grid-cols-[repeat(auto-fit,minmax(350px,30%))] justify-center gap-x-12 gap-y-12'>
      {content?.map((item) => {
        return <LibraryGridItem item={item} key={item.data[0].nasa_id} />;
      })}
    </div>
  );
};

export default LibraryGrid;
