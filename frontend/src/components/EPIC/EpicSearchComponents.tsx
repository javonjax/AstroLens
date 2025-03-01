import { Button, Menu } from '@mantine/core';
import DatePicker from '../UI/DatePicker';
import SearchButton from '../UI/SearchButton';
import { SetURLSearchParams } from 'react-router-dom';
import { ImageCollection } from './EpicPage';

export interface EpicSearchComponentsProps {
  queryDate: Date | null;
  setQueryDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setSearchParams: SetURLSearchParams;
  imageCollection: ImageCollection;
  setImageCollection: React.Dispatch<React.SetStateAction<ImageCollection>>;
}

const EpicSearchComponents = ({
  queryDate,
  setQueryDate,
  setSearchParams,
  imageCollection,
  setImageCollection,
}: EpicSearchComponentsProps): React.JSX.Element => {
  return (
    <div className='my-4 flex w-full flex-col items-center justify-center'>
      <div className='flex w-full items-center justify-center'>
        <DatePicker
          placeholder='Pick a date'
          queryDate={queryDate}
          setQueryDate={setQueryDate}
        />
        <SearchButton
          disabled={queryDate ? false : true}
          className='ml-4'
          onClick={() => {
            if (queryDate) {
              setSearchParams((prev) => {
                const date: string = queryDate.toLocaleDateString('en-CA');
                const params = new URLSearchParams(prev);
                params.set('date', date);
                params.set('collection', imageCollection.toLowerCase());
                return params;
              });
            }
          }}
        />
      </div>
      <div className='flex items-center justify-center'>
        <label className='mr-4'>Select image quality:</label>
        <Menu>
          <Menu.Target>
            <Button
              styles={{
                root: {
                  backgroundColor: 'var(--mantine-color-dark-6)',
                },
              }}
            >
              {imageCollection}
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              component='button'
              onClick={() => {
                setImageCollection('Natural');
              }}
            >
              Natural
            </Menu.Item>
            <Menu.Item
              component='button'
              onClick={() => {
                setImageCollection('Enhanced');
              }}
            >
              Enhanced
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
};

export default EpicSearchComponents;
