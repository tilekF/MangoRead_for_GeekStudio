import { Route, Routes } from "react-router-dom";
import Layout from './pages/FooterAndHeader/layout'
import Home from "./pages/home/home";
import "./assets/css/style.css";
import MakeInfo from "./pages/Info/makeInfo";
import Registration from "./pages/Registration/registration";

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
          element={<MakeInfo/>}
          />
          <Route
          path="/registration"
          element={<Registration/>}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
