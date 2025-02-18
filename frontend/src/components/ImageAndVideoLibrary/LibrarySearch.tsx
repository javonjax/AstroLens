import { Checkbox } from '@mantine/core';
import SearchBar from '../UI/SearchBar';

export interface LibrarySearchProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  onSearch: React.FormEventHandler<HTMLFormElement>;
  queryMediaTypes: Record<MediaType, boolean>;
  handleCheck: (mediaType: MediaType) => void;
}
export type MediaType = 'image' | 'video' | 'audio';
const mediaTypes: MediaType[] = ['image', 'video', 'audio'];

const LibrarySearch = ({
  inputValue,
  setInputValue,
  onSearch,
  queryMediaTypes,
  handleCheck,
}: LibrarySearchProps) => {
  return (
    <div className='flex w-fit flex-col items-center justify-center'>
      <h1 className='m-4 text-5xl'>Explore the NASA multimedia library.</h1>
      <SearchBar
        value={inputValue}
        setValue={setInputValue}
        onSearch={onSearch}
        disabled={
          !inputValue ||
          !Object.values(queryMediaTypes).some(
            (typeSelected) => typeSelected === true,
          )
        }
      />
      <div className='flex w-full justify-center'>
        {mediaTypes.map((type) => (
          <Checkbox
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
            checked={queryMediaTypes[type]}
            onChange={() => handleCheck(type)}
          />
        ))}
      </div>
    </div>
  );
};

export default LibrarySearch;
