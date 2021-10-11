import React, { FC, useState, memo } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import useStyles from "./styles";

interface Props {
  handleSearch: (value: string) => void;
}

const SearchBar: FC<Props> = ({ handleSearch }: Props): JSX.Element => {
  const classes = useStyles();
  const [typingTimeout, setTypingTimeout] = useState<any>(0);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    var searchText = e.target.value;
    if (typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(
      setTimeout(() => {
        handleSearch(searchText.toLowerCase());
      }, 500)
    );
  };

  return (
    <div className={classes.searchContainer}>
      <TextField
        id="searchbox-id"
        name="searchText"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" fontSize="medium" />
            </InputAdornment>
          ),
          classes: { root: classes.inputRoot },
        }}
        placeholder="Search character by name"
        variant="outlined"
        size="small"
        onChange={onSearch}
        fullWidth
      />
    </div>
  );
};

export default memo(SearchBar);
