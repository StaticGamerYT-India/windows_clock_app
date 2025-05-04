import React from "react";
import { Link, useLocation } from "react-router-dom";
import Clock from "../../assets/icons/Clock";
import Timer from "../../assets/icons/Timer";
import Alarm from "../../assets/icons/Alarm";
import World from "../../assets/icons/World";
import Brain from "../../assets/icons/Brain";

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const renderNavLink = (path, icon, label) => {
    const isActive = path === "/" ? pathname === "/" : pathname.includes(path);
    
    return (
      <Link
        to={path}
        className={`flex flex-col items-center justify-center gap-1 p-3 rounded-md transition-colors ${
          isActive ? "bg-[#3a3a3a]" : "hover:bg-[#2a2a2a]"
        }`}
      >
        {icon}
        <span className="text-xs font-medium text-[#c9c9c9]">{label}</span>
      </Link>
    );
  };

  return (
    <div className="sidebar w-20 border-r border-[#333333] bg-[#202020] flex flex-col py-4">
      <div className="flex flex-col gap-1 p-2">
        {renderNavLink("/", <Clock className="w-6 h-6" />, "Stopwatch")}
        {renderNavLink("/timer", <Timer className="w-6 h-6" />, "Timer")}
        {renderNavLink("/alarm", <Alarm className="w-6 h-6" />, "Alarm")}
        {renderNavLink("/world-time", <World className="w-6 h-6" />, "World")}
        {renderNavLink("/focus-session", <Brain className="w-6 h-6" />, "Focus")}
      </div>
    </div>
  );
};

export default Sidebar;
