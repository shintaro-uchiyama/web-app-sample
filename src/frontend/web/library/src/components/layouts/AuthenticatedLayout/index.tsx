import NavBar from "~/components/parts/navigation/NavBar";
import SideMenu from "~/components/parts/navigation/SideMenu";
import { backgroundColor, bodyTextColor } from "~/styles/colors";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => (
  <main
    className={`h-screen overflow-hidden relative ${backgroundColor} ${bodyTextColor}`}
  >
    <div className="flex items-start justify-between">
      <SideMenu />
      <div className="flex flex-col w-full md:space-y-4">
        <NavBar />
        <div className="ml-4">{children}</div>
      </div>
    </div>
  </main>
);

export default AuthenticatedLayout;
