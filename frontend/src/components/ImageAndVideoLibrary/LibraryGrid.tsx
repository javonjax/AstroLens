import { LibraryData } from '@backend/MultimediaLibrary/types';
import LibraryGridItem from './LibraryGridItem';
import { motion } from 'framer-motion';
import React from 'react';

interface LibraryGridProps {
  content?: LibraryData[];
}
const LibraryGrid = ({ content }: LibraryGridProps): React.JSX.Element => {
  return (
    <motion.div
      className='m-4 grid h-full w-full grid-cols-[repeat(auto-fit,minmax(350px,30%))] justify-center gap-x-12 gap-y-12'
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5 }}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
    >
      {content?.map((item) => {
        return <LibraryGridItem item={item} key={item.data[0].nasa_id} />;
      })}
    </motion.div>
  );
};

export default LibraryGrid;
