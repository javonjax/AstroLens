import { MenuTargetProps } from '@mantine/core';
import { forwardRef } from 'react';
import { Menu as MenuButton } from 'lucide-react';

export interface HambugerMenuTargetProps extends MenuTargetProps {}

/* 
  This component is a custom Mantine Menu.Target.
  https://mantine.dev/core/menu/#custom-component-as-target
*/
const HamburgerMenuTarget = forwardRef<
  HTMLButtonElement,
  HambugerMenuTargetProps
>(({ ...props }, ref) => (
  <button
    ref={ref}
    {...props}
    className='cursor-pointer rounded-[0.25rem] p-2 hover:bg-neutral-700'
  >
    <MenuButton size={32} />
  </button>
));

export default HamburgerMenuTarget;
