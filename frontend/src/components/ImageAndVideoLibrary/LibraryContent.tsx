import { LibraryResponseData } from '../../../../backend/src/libraryRoutes/libraryRoutes';

export interface LibraryContentProps {
  content?: LibraryResponseData[];
}

const LibraryContent = ({ content }: LibraryContentProps) => {
  return (
    <div className='flex w-full max-w-7xl flex-wrap items-center justify-between py-4'>
      {!content && <div>he</div>}
      {content?.map((item) => {
        return (
          <div className='m-4 h-[300px] w-[25%]'>
            <img
              alt={item.data[0].title}
              className='h-full w-full object-fill'
              src={item.links[0].href}
            />
            <h1>{item.data[0].title}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default LibraryContent;
