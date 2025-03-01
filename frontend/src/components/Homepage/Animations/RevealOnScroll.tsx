import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

export interface RevealProps {
  children: React.JSX.Element;
  side?: string;
  delay?: number;
}

const RevealOnScroll = ({
  children,
  side,
  delay,
}: RevealProps): React.JSX.Element => {
  const revealRef = useRef(null);
  const isInView: boolean = useInView(revealRef, {
    amount: 0.4,
    once: true,
    margin: '0px',
  });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    }
  }, [isInView]);

  return (
    <motion.div
      ref={revealRef}
      variants={{
        hidden: { opacity: 0, y: -50 },
        visible: {
          opacity: 1,
          y: 0,
          alignSelf: `${side === 'right' ? 'flex-end' : ''}`,
        },
      }}
      initial='hidden'
      animate={mainControls}
      transition={{ duration: 0.5, delay: delay }}
    >
      {children}
    </motion.div>
  );
};

export default RevealOnScroll;
