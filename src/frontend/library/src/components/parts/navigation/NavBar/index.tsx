import Toggle from "~/components/parts/navigation/DarkModeToggle";

const NavBar = () => (
  <header className="w-full h-12 z-40 flex items-center justify-between">
    <div className="relative z-20 flex flex-col justify-end h-full px-3 md:w-full">
      <div className="relative p-1 flex items-center w-full space-x-4 justify-end">
        <Toggle />
      </div>
    </div>
  </header>
);

export default NavBar;
