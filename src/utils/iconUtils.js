import React from "react";

export const IconGenerator = ({ IconComponent, color, ...remainingProps }) => {
  return <IconComponent color={color} {...remainingProps} />;
};
