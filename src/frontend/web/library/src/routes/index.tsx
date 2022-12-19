import { Navigate, Route, Routes } from "react-router-dom";
import Memo from "~/pages/memo";
import Render from "~/pages/render";

const AppRoutes = () => (
  <Routes>
    <Route path="/memo" element={<Memo />} />
    <Route path="/render" element={<Render />} />
    <Route path="/" element={<Navigate replace to="/memo" />} />
  </Routes>
);

export default AppRoutes;
