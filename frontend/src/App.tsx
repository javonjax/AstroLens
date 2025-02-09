import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import EpicLanding from "./components/EPIC/EpicLanding";


const App = (): React.JSX.Element => {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <main className="flex flex-col w-full items-center pb-4">
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
              element={<EpicLanding/>}
            />
            <Route
              path="/archive"
              element={<EpicLanding/>}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
};

export default App;
