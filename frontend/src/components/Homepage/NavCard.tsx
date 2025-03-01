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
  path,
  delay,
}: NavCardProps): React.JSX.Element => {
  return (
    <RevealOnScroll delay={delay}>
      <div className='flex h-[500px] w-[400px] flex-col items-center overflow-hidden rounded-lg border-2 border-white shadow-[0px_0px_8px_2px_rgba(255,255,255,0.36)]'>
        <div className='h-[300px] w-[400px] overflow-hidden rounded-lg'>
          <img
            src={`../${imgName}`}
            className='h-full w-full object-cover'
          ></img>
        </div>
        <div className='flex h-[200px] w-[400px] flex-col items-center px-4 pt-2'>
          <h3 className='text-center text-xl text-yellow-500'>{title}</h3>
          <p className='text-center'>{text}</p>
          <button className='mt-2 cursor-pointer rounded-lg bg-yellow-300 p-4 text-black hover:bg-yellow-200'>
            <NavLink to={`/${path}`}>Check it out</NavLink>{' '}
          </button>
        </div>
      </div>
    </RevealOnScroll>
  );
};

export default NavCard;

// import { NavLink } from 'react-router-dom';
// import RevealOnScroll from './Animations/RevealOnScroll';

// export interface NavCardProps {
//   title: string;
//   text: string;
//   imgName: string;
//   side: string;
//   path: string;
//   delay?: number;
// }

// const NavCard = ({
//   title,
//   text,
//   imgName,
//   side,
//   path,
//   delay,
// }: NavCardProps): React.JSX.Element => {
//   return (
//     <RevealOnScroll side={side} delay={delay}>
//       <div className={`relative h-[30vh] w-[33vh]`}>
//         <>
//           <img
//             src={`../${imgName}`}
//             className='h-full rounded-[50%]'
//             loading='lazy'
//           />
//           <div
//             className={`absolute top-[50%] ${side === 'left' ? 'left-[50%]' : 'right-[50%]'} h-fit w-[400px] -translate-y-[50%] transform rounded-2xl bg-neutral-800 p-4`}
//           >
//             <h3 className='text-yellow-300'>{title}</h3>
//             <p>{text}</p>
//             <button className='mt-4 cursor-pointer rounded-2xl bg-yellow-300 p-4 text-black hover:bg-yellow-200'>
//               <NavLink to={`/${path}`}>Check it out</NavLink>
//             </button>
//           </div>
//         </>
//       </div>
//     </RevealOnScroll>
//   );
// };

// export default NavCard;
