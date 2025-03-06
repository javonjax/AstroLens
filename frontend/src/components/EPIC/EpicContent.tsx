import { EpicAPIResponse } from '@backend/EPIC/types.ts';
import EpicImageCarousel from './EpicImageCarousel';
import EpicData from './EpicData';
import { EmblaCarouselType } from 'embla-carousel-react';
import { Loader } from '@mantine/core';
import { motion } from 'framer-motion';
import { ImageOff } from 'lucide-react';

export interface EpicContentProps {
  imageData: EpicAPIResponse | undefined;
  setEmbla: React.Dispatch<React.SetStateAction<EmblaCarouselType | null>>;
  currentIndex: number;
  isLoading: boolean;
}

const EpicContent = ({
  imageData,
  setEmbla,
  currentIndex,
  isLoading,
}: EpicContentProps): React.JSX.Element => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      {isLoading && (
        <div className='flex h-full min-h-[100vh] w-full items-center justify-center'>
          <Loader size={50} type='dots' />
        </div>
      )}
      {imageData?.length && !isLoading && (
        <motion.div
          className='flex h-full w-full flex-col items-center'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: -50 },
          }}
        >
          <EpicImageCarousel imageData={imageData} setEmbla={setEmbla} />
          <div className='mt-4 h-full w-full rounded-lg border-2 border-white shadow-[0px_0px_8px_2px_rgba(255,255,255,0.36)]'>
            <EpicData imageData={imageData} currentIndex={currentIndex} />
          </div>
        </motion.div>
      )}
      {!imageData?.length && !isLoading && (
        <div className='my-4 flex flex-col items-center'>
          <div className='text-center text-3xl'>
            No images found from that date.
          </div>
          <ImageOff size={64} className='mt-4' />
        </div>
      )}
    </div>
  );
};

export default EpicContent;
