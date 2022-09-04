import AppRoutes from "~/routes";
import { baseBackgroundColor, bodyTextColor } from "./styles/colors";

const App = () => (
  <div className={`h-screen ${baseBackgroundColor} ${bodyTextColor}`}>
    <AppRoutes />
  </div>
);

export default App;
