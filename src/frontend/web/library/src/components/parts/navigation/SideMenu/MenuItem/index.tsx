import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  accentBorderColor,
  bodyTextColor,
  menuHighlightBackgroundColor,
  menuHoverBackgroundColor,
} from "~/styles/colors";

export interface IMenuItemProps {
  text: string;
  icon: IconDefinition;
  itemPath: string;
  currentPath: string;
}
const MenuItem = ({ text, icon, itemPath, currentPath }: IMenuItemProps) => (
  <Link
    className={`w-full flex items-center pl-2 p-2 my-1 transition-colors duration-200 justify-start border-l-4 rounded-sm ${bodyTextColor} ${
      currentPath === itemPath
        ? `${accentBorderColor} ${menuHighlightBackgroundColor}`
        : `border-transparent ${menuHoverBackgroundColor}`
    }`}
    to={itemPath}
  >
    <span className="text-left">
      <FontAwesomeIcon icon={icon} fill="currentColor" className="" />
      <span className="mx-2 text-sm font-normal">{text}</span>
    </span>
  </Link>
);

export default MenuItem;
