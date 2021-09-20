import React, { FC, memo } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import useStyles from "./styles";

const Loading: FC = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress color="primary" classes={{ root: classes.loading }} />
    </Box>
  );
};

export default memo(Loading);
