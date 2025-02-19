import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

export interface RevealProps {
  children: React.JSX.Element;
  side?: string;
}

const Reveal = ({ children, side }: RevealProps): React.JSX.Element => {
  const revealRef = useRef(null);
  const isInView: boolean = useInView(revealRef, {
    amount: 0.75,
    once: true,
    margin: '0px',
  });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      console.log(side);
      console.log('div in viewS', isInView);
      mainControls.start('visible');
    }
  }, [isInView]);

  return (
    <motion.div
      ref={revealRef}
      variants={{
        hidden: { opacity: 0, x: side === 'right' ? 75 : -75 },
        visible: {
          opacity: 1,
          x: 0,
          alignSelf: `${side === 'right' ? 'flex-end' : ''}`,
        },
      }}
      initial='hidden'
      animate={mainControls}
      transition={{ duration: 1, delay: 0.25 }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
