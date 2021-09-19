import React, { FC, memo } from "react";
import { useHistory, Redirect, Link } from "react-router-dom";
import { Character } from "types/common";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import useStyles from "./styles";

interface IHistory {
  item: Character;
}

const Details: FC = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory<IHistory>();

  const item = history.location.state ? history.location.state.item : null;
  const filmsArray =
    item?.filmConnection?.films?.map((film) => film.title) || [];
  const films = filmsArray.length > 0 ? filmsArray.join(", ").toString() : "NA";

  return (
    <div className={classes.wrapper}>
      {item ? (
        <Card className={classes.card}>
          <div className={classes.title}>{item.name}</div>
          <Divider className={classes.divider} />
          <div className={classes.details}>
            <label className={classes.label}>Birth Year</label>
            <span className={classes.labelValue}>{item.birthYear}</span>
            <label className={classes.label}>Gender</label>
            <span className={classes.labelValue}>{item.gender}</span>
            <label className={classes.label}>Species</label>
            <span className={classes.labelValue}>
              {(item.species && item.species.length) || "NA"}
            </span>
            <label className={classes.label}>Height</label>
            <span className={classes.labelValue}>{item.height}</span>
            <label className={classes.label}>Weight</label>
            <span className={classes.labelValue}>{item.mass}</span>
            <label className={classes.label}>Eye Color</label>
            <span className={classes.labelValue}>{item.eyeColor}</span>
            <label className={classes.label}>Skin Color</label>
            <span className={classes.labelValue}>{item.skinColor}</span>
            <label className={classes.label}>Hair Color</label>
            <span className={classes.labelValue}>{item.hairColor}</span>
            <label className={classes.label}>
              Films ({item.filmConnection.films.length})
            </label>
            <span className={classes.labelValue}>
              <span>{films}</span>
            </span>
          </div>
        </Card>
      ) : (
        <Redirect to="/" />
      )}
      <Link to="/">Back to Homepage</Link>
    </div>
  );
};

export default memo(Details);
