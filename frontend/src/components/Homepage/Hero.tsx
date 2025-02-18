import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className='relative mb-4 flex h-[650px] w-full items-center justify-center'>
      <img src='/cosmos.jpg' className='h-full w-full object-fill'></img>
      <motion.div
        className='translate-[-50%] absolute left-[50%] top-[50%] transform'
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
    </div>
  );
};

export default Hero;
