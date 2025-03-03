import { Coordinates, EpicAPIResponse } from '@backend/EPIC/types';
import { calculateDistance, UnitOfMeasurement } from './utils';
import { ArrowRight, Earth, Moon, Satellite, Sun } from 'lucide-react';
import { Button, Menu } from '@mantine/core';
import { useState } from 'react';

export interface EpicDataProps {
  imageData: EpicAPIResponse | undefined;
  currentIndex: number;
}

const EpicData = ({
  imageData,
  currentIndex,
}: EpicDataProps): React.JSX.Element => {
  const [units, setUnits] = useState<UnitOfMeasurement>('Kilometers');
  const dscovrCoordinates: Coordinates | undefined =
    imageData?.[currentIndex]?.dscovr_j2000_position;
  const sunCoordinates: Coordinates | undefined =
    imageData?.[currentIndex].sun_j2000_position;
  const moonCoordinates: Coordinates | undefined =
    imageData?.[currentIndex].lunar_j2000_position;

  return (
    <div className='flex w-full flex-col items-center'>
      <h1 className='my-2 text-center text-3xl'>Image Data</h1>
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
              {units}
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              component='button'
              onClick={() => {
                setUnits('Kilometers');
              }}
            >
              Kilometers
            </Menu.Item>
            <Menu.Item
              component='button'
              onClick={() => {
                setUnits('Miles');
              }}
            >
              Miles
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      <div className='flex w-full flex-col items-center justify-center md:flex-row'>
        <div className='my-2 flex w-full max-w-[60%] flex-col items-center md:max-w-[33%]'>
          <h3 className='text-center'>Earth to EPIC</h3>
          <div className='flex w-[100px] justify-around'>
            <Earth /> <ArrowRight /> <Satellite />
          </div>
          {dscovrCoordinates && (
            <div>
              {calculateDistance(
                dscovrCoordinates.x,
                dscovrCoordinates.y,
                dscovrCoordinates.z,
                units,
              ).toLocaleString('en-US')}
              {units === 'Kilometers' ? ' km' : ' mi'}
            </div>
          )}
        </div>
        <div className='my-2 flex w-full max-w-[60%] flex-col items-center md:max-w-[33%]'>
          <h3 className='text-center'>Earth to the Sun</h3>
          <div className='flex w-[100px] justify-around'>
            <Earth /> <ArrowRight /> <Sun />
          </div>
          {sunCoordinates && (
            <div>
              {calculateDistance(
                sunCoordinates.z,
                sunCoordinates.x,
                sunCoordinates.y,
                units,
              ).toLocaleString('en-US')}
              {units === 'Kilometers' ? ' km' : ' mi'}
            </div>
          )}
        </div>
        <div className='my-2 flex w-full max-w-[60%] flex-col items-center md:max-w-[33%]'>
          <h3 className='text-center'>Earth to the Moon</h3>
          <div className='flex w-[100px] justify-around'>
            <Earth /> <ArrowRight /> <Moon />
          </div>
          {moonCoordinates && (
            <div>
              {calculateDistance(
                moonCoordinates.z,
                moonCoordinates.x,
                moonCoordinates.y,
                units,
              ).toLocaleString('en-US')}
              {units === 'Kilometers' ? ' km' : ' mi'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EpicData;
