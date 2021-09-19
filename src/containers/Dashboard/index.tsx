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
import { Character, Film } from "types/common";
import Toolbar from "components/Toolbar";
import { MyContext } from "App";
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
  const [originalList, setOriginalList] = useState<Character[]>([]);
  const [favourites, setFavourites] = useState<string[]>(
    context.favChars || []
  );
  const [exportCharacters, setExportCharacters] = useState<Character[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [list, setList] = useState<Character[]>([]);
  const [more, setMore] = useState(false);
  const [ele, setEle] = useState<HTMLDivElement | null>(null);

  const onSearch = useCallback((searchValue: string) => {
    setSearch(searchValue);
  }, []);

  const getData = useCallback(() => {
    const fetchRequest = async () => {
      setLoading(true);
      try {
        const res = await fetch(swapiUrl, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
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

  const handleDownload = () => {
    const favourListDownload = list.filter((character) =>
      favourites.includes(character.id)
    );
    setExportCharacters(favourListDownload);
  };

  useEffect(() => {
    const temp = [...originalList];
    const filteredList = temp.filter(
      (item) =>
        item.name.toLowerCase().includes(searchText) ||
        item.filmConnection.films.some((film: Film) =>
          film.title.toLowerCase().includes(searchText)
        )
    );
    setList(filteredList);
  }, [searchText, originalList]);

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
    <div className={classes.wrapper}>
      <Toolbar
        data={exportCharacters}
        onSearch={onSearch}
        handleDownload={handleDownload}
      />
      <List
        list={list}
        toggleFavorite={toggleFavorite}
        favouriteList={favourites}
      />
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <>
          {(error || list.length === 0) && (
            <div className={classes.noResult}>No result!!!</div>
          )}
        </>
      )}
      {!isLoading && more && <div ref={setEle}></div>}
    </div>
  );
};

export default Dashboard;
