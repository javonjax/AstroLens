import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

export interface NavCardProps {
  title: string;
  text: string;
  imgName: string;
  side: string;
  path: string;
}

const NavCard = ({
  title,
  text,
  imgName,
  side,
  path,
}: NavCardProps): React.JSX.Element => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visiblee: { opacity: 1 },
      }}
      className={`relative h-[400px] w-[400px] ${side === 'right' ? 'self-end' : ''}`}
    >
      <img src={`../${imgName}`} className='rounded-[50%]' loading='lazy' />
      <div
        className={`absolute top-[50%] ${side === 'left' ? 'left-[50%]' : 'right-[50%]'} h-fit w-[400px] -translate-y-[50%] transform rounded-2xl bg-neutral-800 p-4`}
      >
        <h3 className='text-yellow-300'>{title}</h3>
        <p>{text}</p>
        <button className='mt-4 cursor-pointer rounded-2xl bg-yellow-300 p-4 text-black hover:bg-yellow-200'>
          <NavLink to={`/${path}`}>Check it out</NavLink>
        </button>
      </div>
    </motion.div>
  );
};

export default NavCard;
