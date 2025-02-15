import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import NavbarVerticalRule from './NavbarVerticalRule';

const Navbar = () => {
  return (
    <nav className='mx-auto flex w-full max-w-7xl items-center justify-between p-4'>
      <NavLink to='/'>
        <Logo />
      </NavLink>
      <div className='flex items-center justify-between'>
        <NavLink
          to={'/apod'}
          className='mx-1 h-full rounded-2xl border-white p-4 hover:text-yellow-400'
        >
          Picture of the Day
        </NavLink>
        <NavbarVerticalRule />
        <NavLink
          to={'/library'}
          className='mx-1 h-full rounded-2xl border-white p-4 hover:text-yellow-400'
        >
          Multimedia Library
        </NavLink>
        <NavbarVerticalRule />
        <NavLink
          to={'/epic'}
          className='mx-1 h-full rounded-2xl border-white p-4 hover:text-yellow-400'
        >
          EPIC
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
