import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import NavbarVerticalRule from "./NavbarVerticalRule";

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center max-w-7xl w-full p-4 mx-auto'>
      <NavLink to="/">
        <Logo/>
      </NavLink>
      <div className="flex justify-between items-center">
      <NavLink
          to={'/epic'}
          className='rounded-2xl border-white p-4 hover:text-yellow-400 mx-1 h-full'
        >
          EPIC
        </NavLink>
        <NavbarVerticalRule/>
        <NavLink
          to={'/apod'}
          className='rounded-2xl border-white p-4 hover:text-yellow-400 mx-1 h-full'
        >
          Picture of the Day
        </NavLink>
        <NavbarVerticalRule/>
        <NavLink
          to={'/archive'}
          className='rounded-2xl border-white p-4 hover:text-yellow-400 mx-1 h-full'
        >
          Archive Explorer
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
