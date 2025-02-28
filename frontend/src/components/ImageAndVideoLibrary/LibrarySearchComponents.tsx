import { Checkbox, RangeSlider } from '@mantine/core';
import SearchBar from '../UI/SearchBar';

export interface LibrarySearchComponentsProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  yearRange: [number, number];
  setYearRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  onSearch: React.FormEventHandler<HTMLFormElement>;
  queryMediaTypes: Record<MediaType, boolean>;
  handleCheck: (mediaType: MediaType) => void;
}
export type MediaType = 'image' | 'video' | 'audio';
const mediaTypes: MediaType[] = ['image', 'video', 'audio'];

const LibrarySearchComponents = ({
  inputValue,
  setInputValue,
  yearRange,
  setYearRange,
  onSearch,
  queryMediaTypes,
  handleCheck,
}: LibrarySearchComponentsProps): React.JSX.Element => {
  const currentYear: number = new Date().getFullYear();

  return (
    <div className='my-4 flex w-full flex-col items-center justify-center'>
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
      <div className='my-2 flex w-full justify-center'>
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
      <div className='mt-4 w-full max-w-[396px]'>
        <RangeSlider
          value={yearRange}
          onChange={setYearRange}
          min={1920}
          max={currentYear}
          marks={[
            { value: 1920, label: '1920' },
            {
              value: currentYear,
              label: `${currentYear}`,
            },
          ]}
        ></RangeSlider>
      </div>
    </div>
  );
};

export default LibrarySearchComponents;
