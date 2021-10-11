import React, { FC, memo } from "react";
import Search from "components/Search";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import { CSVLink } from "react-csv";
import { Character } from "types/common";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import useStyles from "./styles";

interface Props {
  onSearch: (value: string) => void;
  handleDownload: () => void;
  data: Character[];
  filmSuggestions: string[];
  onSelect: (e:React.SyntheticEvent, value: string | null) => void;
}

const Toolbar: FC<Props> = ({
  onSearch,
  handleDownload,
  data,
  filmSuggestions,
  onSelect,
}: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.toolbar}>
      <Search handleSearch={onSearch} />
      <Autocomplete
        disablePortal
        id="film-suggestions"
        options={filmSuggestions}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="film" />}
        onChange={(e, value) => onSelect(e, value)}
      />
      <CSVLink
        data={data || []}
        filename="Favourite_Characters.csv"
        target="_blank"
        tabIndex={-1}
      >
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
      </CSVLink>
    </div>
  );
};

export default memo(Toolbar);
