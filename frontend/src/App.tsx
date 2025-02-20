import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import Navbar from './components/Navbar/Navbar';
import EpicLanding from './components/EPIC/EpicLanding';
import ApodLanding from './components/APOD/ApodLanding';
import LibraryLanding from './components/ImageAndVideoLibrary/LibraryLanding';
import Footer from './components/Footer/Footer';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
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

  return (
    <>
      <MantineProvider defaultColorScheme='dark' theme={mantineTheme}>
        <BrowserRouter>
          <Navbar />
          <main className='flex grow flex-col items-center'>
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/epic' element={<EpicLanding />} />
              <Route path='/apod' element={<ApodLanding />} />
              <Route path='/library' element={<LibraryLanding />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </MantineProvider>
    </>
  );
};

export default App;
