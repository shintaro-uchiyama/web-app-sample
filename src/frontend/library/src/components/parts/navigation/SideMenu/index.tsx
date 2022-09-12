import { faBook } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import MenuItem, {
  IMenuItemProps,
} from "~/components/parts/navigation/SideMenu/MenuItem";
import { menuBackgroundColor, titleTextColor } from "~/styles/colors";

const SideMenu = () => {
  const location = useLocation();
  const { t } = useTranslation(["navigation"]);
  const menuItems: Omit<IMenuItemProps, "currentPath">[] = [
    {
      text: t("sideMenu.memo"),
      icon: faBook,
      itemPath: "/memo",
    },
  ];
  return (
    <div
      className={`h-screen block shadow-lg relative w-32 ${menuBackgroundColor}`}
    >
      <div className="h-full">
        <div className="flex items-center justify-start pt-6 ml-4">
          <p className={`font-bold text-xl bg-transparent ${titleTextColor}`}>
            Library
          </p>
        </div>
        <nav className="mt-6">
          {menuItems.map(({ text, icon, itemPath }, key) => (
            <MenuItem
              key={key}
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
