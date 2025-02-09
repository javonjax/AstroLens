import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center max-w-7xl w-full p-4'>
      <NavLink to="/">
        <Logo/>
      </NavLink>
      <div>Nav buttons</div>
    </nav>
  );
};

export default Navbar;
