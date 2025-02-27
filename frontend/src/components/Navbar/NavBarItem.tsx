import { NavLink } from 'react-router-dom';

export interface NavBarItemProps {
  text: string;
  link: string;
}

const NavBarItem = ({ text, link }: NavBarItemProps): React.JSX.Element => {
  return (
    <NavLink
      to={link}
      className='mx-1 h-full rounded-2xl border-white p-4 hover:text-yellow-400'
    >
      {text}
    </NavLink>
  );
};

export default NavBarItem;
