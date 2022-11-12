import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AuthenticatedLayout from "~/components/layouts/AuthenticatedLayout";
import { initialize } from "~/features/dark-mode";
import AppRoutes from "~/routes";
import { store } from "./app/store";

initialize();

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AuthenticatedLayout>
        <AppRoutes />
      </AuthenticatedLayout>
    </BrowserRouter>
  </Provider>
);

export default App;
