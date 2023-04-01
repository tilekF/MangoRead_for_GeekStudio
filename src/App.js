import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/layout";
import Home from "./pages/home/home";
import "./scss/style.scss";
import Info from "./pages/Info/info";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route
          path="/"
          element={<Home/>}
          />
          <Route
          path="/Info"
          element={<Info/>}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
