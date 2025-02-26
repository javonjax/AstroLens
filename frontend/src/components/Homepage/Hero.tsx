import { motion } from 'framer-motion';
import { ChevronsDown } from 'lucide-react';

const Hero = () => {
  return (
    <>
      <div className='relative mb-4 flex h-[95vh] w-full flex-col items-center'>
        <img
          src='/cosmos.jpg'
          className='h-full min-h-[300px] w-full object-fill'
        ></img>
        <div className='translate-[-50%] absolute left-[50%] top-[40%] transform'>
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
              transition={{ duration: 1, delay: 0.75 }}
              variants={{
                visible: { opacity: 1 },
                hidden: { opacity: 0 },
              }}
            >
              High quality images and videos
            </motion.h2>
            <motion.h2
              className='text-center'
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.5 }}
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
          </div>
        </div>
        <button
          className='m-8 flex cursor-pointer flex-col items-center'
          onClick={() => {
            const element = document.getElementById('homepage-nav-cards');
            element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        >
          <p className='mb-4'>Get Started</p>
          <ChevronsDown size={72} className='animate-bounce' />
        </button>
      </div>
    </>
  );
};

export default Hero;
