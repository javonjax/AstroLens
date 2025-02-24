import { EpicApiResponse } from '@backend/EPIC/types';
import { Carousel } from '@mantine/carousel';
import { EmblaCarouselType } from 'embla-carousel-react';

export interface EpicImageCarouselProps {
  imageData: EpicApiResponse;
  setEmbla: React.Dispatch<React.SetStateAction<EmblaCarouselType | null>>;
}

const EpicImageCarousel = ({ imageData, setEmbla }: EpicImageCarouselProps) => {
  return (
    <div className='flex h-full max-h-[800px] w-full max-w-[800px] justify-center'>
      <Carousel
        getEmblaApi={setEmbla}
        loop
        withIndicators
        height='100%'
        slideSize='90%'
        style={{ flex: 1 }}
        align='center'
      >
        {imageData.map((item) => {
          return (
            <Carousel.Slide
              key={`${item.image}`}
              styles={{
                slide: { zIndex: '-10' },
              }}
            >
              <a className='mb-8' href={item.imageSourceUrl} target='_blank'>
                <img
                  className='object-fit h-auto max-w-full'
                  src={item.imageSourceUrl}
                ></img>
              </a>
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </div>
  );
};

export default EpicImageCarousel;
