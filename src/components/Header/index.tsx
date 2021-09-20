import React, { FC, memo } from "react";
import { NavLink } from "react-router-dom";
import useStyles from "./styles";

const Header: FC = (): JSX.Element => {
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
