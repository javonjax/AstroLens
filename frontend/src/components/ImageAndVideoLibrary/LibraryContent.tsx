import { LibraryData } from '@backend/MultimediaLibrary/types';
import LibraryGrid from './LibraryGrid';

export interface LibraryContentProps {
  searchParam?: string | null;
  content?: LibraryData[];
  onClickSuggestedTerm: (
    e: React.FormEvent,
    searchTerm?: string,
  ) => Promise<void>;
}

//
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

const suggestedSearchTerms = popularSearchTerms
  .sort(() => Math.random() - 0.5)
  .slice(0, 3);

const LibraryContent = ({
  searchParam,
  content,
  onClickSuggestedTerm,
}: LibraryContentProps) => {
  return (
    <div className='flex h-full w-full max-w-7xl flex-col items-center'>
      <div className='m-2 flex flex-col items-center'>
        {content === undefined && (
          <div className='flex flex-col items-center'>
            Try these popular search terms.
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
            <div>No results found for "{searchParam}".</div>
            <div className='m-2 flex flex-col items-center'>
              Try these popular search terms.
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
      </div>
      <LibraryGrid content={content} />
    </div>
  );
};

export default LibraryContent;
