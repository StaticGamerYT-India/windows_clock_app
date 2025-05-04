import React from "react";

const Timer = ({ className }) => {
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
        d="M13 2.05v2.02c4.35.48 7.75 4.17 7.95 8.68c.27 5.96-4.91 10.84-10.82 10.2C5.19 22.39 1 17.68 1 12c0-3.44 1.62-6.5 4.15-8.45l-1.4-1.72C1.46 4.11 0 7.85 0 12c0 6.62 5.38 12 12 12s12-5.38 12-12c0-6.08-4.53-11.12-10.37-11.9L13 2.05M11 7v6l5.25 3.15l.75-1.23l-4.5-2.67V7H11Z"
      />
    </svg>
  );
};

export default Timer;
