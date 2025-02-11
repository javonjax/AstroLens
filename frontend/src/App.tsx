import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import EpicLanding from "./components/EPIC/EpicLanding";
import ApodLanding from "./components/APOD/ApodLanding";
import Footer from "./components/Footer/Footer";
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '../index.css';


const App = (): React.JSX.Element => {
  
  return (
    <>
      <MantineProvider
        defaultColorScheme="dark"
      >
        <BrowserRouter>
          <Navbar/>
          <main className="flex grow flex-col items-center">
            <Routes>
              <Route
                path="/"
                element={<Homepage/>}
              />
              <Route
                path="/epic"
                element={<EpicLanding/>}
              />
              <Route
                path="/apod"
                element={<ApodLanding/>}
              />
              <Route
                path="/archive"
                element={<EpicLanding/>}
              />
            </Routes>
          </main>
          <Footer/>
        </BrowserRouter>
      </MantineProvider>
    </>
  );
};

export default App;
