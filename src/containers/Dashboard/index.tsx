import React, {
  FC,
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from "react";
import List from "components/List";
import Loading from "components/Loading";
import { Character, Film, ExportCharacter } from "types/common";
import Toolbar from "components/Toolbar";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import clsx from "clsx";
import { ReactComponent as ArrowTop } from "images/arrow-top.svg";
import { MyContext } from "app";
import { swapiUrl } from "api";
import useStyles from "./styles";

const Dashboard: FC = (): JSX.Element => {
  const classes = useStyles();
  const context = useContext(MyContext);
  const firstInitCount = 12;
  const initialQuery = `{
  allPeople(first: ${firstInitCount}) {
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
    people {
      id
      name
      gender
      height
      mass
      birthYear
      skinColor
      eyeColor
      hairColor
      filmConnection {
        films {
          id
          title
        }
      }
    }
  }
}`;

  const nextRef = useRef<string | null>(null);
  const [query, setQuery] = useState<string>(initialQuery);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [searchText, setSearch] = useState("");
  const [searchByFilm, setSearchByFilm] = useState("");
  const [originalList, setOriginalList] = useState<Character[]>([]);
  const [favourites, setFavourites] = useState<string[]>(
    context.favChars || []
  );
  const [exportCharacters, setExportCharacters] = useState<ExportCharacter[]>(
    []
  );
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [list, setList] = useState<Character[]>([]);
  const [more, setMore] = useState(false);
  const [ele, setEle] = useState<HTMLDivElement | null>(null);
  const [filmSuggestions, setFilmSuggestions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  const onSearch = useCallback((searchValue: string) => {
    setSearch(searchValue);
    setOpen(false);
  }, []);

  const getData = useCallback(() => {
    const fetchRequest = async () => {
      setLoading(true);
      try {
        const res = await fetch(swapiUrl, {
          method: "post",
          headers: { "Content-Type": "application/graphql" },
          body: query,
        });
        let {
          data: { allPeople },
        } = await res.json();
        if (allPeople) {
          const allCharactersList =
            allPeople.totalCount > 0 ? allPeople.people : [];
          setList((prev) => [...prev, ...allCharactersList]);
          setOriginalList((prev) => [...prev, ...allCharactersList]);

          if (allPeople.pageInfo.hasNextPage) {
            setMore(true);
            nextRef.current = allPeople.pageInfo.endCursor;
          } else {
            setMore(false);
            nextRef.current = null;
          }
        }
      } catch (err: any) {
        const errorMsg = err.message || err;
        setError(errorMsg);
        setOpen(true);
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [query]);

  const observerCallback = (entries: any) => {
    const first = entries[0];
    if (first.isIntersecting) setEndCursor(nextRef.current);
  };

  const observer = useRef(
    new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "2px",
      threshold: 1,
    })
  );

  const toggleFavorite = useCallback(
    (e, id) => {
      if (e.target.closest("svg")) e.stopPropagation();
      let updateFavor = [...favourites];
      if (!favourites.includes(id)) updateFavor.push(id);
      else {
        updateFavor = favourites.filter((fav) => fav !== id);
      }
      setFavourites(updateFavor);
      context.setFavChars(updateFavor);
    },
    [favourites, context]
  );

  const formatDataToExport = (data: Character[]) => {
    const temp: ExportCharacter[] = data.map((item) => {
      let updatedItem;
      const films = item.filmConnection.films.map((film) => film.title);
      const allFilms = films.join(", ");
      const { filmConnection, ...props } = item;
      updatedItem = { ...props, films: allFilms };
      return updatedItem;
    });
    return temp;
  };

  const handleDownload = useCallback(() => {
    if (favourites.length === 0) {
      setError("Please select favourite characters to download");
      setOpen(true);
    } else {
      const favourListDownload = list.filter((character) =>
        favourites.includes(character.id)
      );

      const formattedData = formatDataToExport(favourListDownload);
      setExportCharacters(formattedData);
    }
  }, [favourites, list]);

  const closeAlert = () => {
    setOpen(false);
  };

  useEffect(() => {
    const filteredList = originalList.filter((item) => {
      if (searchText && searchByFilm)
        return (
          item.name.toLowerCase().includes(searchText) &&
          item.filmConnection.films.some((film: Film) =>
            film.title.toLowerCase().includes(searchByFilm)
          )
        );
      if (searchText) return item.name.toLowerCase().includes(searchText);
      return item.filmConnection.films.some((film: Film) =>
        film.title.toLowerCase().includes(searchByFilm)
      );
    });

    if (searchText && filteredList.length === 0) {
      setOpen(true);
      setError("No result");
    }
    setList(filteredList);
  }, [searchText, searchByFilm, originalList]);

  const onSelect = useCallback(
    (e: React.SyntheticEvent, value: string | null) => {
      if (value) setSearchByFilm(value.toLowerCase());
      else setSearchByFilm("");
    },
    []
  );

  const scrollToTop = () => {
    document
      .querySelector(`[data-testid]`)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    function onScroll() {
      const currentPosition =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentPosition > scrollTop) {
        setScrolling(true);
      } else if (scrollTop < 150) {
        setScrolling(false);
      }
      setScrollTop(currentPosition <= 0 ? 0 : currentPosition);
    }

    window.addEventListener("scroll", onScroll, true);
    return () => window.removeEventListener("scroll", onScroll, true);
  }, [scrollTop]);

  const getFilms = useCallback(() => {
    let films: string[] = [];

    originalList.forEach((item) => {
      item.filmConnection.films.forEach((film: Film) => {
        if (!films.includes(film.title)) films.push(film.title);
      });
    });
    setFilmSuggestions(films);
  }, [originalList]);

  useEffect(() => {
    getFilms();
  }, [getFilms]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (endCursor) {
      const newQuery = `
      {
        allPeople(first: ${firstInitCount} after:"${endCursor}") {
          pageInfo {
            endCursor
            hasNextPage
          }
          totalCount
          people {
            id
            name
            gender
            height
            mass
            birthYear
            skinColor
            eyeColor
            hairColor
            filmConnection {
              films {
                id
                title
              }
            }
          }
        }
      }`;
      setQuery(newQuery);
    }
  }, [endCursor]);

  useEffect(() => {
    const currEle = ele;
    const currObserver = observer.current;
    if (currEle) {
      currObserver.observe(currEle);
    }
    return () => {
      if (currEle) currObserver.unobserve(currEle);
    };
  }, [ele]);

  return (
    <div className={classes.wrapper} data-testid="main-container">
      {open && (
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={closeAlert}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          classes={{ root: classes.alertRoot }}
        >
          {error}
        </Alert>
      )}
      <Toolbar
        data={exportCharacters}
        onSearch={onSearch}
        handleDownload={handleDownload}
        filmSuggestions={filmSuggestions}
        onSelect={onSelect}
        disableDownload={favourites.length === 0}
      />
      <List
        list={list}
        toggleFavorite={toggleFavorite}
        favouriteList={favourites}
      />
      <button
        type="button"
        onClick={scrollToTop}
        className={clsx({
          [classes.visible]: scrolling,
          [classes.invisible]: !scrolling,
        })}
      >
        <ArrowTop />
      </button>

      {isLoading && <Loading />}
      {!isLoading && more && <div ref={setEle}></div>}
    </div>
  );
};

export default Dashboard;
