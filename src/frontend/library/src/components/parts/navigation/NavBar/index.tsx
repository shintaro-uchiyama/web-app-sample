import Toggle from "~/components/parts/navigation/DarkModeToggle";

const NavBar = () => (
  <header className="w-full h-12 z-40 flex items-center justify-between">
    <div className="block lg:hidden ml-6">
      <button className="flex p-2 items-center rounded-full bg-white shadow text-gray-500 text-md">
        <svg
          width="20"
          height="20"
          className="text-gray-400"
          fill="currentColor"
          viewBox="0 0 1792 1792"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
        </svg>
      </button>
    </div>
    <div className="relative z-20 flex flex-col justify-end h-full px-3 md:w-full">
      <div className="relative p-1 flex items-center w-full space-x-4 justify-end">
        <Toggle />
      </div>
    </div>
  </header>
);

export default NavBar;
