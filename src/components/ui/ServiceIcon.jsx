import {
  FiCloud,
  FiCode,
  FiCompass,
  FiLayers,
  FiLifeBuoy,
  FiMessageSquare,
  FiShoppingCart,
  FiSmartphone,
  FiTool,
  FiZap,
} from "react-icons/fi";
import { FaChurch, FaSchool } from "react-icons/fa";

const map = {
  code: FiCode,
  mobile: FiSmartphone,
  api: FiLayers,
  cart: FiShoppingCart,
  school: FaSchool,
  church: FaChurch,
  automation: FiZap,
  design: FiCompass,
  consult: FiMessageSquare,
  wrench: FiTool,
  cloud: FiCloud,
  speed: FiLifeBuoy,
};

export function ServiceIcon({ name, size = 20, className }) {
  const Icon = map[name] ?? FiCode;
  return <Icon size={size} className={className} />;
}
