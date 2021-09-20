import React from "react";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import List from "components/List";
import "./mocks/intersectionObserverMock";
import Theme from "theme";

const dummyCharacters = [
  {
    birthYear: "19BBY",
    eyeColor: "brown",
    filmConnection: {
      films: [
        { id: "ZmlsbXM6MQ==", title: "A New Hope" },
        { id: "ZmlsbXM6Mg==", title: "The Empire Strikes Back" },
        { id: "ZmlsbXM6Mw==", title: "Return of the Jedi" },
        { id: "ZmlsbXM6Ng==", title: "Revenge of the Sith" },
      ],
    },
    gender: "female",
    hairColor: "brown",
    height: 150,
    id: "cGVvcGxlOjU=",
    mass: 49,
    name: "Leia Organa",
    skinColor: "light",
  },
  {
    birthYear: "52BBY",
    eyeColor: "blue",
    filmConnection: {
      films: [{ id: "ZmlsbXM6MQ==", title: "A New Hope" }],
    },
    gender: "male",
    hairColor: "brown, grey",
    height: 178,
    id: "cGVxleruOjd=",
    mass: 120,
    name: "Owen Lars",
    skinColor: "dark",
  },
];

const props = {
  list: [],
  favouriteList: [],
  toggleFavorite: () => {},
};

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

afterEach(cleanup);

test("renders 0 characters with no data", () => {
  const { container } = render(<Theme><List {...props} /></Theme>);
  const list = container.getElementsByClassName("character-card");
  expect(list.length).toBe(0);
});

test("renders 2 characters in the list", () => {
  props.list = dummyCharacters;
  const { container } = render(<Theme><List {...props} /></Theme>);
  const characters = container.getElementsByClassName("MuiCard-root");
  expect(characters.length).toBe(2);
});

test("renders character name, gender, films labels with values", () => {
  props.list = dummyCharacters;
  const { getByText, getAllByText } = render(<Theme><List {...props} /></Theme>);
  getByText("Leia Organa");
  getByText("Owen Lars");
  getByText("male");
  expect(getAllByText("Films").length).toBe(2);
});

test("user should be able to mark favourite character", () => {
  const handleClick = jest.fn();
  props.toggleFavorite = handleClick;
  props.list = dummyCharacters;

  render(<Theme><List {...props} /></Theme>);
  const heartIconDiv = screen.queryAllByTestId("heartSvg");
  expect(heartIconDiv.length).toBe(2);
  fireEvent.click(heartIconDiv[0]);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
