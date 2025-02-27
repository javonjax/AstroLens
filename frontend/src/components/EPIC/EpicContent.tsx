import { EpicAPIResponse } from '@backend/EPIC/types';
import EpicImageCarousel from './EpicImageCarousel';
import EpicData from './EpicData';
import { EmblaCarouselType } from 'embla-carousel-react';

export interface EpicContentProps {
  imageData: EpicAPIResponse | undefined;
  setEmbla: React.Dispatch<React.SetStateAction<EmblaCarouselType | null>>;
  currentIndex: number;
}

const EpicContent = ({
  imageData,
  setEmbla,
  currentIndex,
}: EpicContentProps): React.JSX.Element => {
  return (
    <div className='flex w-full flex-col items-center justify-around border-2 border-white'>
      {imageData?.length ? (
        <>
          <EpicImageCarousel imageData={imageData} setEmbla={setEmbla} />
          <EpicData imageData={imageData} currentIndex={currentIndex} />
        </>
      ) : (
        <div>No images found from that date.</div>
      )}
    </div>
  );
};

export default EpicContent;
