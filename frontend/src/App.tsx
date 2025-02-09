import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";


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
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
};

export default App;
