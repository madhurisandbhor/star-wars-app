import React, { FC, memo } from "react";
import { NavLink } from "react-router-dom";
import useStyles from "./styles";

interface Props {}

const Header: FC<Props> = () => {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <ul>
        <li>
          <NavLink to="/">
            <p>Star Wars</p>
            <p>Characters</p>
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default memo(Header);
