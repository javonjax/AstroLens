import { motion } from 'framer-motion';
import { ChevronsDown } from 'lucide-react';

const Hero = () => {
  return (
    <>
      <div className='relative mb-4 flex h-[95vh] w-full flex-col items-center'>
        <img
          src='/cosmos.jpg'
          className='h-full min-h-[250px] w-full object-cover'
        ></img>
        <motion.div
          className='translate-[-50%] absolute left-[50%] top-[40%] transform'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
        >
          <h1 className='text-7xl'>Explore the Universe</h1>
        </motion.div>
        <button
          className='m-8 flex cursor-pointer flex-col items-center'
          onClick={() => {
            console.log('fire');
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
