import React, { FC, memo } from "react";
import Search from "components/Search";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import { CSVLink } from "react-csv";
import { ExportCharacter } from "types/common";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import useStyles from "./styles";
import { Tooltip } from "@mui/material";

interface Props {
  onSearch: (value: string) => void;
  handleDownload: () => void;
  data: ExportCharacter[];
  filmSuggestions: string[];
  onSelect: (e: React.SyntheticEvent, value: string | null) => void;
  disableDownload: boolean;
}

const Toolbar: FC<Props> = ({
  onSearch,
  handleDownload,
  data,
  filmSuggestions,
  onSelect,
  disableDownload,
}: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.toolbar}>
      <Search handleSearch={onSearch} />
      <div className={classes.right}>
        <Autocomplete
          disablePortal
          id="film-suggestions"
          options={filmSuggestions}
          classes={{
            inputRoot: classes.outlinedInput,
          }}
          fullWidth
          renderInput={(params) => <TextField {...params} placeholder="Film" />}
          onChange={(e, value) => onSelect(e, value)}
        />
        <CSVLink
          data={data || []}
          filename="Favourite_Characters.csv"
          target="_blank"
          tabIndex={-1}
          onClick={(event: any) => {
            if (disableDownload) event.preventDefault();
          }}
        >
          <Tooltip title="Download favourites">
            <IconButton
              color="primary"
              onClick={handleDownload}
              classes={{ root: classes.downloadBtn }}
            >
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </CSVLink>
      </div>
    </div>
  );
};

export default memo(Toolbar);
