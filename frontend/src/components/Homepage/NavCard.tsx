import { NavLink } from 'react-router-dom';
import RevealOnScroll from './Animations/RevealOnScroll';

export interface NavCardProps {
  title: string;
  text: string;
  imgName: string;
  side: string;
  path: string;
  delay?: number;
}

const NavCard = ({
  title,
  text,
  imgName,
  side,
  path,
  delay,
}: NavCardProps): React.JSX.Element => {
  return (
    <RevealOnScroll side={side} delay={delay}>
      <div className={`relative h-[30vh] w-[33vh]`}>
        <>
          <img
            src={`../${imgName}`}
            className='h-full rounded-[50%]'
            loading='lazy'
          />
          <div
            className={`absolute top-[50%] ${side === 'left' ? 'left-[50%]' : 'right-[50%]'} h-fit w-[400px] -translate-y-[50%] transform rounded-2xl bg-neutral-800 p-4`}
          >
            <h3 className='text-yellow-300'>{title}</h3>
            <p>{text}</p>
            <button className='mt-4 cursor-pointer rounded-2xl bg-yellow-300 p-4 text-black hover:bg-yellow-200'>
              <NavLink to={`/${path}`}>Check it out</NavLink>
            </button>
          </div>
        </>
      </div>
    </RevealOnScroll>
  );
};

export default NavCard;
