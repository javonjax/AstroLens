import { Loader } from '@mantine/core';
import { Apod } from './ApodPage';
import { motion } from 'framer-motion';

export interface ApodContentProps {
  apod?: Apod;
  isLoading: boolean;
}

const ApodContent = ({
  apod,
  isLoading,
}: ApodContentProps): React.JSX.Element => {
  const formatDate = (date: string) => {
    return new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
      timeZone: 'America/New_York',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className='mb-4 flex h-full w-full max-w-7xl flex-col items-center'>
      {isLoading && (
        <div className='flex h-full w-full items-center justify-center'>
          <Loader size={50} type='dots' />
        </div>
      )}
      {apod && (
        <motion.div
          className='flex h-full w-full flex-col items-center'
          whileInView='visible'
          initial='hidden'
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: -50 },
          }}
        >
          <h1 className='mb-2 text-center text-3xl'>{formatDate(apod.date)}</h1>
          <div className='my-2 flex w-full max-w-7xl flex-col items-center text-center'>
            {apod.media_type === 'image' && (
              <a
                className='max-h-[600px] max-w-full overflow-hidden rounded-lg border-2 border-white shadow-[0px_0px_8px_2px_rgba(255,255,255,0.36)]'
                target='_blank'
                href={apod.hdurl}
              >
                <img
                  src={apod.url}
                  className='h-full w-full object-contain'
                ></img>
              </a>
            )}
            {apod.media_type === 'video' && (
              <div className='h-full max-h-[700px] w-full overflow-hidden rounded-lg border-2 border-white shadow-[0px_0px_8px_2px_rgba(255,255,255,0.36)]'>
                <iframe
                  className='aspect-video h-full w-full'
                  src={apod.url}
                  title='Astrology Video of the Day'
                  allowFullScreen={true}
                />
              </div>
            )}
            <div className='mb-2 mt-4 flex w-full flex-col items-center gap-y-2 rounded-lg border-2 border-white p-4 shadow-[0px_0px_8px_2px_rgba(255,255,255,0.36)]'>
              <h2 className='text-3xl'>{apod.title}</h2>
              {apod.copyright && (
                <h2 className='text-xl'>{`Image Credit: ${apod.copyright}`}</h2>
              )}
              <p>{apod.explanation}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ApodContent;
