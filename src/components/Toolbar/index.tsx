import React, { FC, memo } from "react";
import Search from "components/Search";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import useStyles from "./styles";

interface Props {
  onSearch: (value: string) => void;
  handleDownload: () => void;
}

const Toolbar: FC<Props> = ({
  onSearch,
  handleDownload,
}: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.toolbar}>
      <Search handleSearch={onSearch} />
      <Button
        size="large"
        color="primary"
        variant="outlined"
        startIcon={<DownloadIcon />}
        onClick={handleDownload}
        classes={{ root: classes.downloadBtn }}
      >
        Download favourites
      </Button>
    </div>
  );
};

export default memo(Toolbar);
