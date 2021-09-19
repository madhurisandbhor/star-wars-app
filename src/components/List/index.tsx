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
    <div className={classes.wrapper}>
      <div className={classes.list}>
        {list.length > 0 &&
          list.map((item) => (
            <Card
              key={item.id}
              className={classes.card}
              onClick={() => redirectToDetails(item)}
            >
              <div
                style={{
                  textAlign: "end",
                  width: "100%",
                  position: "absolute",
                  right: "0.8rem",
                  top: "0.8rem",
                  zIndex: 99,
                }}
              >
                {favouriteList && favouriteList.includes(item.id) ? (
                  <IconButton onClick={(e) => toggleFavorite(e, item.id)}>
                    <FavouriteSvg
                      style={{ width: "2.4rem", height: "2.4rem" }}
                    />
                  </IconButton>
                ) : (
                  <IconButton onClick={(e) => toggleFavorite(e, item.id)}>
                    <HeartSvg style={{ width: "2.4rem", height: "2.4rem" }} />
                  </IconButton>
                )}
              </div>
              <div className={classes.details}>
                <div>
                  <label className={classes.label}>Species</label>
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
    </div>
  );
};

export default memo(Details);
