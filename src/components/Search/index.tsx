import React, { FC, memo } from "react";
import useStyles from "./styles";

interface Props {
  handleSearch: (value:string) => void;
  handleDownload: () => void;
}

const Search: FC<Props> = ({ handleSearch, handleDownload }: Props) => {
  const classes = useStyles();
  return <div></div>;
};

export default memo(Search);
