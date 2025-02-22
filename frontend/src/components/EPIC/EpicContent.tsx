import { Carousel, Embla } from '@mantine/carousel';
import { useState } from 'react';
import { EpicApiResponse } from '@backend/EPIC/types';

export interface EpicContentProps {
  imageData: EpicApiResponse | undefined;
}

const EpicContent = ({ imageData }: EpicContentProps) => {
  const [embla, setEmbla] = useState<Embla | null>(null);

  return (
    <div className='flex h-full w-full flex-col items-center justify-around border-2 border-white'>
      <div className='flex h-full max-h-[650px] w-full justify-center'>
        <div className='flex flex-col'>
          {imageData?.length &&
            imageData?.map((item) => {
              return <div>{item.image}</div>;
            })}
        </div>
        {/* epic pic carousel */}
        {/* <Carousel
          getEmblaApi={setEmbla}
          loop
          withIndicators
          height='100%'
          slideSize='100%'
          slideGap='md'
          style={{ flex: 1 }}
          align='center'
        >
          <Carousel.Slide>
            <div className='h-full w-full border-2 border-white'>hello</div>
          </Carousel.Slide>
          <Carousel.Slide>2</Carousel.Slide>
          <Carousel.Slide>3</Carousel.Slide>
          <Carousel.Slide>3</Carousel.Slide>
        </Carousel> */}

        {/* image info */}
        {/* <div className='h-[720px] w-[400px] border-2 border-white'></div> */}
      </div>
      <button onClick={() => embla?.scrollTo(0)}>hi</button>
      {/* image collection carousel */}
      <div className='h-[250px] w-full border-2 border-white'></div>
    </div>
  );
};

export default EpicContent;
