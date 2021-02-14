import React from "react";
import classnames from "classnames";

interface BodyText {
  children: any;
  className?: string;
}

function BodyText({ children, className }: BodyText) {
  const classes = classnames("text-gray-700 text-base mb-2", className);
  return <p className={classes}>{children}</p>;
}

export default BodyText;
