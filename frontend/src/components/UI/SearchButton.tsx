import clsx from 'clsx';
import { Search } from 'lucide-react';

export interface SearchButtonProps {
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  classname?: string;
}

const SearchButton = ({
  disabled,
  onClick,
  classname,
}: SearchButtonProps): React.JSX.Element => {
  return (
    <button
      disabled={disabled}
      type='submit'
      className={clsx(
        'flex h-[36px] cursor-pointer items-center rounded-xl bg-yellow-300 p-4 text-black hover:bg-yellow-200 disabled:cursor-default disabled:bg-neutral-700',
        classname,
      )}
      onClick={onClick}
    >
      <Search size={16} />
    </button>
  );
};

export default SearchButton;
