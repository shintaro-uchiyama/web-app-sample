import { faBook } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import MenuItem, {
  IMenuItemProps,
} from "~/components/parts/navigation/SideMenu/MenuItem";
import { menuBackgroundColor, titleTextColor } from "~/styles/colors";

const SideMenu = () => {
  const location = useLocation();
  const menuItems: Omit<IMenuItemProps, "currentPath">[] = [
    {
      text: "Memo",
      icon: faBook,
      itemPath: "/memo",
    },
  ];
  return (
    <div
      className={`h-screen hidden lg:block shadow-lg relative w-32 ${menuBackgroundColor}`}
    >
      <div className="h-full">
        <div className="flex items-center justify-start pt-6 ml-4">
          <p className={`font-bold text-xl bg-transparent ${titleTextColor}`}>
            Library
          </p>
        </div>
        <nav className="mt-6">
          {menuItems.map(({ text, icon, itemPath }) => (
            <MenuItem
              text={text}
              icon={icon}
              itemPath={itemPath}
              currentPath={location.pathname}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SideMenu;
