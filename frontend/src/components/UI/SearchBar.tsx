import { Input } from '@mantine/core';
import SearchButton from './SearchButton';
import clsx from 'clsx';

export interface SearchBarProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  onSearch: React.FormEventHandler<HTMLFormElement>;
  inputClassname?: string;
  buttonClassname?: string;
}

const SearchBar = ({
  searchValue,
  setSearchValue,
  onSearch,
  inputClassname,
  buttonClassname,
}: SearchBarProps) => {
  return (
    <form className='m-4 flex items-center' onSubmit={onSearch}>
      <Input
        className={clsx(`mr-4 w-[400px]`, inputClassname)}
        placeholder='Search for... (e.g. "Black hole")'
        value={searchValue}
        onChange={(e) => setSearchValue(e.currentTarget.value)}
      />
      <SearchButton
        disabled={searchValue ? false : true}
        buttonClassname={buttonClassname}
      />
    </form>
  );
};

export default SearchBar;
