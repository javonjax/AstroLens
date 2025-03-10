import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

export interface HideOnScrollProps {
  children: React.JSX.Element;
  side?: string;
  delay?: number;
}

const HideOnScroll = ({
  children,
  side,
}: HideOnScrollProps): React.JSX.Element => {
  const revealRef = useRef(null);
  const isInView: boolean = useInView(revealRef, {
    amount: 0.4,
    once: true,
    margin: '0px',
  });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('hidden');
    }
  }, [isInView]);

  return (
    <motion.div
      className='absolute left-[50%] top-0 z-[-50] h-[500px] w-[400px] -translate-x-[50%]'
      ref={revealRef}
      variants={{
        hidden: { opacity: 0, y: 0, display: 'none' },
        visible: {
          opacity: 1,
          y: -50,
          alignSelf: `${side === 'right' ? 'flex-end' : ''}`,
        },
      }}
      initial='visible'
      animate={mainControls}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

export default HideOnScroll;
