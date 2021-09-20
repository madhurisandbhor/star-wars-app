import React, { FC, memo } from "react";
import { Character } from "types/common";
import { useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import { ReactComponent as HeartSvg } from "images/heart.svg";
import { ReactComponent as FavouriteSvg } from "images/favourite.svg";
import useStyles from "./styles";

interface Props {
  list: Character[];
  favouriteList: string[];
  toggleFavorite: (event: any, id: string) => void;
}

const Details: FC<Props> = ({
  list,
  favouriteList,
  toggleFavorite,
}: Props): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();

  const redirectToDetails = (item: Character) => {
    history.push("/character-details", {
      item: item,
    });
  };

  return (
    <div className={classes.list}>
      {list.length > 0 &&
        list.map((item) => (
          <Card
            key={item.id}
            className={classes.card}
            onClick={() => redirectToDetails(item)}
          >
            <div className={classes.buttonIcons}>
              {favouriteList && favouriteList.includes(item.id) ? (
                <IconButton onClick={(e) => toggleFavorite(e, item.id)}>
                  <FavouriteSvg className={classes.svg} />
                </IconButton>
              ) : (
                <IconButton onClick={(e) => toggleFavorite(e, item.id)}>
                  <HeartSvg data-testid="heartSvg" className={classes.svg} />
                </IconButton>
              )}
            </div>
            <div className={classes.details}>
              <div>
                <label className={classes.label}>Birth Year</label>
                <span className={classes.labelValue}>{item.birthYear}</span>
                <label className={classes.label}>Gender</label>
                <span className={classes.labelValue}>{item.gender}</span>
                <label className={classes.label}>Films</label>
                <span className={classes.labelValue}>
                  {item.filmConnection.films.length}
                </span>
              </div>
            </div>
            <div className={classes.name}>{item.name}</div>
          </Card>
        ))}
    </div>
  );
};

export default memo(Details);
