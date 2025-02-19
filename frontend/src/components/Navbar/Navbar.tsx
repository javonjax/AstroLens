import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import NavbarVerticalRule from './NavbarVerticalRule';
import NavBarItem from './NavBarItem';
import { Menu } from '@mantine/core';
import { Camera, Earth, Library, Menu as MenuButton } from 'lucide-react';
import HamburgerMenuItem from './HamburgerMenuItem';
import HamburgerMenuTarget from './HamburgerMenuTarget';

const Navbar = () => {
  return (
    <nav className='mx-auto flex w-full max-w-7xl items-center justify-between p-4'>
      <NavLink to='/'>
        <Logo />
      </NavLink>
      {/* Normal navbar for larger screens. */}
      <div className='hidden items-center justify-between md:flex'>
        <NavBarItem link='/apod' text='Picture of the Day' />
        <NavbarVerticalRule />
        <NavBarItem link='/library' text='Multimedia Library' />
        <NavbarVerticalRule />
        <NavBarItem link='/epic' text='EPIC' />
      </div>
      {/* Hamburger menu for smaller screens. */}
      <div className='md:hidden'>
        <Menu width={200}>
          <Menu.Target>
            <HamburgerMenuTarget children={undefined} />
          </Menu.Target>
          <Menu.Dropdown
            styles={{ dropdown: { backgroundColor: 'rgb(64, 64, 64)' } }}
          >
            <HamburgerMenuItem
              to='/apod'
              text='Picture of the Day'
              icon={<Camera size={16} />}
            />
            <HamburgerMenuItem
              to='/library'
              text='Multimedia Library'
              icon={<Library size={16} />}
            />
            <HamburgerMenuItem
              to='/epic'
              text='EPIC'
              icon={<Earth size={16} />}
            />
          </Menu.Dropdown>
        </Menu>
      </div>
    </nav>
  );
};

export default Navbar;
