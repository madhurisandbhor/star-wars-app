import React, { FC } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./appTheme";

const Theme: FC<Props> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

interface Props {
  children: React.ReactNode;
}

export default Theme;
