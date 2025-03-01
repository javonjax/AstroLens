import { useSearchParams } from 'react-router-dom';

const LibraryDetailsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className='flex h-full w-full flex-col items-center px-4'>
      LibraryDetailPage
    </div>
  );
};

export default LibraryDetailsPage;
