import React from "react";

const Clock = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill="currentColor"
        d="M12 20a8 8 0 1 0 0-16a8 8 0 0 0 0 16m0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-.997-6l-.997-.997a1 1 0 0 1 0-1.414l2.997-2.997a1 1 0 0 1 1.414 0l.997.997a1 1 0 0 1 0 1.414l-2.997 2.997a1 1 0 0 1-1.414 0M11 9h2v5h-2z"
      />
    </svg>
  );
};

export default Clock;
