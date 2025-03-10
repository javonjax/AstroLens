import { NavLink } from 'react-router-dom';
import RevealOnScroll from './Animations/RevealOnScroll';
import HideOnScroll from './Animations/HideOnScroll';
import { ChevronsDown } from 'lucide-react';

export interface NavCardProps {
  title: string;
  text: string;
  imgName: string;
  path: string;
  delay?: number;
  idx: number;
}

const NavCard = ({
  title,
  text,
  imgName,
  path,
  delay,
  idx,
}: NavCardProps): React.JSX.Element => {
  return (
    <div className='relative z-10 flex flex-col items-center'>
      {/* 
        A 50px y-axis translation is applied so the reveal and hide animation trigger points can match. 
        The RevealOnScroll and HideOnScroll containers have a trigger point -50px in the y-direction relative 
        to their normal position. The RevealOnScroll container is initially hidden, but the HideOnScroll 
        container is initially visible, so the content is shifted 50px in the y-direction so it is properly positioned.
      */}
      {idx === 1 && (
        <HideOnScroll>
          <div className='flex h-[600px] w-[400px] translate-y-[50px] flex-col items-center md:hidden'>
            <ChevronsDown
              size={64}
              className='m-0 animate-bounce text-yellow-500'
            />
          </div>
        </HideOnScroll>
      )}
      {idx === 2 && (
        <HideOnScroll>
          <div className='flex h-[500px] w-[400px] translate-y-[50px] flex-col items-center xl:hidden'>
            <ChevronsDown
              size={64}
              className='m-0 animate-bounce text-yellow-500'
            />
          </div>
        </HideOnScroll>
      )}
      <RevealOnScroll delay={delay}>
        <div
          id={`${idx === 0 ? 'first-nav-card' : ''}`}
          className='flex h-[540px] w-[400px] flex-col items-center overflow-hidden rounded-lg border-2 border-white shadow-[0px_0px_8px_2px_rgba(255,255,255,0.36)]'
        >
          <div className='h-[300px] w-[400px] overflow-hidden rounded-lg'>
            <img
              src={`../${imgName}`}
              className='h-full w-full object-cover'
            ></img>
          </div>
          <div className='flex h-[240px] w-[400px] flex-col items-center justify-center px-4 pt-2'>
            <h3 className='text-center text-xl text-yellow-500'>{title}</h3>
            <p className='text-center'>{text}</p>
            <button className='mt-2 cursor-pointer rounded-lg bg-yellow-300 p-4 text-black hover:bg-yellow-200'>
              <NavLink to={`/${path}`}>Check it out</NavLink>{' '}
            </button>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
};

export default NavCard;
