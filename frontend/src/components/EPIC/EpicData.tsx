import { Coordinates, EpicAPIResponse } from '@backend/EPIC/types';
import { calculateDistance } from './utils';
import { ArrowRight, Earth, Moon, Satellite, Sun } from 'lucide-react';
import { Button, Menu } from '@mantine/core';

export interface EpicDataProps {
  imageData: EpicAPIResponse | undefined;
  currentIndex: number;
}

const EpicData = ({ imageData, currentIndex }: EpicDataProps) => {
  const dscovrCoordinates: Coordinates | undefined =
    imageData?.[currentIndex]?.dscovr_j2000_position;
  const sunCoordinates: Coordinates | undefined =
    imageData?.[currentIndex].sun_j2000_position;
  const moonCoordinates: Coordinates | undefined =
    imageData?.[currentIndex].lunar_j2000_position;

  return (
    <div className='flex w-full flex-col items-center border-2 border-white py-4'>
      <h2 className='mx-auto mb-2'>Image Data</h2>
      <div className='my-2 flex items-center justify-center'>
        <label className='mr-4'>Units:</label>
        <Menu>
          <Menu.Target>
            <Button
              styles={{
                root: {
                  backgroundColor: 'var(--mantine-color-dark-6)',
                },
              }}
            >
              yo
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item component='button' onClick={() => {}}>
              Kilometers
            </Menu.Item>
            <Menu.Item component='button' onClick={() => {}}>
              Miles
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      <div className='mt-2 flex w-full justify-center'>
        <div className='flex w-full max-w-[33%] flex-col items-center'>
          <h3>Earth to DSCOVR: EPIC</h3>
          <div className='flex w-[100px] justify-around'>
            <Earth /> <ArrowRight /> <Satellite />
          </div>
          {dscovrCoordinates && (
            <div>
              {Math.round(
                calculateDistance(
                  dscovrCoordinates?.x,
                  dscovrCoordinates?.y,
                  dscovrCoordinates.z,
                ),
              ).toLocaleString('en-US')}{' '}
              km
            </div>
          )}
        </div>
        <div className='flex w-full max-w-[33%] flex-col items-center'>
          <h3 className='text-center'>Earth to the Sun</h3>
          <div className='flex w-[100px] justify-around'>
            <Earth /> <ArrowRight /> <Sun />
          </div>
          {sunCoordinates && (
            <div>
              {Math.round(
                calculateDistance(
                  sunCoordinates?.z,
                  sunCoordinates?.x,
                  sunCoordinates?.y,
                ),
              ).toLocaleString('en-US')}{' '}
              km
            </div>
          )}
        </div>
        <div className='flex w-full max-w-[33%] flex-col items-center'>
          <h3>Earth to the Moon</h3>
          <div className='flex w-[100px] justify-around'>
            <Earth /> <ArrowRight /> <Moon />
          </div>
          {moonCoordinates && (
            <div>
              {Math.round(
                calculateDistance(
                  moonCoordinates?.z,
                  moonCoordinates?.x,
                  moonCoordinates?.y,
                ),
              ).toLocaleString('en-US')}{' '}
              km
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EpicData;
