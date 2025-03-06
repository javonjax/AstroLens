import { EpicAPIResponse } from '@backend/EPIC/types.ts';
import { Carousel } from '@mantine/carousel';
import { EmblaCarouselType } from 'embla-carousel-react';

export interface EpicImageCarouselProps {
  imageData: EpicAPIResponse;
  setEmbla: React.Dispatch<React.SetStateAction<EmblaCarouselType | null>>;
}

const EpicImageCarousel = ({
  imageData,
  setEmbla,
}: EpicImageCarouselProps): React.JSX.Element => {
  return (
    <div className='flex h-full max-h-[800px] w-full max-w-[800px] flex-col justify-center rounded-lg border-2 border-white shadow-[0px_0px_8px_2px_rgba(255,255,255,0.36)]'>
      <h1 className='my-2 text-center text-3xl'>
        {new Date(imageData[0].date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </h1>
      <Carousel
        getEmblaApi={setEmbla}
        loop
        withIndicators
        height='100%'
        slideSize='90%'
        style={{ flex: 1 }}
        align='center'
        className='overflow-hidden rounded-lg'
      >
        {imageData.map((item) => {
          return (
            <Carousel.Slide key={`${item.image}`} className='-z-10'>
              {/* <a href={item.imageSourceUrl} target='_blank'> */}
              <img
                alt={`EPIC image from ${item.date}`}
                className='h-full max-w-full'
                src={item.imageSourceUrl}
              ></img>
              {/* </a> */}
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </div>
  );
};

export default EpicImageCarousel;
