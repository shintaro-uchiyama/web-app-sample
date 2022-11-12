import { Navigate, Route, Routes } from "react-router-dom";
import Memo from "~/pages/memo";
import Tick from "~/pages/tick";

const AppRoutes = () => (
  <Routes>
    <Route path="/memo" element={<Memo />} />
    <Route path="/tick" element={<Tick />} />
    <Route path="/" element={<Navigate replace to="/memo" />} />
  </Routes>
);

export default AppRoutes;
