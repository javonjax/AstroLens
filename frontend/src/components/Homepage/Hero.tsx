import { motion } from 'framer-motion';
import { ChevronsDown } from 'lucide-react';

const Hero = (): React.JSX.Element => {
  return (
    <>
      <div className='relative mb-2 flex h-[80vh] min-h-[400px] w-full flex-col items-center overflow-hidden'>
        <img
          alt='Night sky'
          src='/space_landscape.jpg'
          className='relative h-full w-full object-cover'
        ></img>
        <div className='translate-[-50%] absolute left-[50%] top-[50%] transform'>
          <div className='flex flex-col items-center'>
            <motion.h1
              className='text-center text-4xl md:text-5xl xl:text-6xl'
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              variants={{
                visible: { opacity: 1 },
                hidden: { opacity: 0 },
              }}
            >
              Explore the Universe
            </motion.h1>
            <motion.h2
              className='my-2 text-center text-[1.25rem] md:text-2xl'
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              variants={{
                visible: { opacity: 1 },
                hidden: { opacity: 0 },
              }}
            >
              High quality images, videos, and audio.
            </motion.h2>
            <motion.h2
              className='text-center md:text-xl'
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1 }}
              variants={{
                visible: { opacity: 1 },
                hidden: { opacity: 0 },
              }}
            >
              Powered by{' '}
              <a
                target='_blank'
                href='https://api.nasa.gov/'
                className='text-yellow-500 underline'
              >
                NASA APIs
              </a>
            </motion.h2>
            <motion.button
              className='mt-2 flex cursor-pointer flex-col items-center'
              onClick={() => {
                const element = document.getElementById('homepage-nav-cards');
                element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.5 }}
              variants={{
                visible: { opacity: 1 },
                hidden: { opacity: 0 },
              }}
            >
              <h2 className='mb-4 md:text-xl'>Get Started</h2>
              <ChevronsDown size={64} className='m-0 animate-bounce' />
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
