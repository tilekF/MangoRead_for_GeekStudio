import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/layout";
import Home from "./pages/home/home";
import "./scss/style.scss";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route
          path="/"
          element={<Home/>}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
