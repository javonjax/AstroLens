import { LibraryData } from '@backend/Library/types.ts';
import LibraryGridItem from './LibraryGridItem';
import React from 'react';
import { Button, Menu } from '@mantine/core';
import { SortingMethod } from './LibraryPage';

interface LibraryGridProps {
  content?: LibraryData[];
  sortBy: SortingMethod;
  setSortBy: React.Dispatch<React.SetStateAction<SortingMethod>>;
}
const LibraryGrid = ({
  content,
  sortBy,
  setSortBy,
}: LibraryGridProps): React.JSX.Element => {
  return (
    <>
      <div className='flex items-center justify-center'>
        <label className='mr-4'>Sort by:</label>
        <Menu>
          <Menu.Target>
            <Button
              styles={{
                root: {
                  backgroundColor: 'var(--mantine-color-dark-6)',
                },
              }}
            >
              {sortBy}
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              component='button'
              onClick={() => {
                setSortBy('Date: Newest to Oldest');
              }}
            >
              Date: Newest to Oldest
            </Menu.Item>
            <Menu.Item
              component='button'
              onClick={() => {
                setSortBy('Date: Oldest to Newest');
              }}
            >
              Date: Oldest to Newest
            </Menu.Item>
            <Menu.Item
              component='button'
              onClick={() => {
                setSortBy('Title: Alphabetical');
              }}
            >
              Title: Alphabetical
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      <div className='m-4 grid h-full w-full grid-cols-[repeat(auto-fit,minmax(350px,30%))] justify-center gap-x-12 gap-y-12'>
        {content
          ?.sort((a, b) => {
            switch (sortBy) {
              case 'Date: Newest to Oldest':
                return (
                  new Date(b.data[0].date_created).getTime() -
                  new Date(a.data[0].date_created).getTime()
                );
              case 'Date: Oldest to Newest':
                return (
                  new Date(a.data[0].date_created).getTime() -
                  new Date(b.data[0].date_created).getTime()
                );
              case 'Title: Alphabetical':
                return a.data[0].title.localeCompare(b.data[0].title);
            }
          })
          .map((item) => {
            return <LibraryGridItem item={item} key={item.data[0].nasa_id} />;
          })}
      </div>
    </>
  );
};

export default LibraryGrid;
