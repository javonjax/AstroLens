import { LibraryResponseData } from '@backend/libraryRoutes/libraryRoutes';

export interface LibraryContentProps {
  searchParam?: string | null;
  content?: LibraryResponseData[];
  onClickSuggestedTerm: (searchTerm: string) => Promise<void>;
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
                    className='m-2 cursor-pointer text-yellow-400 underline'
                    onClick={() => onClickSuggestedTerm(searchTerm)}
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
                      className='m-2 cursor-pointer text-yellow-400 underline'
                      onClick={() => onClickSuggestedTerm(searchTerm)}
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
      <div className='m-4 grid h-full w-full grid-cols-[repeat(auto-fit,minmax(350px,30%))] justify-center gap-x-8 gap-y-16'>
        {content?.map((item) => {
          return (
            <div key={item.data[0].nasa_id} className='h-full max-h-[300px]'>
              <img
                alt={item.data[0].title}
                className='h-[80%] w-full object-fill'
                src={item.links[0].href}
              />
              <h1 className='break-words text-center'>{item.data[0].title}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LibraryContent;
