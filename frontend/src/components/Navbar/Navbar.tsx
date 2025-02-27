import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import NavbarVerticalRule from './NavbarVerticalRule';
import NavBarItem from './NavBarItem';
import { Menu } from '@mantine/core';
import { Camera, Earth, Library } from 'lucide-react';
import HamburgerMenuItem from './HamburgerMenuItem';
import HamburgerMenuTarget from './HamburgerMenuTarget';
import { useEffect, useState } from 'react';

const Navbar = (): React.JSX.Element => {
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState<boolean>();

  // Closes the hamburger menu dropdown when the menu target is not on the screen.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767) {
        setHamburgerMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        <Menu
          width={200}
          closeOnClickOutside
          closeOnItemClick
          opened={hamburgerMenuOpen}
          onChange={setHamburgerMenuOpen}
        >
          <Menu.Target>
            <HamburgerMenuTarget children={undefined} />
          </Menu.Target>
          <Menu.Dropdown
            styles={{ dropdown: { backgroundColor: 'rgb(64, 64, 64)' } }}
          >
            <Menu.Item
              component={HamburgerMenuItem}
              to='/apod'
              text='Picture of the Day'
              icon={<Camera size={16} />}
            />
            <Menu.Item
              component={HamburgerMenuItem}
              to='/library'
              text='Multimedia Library'
              icon={<Library size={16} />}
            />
            <Menu.Item
              component={HamburgerMenuItem}
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
