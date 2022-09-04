import { Route, Routes } from "react-router-dom";
import Memo from "~/pages/memo";

const AppRoutes = () => (
  <Routes>
    <Route path="/memo" element={<Memo />}></Route>
    <Route path="/" element={<Memo />}></Route>
  </Routes>
);

export default AppRoutes;
