import React, { forwardRef } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

export interface HambugerMenuItemProps extends NavLinkProps {
  icon?: React.JSX.Element;
  text?: string;
}

/* 
  This component is a custom Mantine Menu.Item.
  https://mantine.dev/core/menu/#custom-component-as-menuitem
*/
const HamburgerMenuItem = forwardRef<HTMLAnchorElement, HambugerMenuItemProps>(
  ({ to, text, icon, ...props }, ref) => (
    <NavLink
      to={to}
      {...props}
      ref={ref}
      className='flex w-full items-center rounded-[0.25rem] p-2 hover:bg-neutral-600'
    >
      {icon}
      <span className='ml-4'>{text}</span>
    </NavLink>
  ),
);

export default HamburgerMenuItem;
