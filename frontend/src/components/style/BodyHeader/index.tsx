import React from "react";
import classnames from "classnames";

interface BodyHeaderProps {
  children: any;
  className?: string;
  level: number;
}

function BodyHeader({ children, className, level }: BodyHeaderProps) {
  const size = level === 1 ? "text-2xl" : "text-lg";
  const classes = classnames(
    size,
    {
      "text-gray-800": true,
      "font-bold": true,
    },
    className
  );

  if (level === 1) {
    return <h1 className={classes}>{children}</h1>;
  } else {
    return <h2 className={classes}>{children}</h2>;
  }
}

export default BodyHeader;
