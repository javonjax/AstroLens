import { LibraryData } from '@backend/MultimediaLibrary/types';
import LibraryGrid from './LibraryGrid';
import { Loader } from '@mantine/core';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SetURLSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

export interface LibraryContentProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  content?: LibraryData[];
  isLoading: boolean;
  onClickSuggestedTerm: (e: React.FormEvent, searchTerm?: string) => void;
  next?: string;
  prev?: string;
}

const popularSearchTerms = [
  'Aurora Borealis',
  'International Space Station',
  'Mars Rover',
  'Black Hole',
  'Sun',
  'Supernova',
  'Milky Way Galaxy',
  'Eclipse',
  'Meteor Shower',
  "Saturn's Rings",
];

const suggestedSearchTerms: string[] = popularSearchTerms
  .sort(() => Math.random() - 0.5)
  .slice(0, 3);

const LibraryContent = ({
  searchParams,
  setSearchParams,
  content,
  isLoading,
  onClickSuggestedTerm,
  next,
  prev,
}: LibraryContentProps): React.JSX.Element => {
  return (
    <div className='flex h-full w-full max-w-7xl flex-col items-center'>
      {isLoading && (
        <div className='flex h-full w-full items-center justify-center'>
          <Loader size={50} type='dots' />
        </div>
      )}
      <div className='m-2 flex w-full flex-col items-center'>
        {content === undefined && !isLoading && (
          <div className='flex flex-col items-center'>
            Try these popular search terms:
            <div className='flex items-center'>
              {suggestedSearchTerms.map((searchTerm) => {
                return (
                  <button
                    key={`${searchTerm}-button`}
                    className='m-2 cursor-pointer text-yellow-400 underline'
                    onClick={(e) => onClickSuggestedTerm(e, searchTerm)}
                  >
                    {searchTerm}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {content && !content.length && (
          <>
            <div>No results found for "{searchParams.get('q')}".</div>
            <div className='m-2 flex flex-col items-center'>
              Try these popular search terms:
              <div className='flex items-center'>
                {suggestedSearchTerms.map((searchTerm) => {
                  return (
                    <button
                      key={`${searchTerm}-button`}
                      className='m-2 cursor-pointer text-yellow-400 underline'
                      onClick={(e) => onClickSuggestedTerm(e, searchTerm)}
                    >
                      {searchTerm}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {content && content.length > 0 && (
          <motion.div
            className='flex h-full w-full flex-col items-center'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: -50 },
            }}
          >
            <h2 className='my-2 text-center text-2xl'>
              Showing results for "{searchParams.get('q')}"
            </h2>
            <LibraryGrid content={content} />
            <div
              className={`mt-2 flex items-end justify-center ${prev || next ? 'block' : 'invisible'}`}
            >
              <button
                onClick={() => {
                  if (searchParams.get('page')) {
                    setSearchParams((prev) => {
                      const params = new URLSearchParams(prev);
                      params.set('page', String(Number(prev.get('page')) - 1));
                      return params;
                    });
                  }
                }}
                className={`${prev ? 'block' : 'invisible'} flex h-fit cursor-pointer items-center rounded-lg border-2 border-white p-1`}
              >
                <ChevronLeft size={24} />
              </button>
              <h3 className='mx-4 p-1 text-center text-2xl'>
                Page {searchParams.get('page')}
              </h3>
              <button
                onClick={() => {
                  if (searchParams.get('page')) {
                    setSearchParams((prev) => {
                      const params = new URLSearchParams(prev);
                      params.set('page', String(Number(prev.get('page')) + 1));
                      return params;
                    });
                  }
                }}
                className={`${next ? 'block' : 'invisible'} h-fit cursor-pointer rounded-lg border-2 border-white p-1`}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LibraryContent;
