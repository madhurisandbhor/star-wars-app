import React, { FC, memo } from "react";
import useStyles from "./styles";

interface Props {}

const Details: FC<Props> = () => {
  const classes = useStyles();

  return <div>Details</div>;
};

export default memo(Details);
