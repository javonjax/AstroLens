import { Orbit } from 'lucide-react';

const Logo = () => {
  return (
    <div className='flex items-center text-2xl'>
      Astr
      <Orbit className='mt-[5px] text-yellow-300' size={16} />
      Lens
    </div>
  );
};

export default Logo;
