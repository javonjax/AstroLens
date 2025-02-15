import { Checkbox } from '@mantine/core';
import SearchBar from '../UI/SearchBar';

export interface LibrarySearchProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  onSearch: React.FormEventHandler<HTMLFormElement>;
  checked: Record<MediaType, boolean>;
  handleCheck: (mediaType: MediaType) => void;
}
export type MediaType = 'image' | 'video' | 'audio';
const mediaTypes: MediaType[] = ['image', 'video', 'audio'];

const LibrarySearch = ({
  searchValue,
  setSearchValue,
  onSearch,
  checked,
  handleCheck,
}: LibrarySearchProps) => {
  return (
    <div className='flex w-fit flex-col items-center justify-center'>
      <h1 className='text-5xl'>Explore the NASA multimedia library.</h1>
      <SearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onSearch={onSearch}
      />
      <div className='flex w-full justify-center'>
        {mediaTypes.map((type) => (
          <Checkbox
            className='cursor-pointer'
            styles={{
              root: { cursor: 'pointer' },
              label: {
                cursor: 'pointer',
                marginRight: '0.75rem',
                paddingInlineStart: '0.3rem',
              },
              input: { cursor: 'pointer' },
            }}
            key={`${type}-checkbox`}
            label={`${type.slice(0, 1).toUpperCase()}${type.slice(1)}`}
            checked={checked[type]}
            onChange={() => handleCheck(type)}
          />
        ))}
      </div>
    </div>
  );
};

export default LibrarySearch;
