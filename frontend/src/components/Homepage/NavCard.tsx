import { NavLink } from "react-router-dom";

export interface NavCardProps {
    title: string,
    text: string,
    imgName: string,
    side: string,
    path: string
}

const NavCard = ({title, text, imgName, side, path} : NavCardProps): React.JSX.Element => {
  return (
    <div className={`relative h-[400px] w-[400px] ${side === 'right' ? 'self-end' : ''}`}>
      <img src={`../public/${imgName}`} className='rounded-[50%]' />
      <div className={`absolute top-[50%] ${side === 'left' ? 'left-[50%]' : 'right-[50%]'} h-fit w-[400px] rounded-2xl bg-neutral-800 p-4 transform -translate-y-[50%]`}>
        <h3 className='text-yellow-300'>{title}</h3>
        <p>
            {text}
        </p>
        <button className="bg-yellow-300 p-4 cursor-pointer text-black rounded-2xl mt-4 hover:bg-yellow-200">
          <NavLink to={`/${path}`}>
            Check it out
          </NavLink>
        </button>
      </div>
    </div>
  );
};

export default NavCard;
