import React from "react";
import { Tooltip } from 'react-tooltip'
export default function ArrowIcon({ right, className, color = 'text-primary' }) {
  
  return (
    <div style={{display:"flex",justifyContent:"flex-end"}} data-tooltip-id="my-tooltip" data-tooltip-content="Continue Reading!" >
      {right && <div className="continue-reading">Continue reading</div>}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        className={className}
      >
        <path
          className={`stroke-current ${color}`}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 12h14M12 19l7-7-7-7"
        ></path>
      </svg>
      {!right && <div className="continue-reading">Continue reading</div>}

      <Tooltip id="my-tooltip"  />
    </div>
  );
}
