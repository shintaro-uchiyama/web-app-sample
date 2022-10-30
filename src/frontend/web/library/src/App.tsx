import { BrowserRouter } from "react-router-dom";
import AuthenticatedLayout from "~/components/layouts/AuthenticatedLayout";
import { initialize } from "~/features/dark-mode";
import AppRoutes from "~/routes";

initialize();

const App = () => (
  <BrowserRouter>
    <AuthenticatedLayout>
      <AppRoutes />
    </AuthenticatedLayout>
  </BrowserRouter>
);

export default App;
