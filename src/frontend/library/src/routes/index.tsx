import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "~/pages/index";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}></Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
