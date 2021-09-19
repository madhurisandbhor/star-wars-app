import React, { FC, memo } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import useStyles from "./styles";

interface Props {}

const Loading: FC<Props> = () => {
  const classes = useStyles();
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <CircularProgress color="primary" />
    </Box>
  );
};

export default memo(Loading);
