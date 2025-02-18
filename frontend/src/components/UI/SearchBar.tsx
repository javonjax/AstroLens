import { Input } from '@mantine/core';
import SearchButton from './SearchButton';
import clsx from 'clsx';

export interface SearchBarProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onSearch: React.FormEventHandler<HTMLFormElement>;
  inputClassname?: string;
  buttonClassname?: string;
  disabled?: boolean;
}

const SearchBar = ({
  value,
  setValue,
  onSearch,
  inputClassname,
  buttonClassname,
  disabled,
}: SearchBarProps) => {
  return (
    <form className='m-4 flex items-center' onSubmit={onSearch}>
      <Input
        className={clsx(`mr-4 w-[400px]`, inputClassname)}
        placeholder='Search for... (e.g. "Black hole")'
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      <SearchButton disabled={disabled} classname={buttonClassname} />
    </form>
  );
};

export default SearchBar;
