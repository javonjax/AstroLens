import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Homepage from './components/Homepage/Homepage';
import Navbar from './components/Navbar/Navbar';
import EpicPage from './components/EPIC/EpicPage';
import ApodPage from './components/APOD/ApodPage';
import LibraryPage from './components/Library/LibraryPage';
import LibraryDetailsPage from './components/Library/Details/LibraryDetailsPage';
import Footer from './components/Footer/Footer';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/carousel/styles.css';
import '../index.css';

const App = (): React.JSX.Element => {
  // Breakpoints are set to match tailwindcss.
  const mantineTheme = createTheme({
    breakpoints: {
      xs: '36rem',
      sm: '40rem',
      md: '48rem',
      lg: '64rem',
      xl: '80rem',
    },
  });

  const queryClient: QueryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MantineProvider defaultColorScheme='dark' theme={mantineTheme}>
          <BrowserRouter>
            <Navbar />
            <main className='flex grow flex-col items-center'>
              <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/epic' element={<EpicPage />} />
                <Route path='/apod' element={<ApodPage />} />
                <Route path='/library' element={<LibraryPage />} />
                <Route
                  path='/library/details'
                  element={<LibraryDetailsPage />}
                />
              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
        </MantineProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
