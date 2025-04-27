"use client";

import { IconBrandGoogle, IconUser, type TablerIconsProps } from "@tabler/icons-react";
import React from "react";

// Define types for the Icons component
export type IconsType = {
  user: React.FC<TablerIconsProps>;
  google: React.FC<TablerIconsProps>;
};

// Export the Icons object with the required components
export const Icons: IconsType = {
  user: IconUser,
  google: IconBrandGoogle,
};

