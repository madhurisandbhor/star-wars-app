import React from "react";
import { render, cleanup, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "containers/Dashboard";
import "./mocks/intersectionObserverMock";
import Theme from "theme";

afterEach(cleanup);

test("render dashboard container", () => {
  render(<Theme><Dashboard /></Theme>);
  const container = screen.queryByTestId("main-container");
  expect(container).toBeInTheDocument();
  const button = screen.getByText("Download favourites");
  expect(button).toBeInTheDocument();
});

test("on dashboard render, loading processor appears while data loads", () => {
  const { container } = render(<Theme><Dashboard /></Theme>);
  const loadingElements = container.getElementsByClassName(
    "MuiCircularProgress-root"
  );
  expect(loadingElements.length).toBe(1);
});

test("renders character list", async () => {
  const mockSuccessResponse = {
    data: {
      allPeople: {
        pageInfo: {
          endCursor: "YXJyYXljb25uZWN0aW9uOjEx",
          hasNextPage: true,
        },
        totalCount: 82,
        people: [
          {
            id: "cGVvcGxlOjE=",
            name: "Luke Skywalker",
            gender: "male",
            height: 172,
            mass: 77,
            birthYear: "19BBY",
            skinColor: "fair",
            eyeColor: "blue",
            hairColor: "blond",
            filmConnection: {
              films: [
                { id: "ZmlsbXM6MQ==", title: "A New Hope" },
                { id: "ZmlsbXM6Mg==", title: "The Empire Strikes Back" },
                { id: "ZmlsbXM6Mw==", title: "Return of the Jedi" },
                { id: "ZmlsbXM6Ng==", title: "Revenge of the Sith" },
              ],
            },
          },
          {
            id: "cGVvcGxlOjI=",
            name: "C-3PO",
            gender: "n/a",
            height: 167,
            mass: 75,
            birthYear: "112BBY",
            skinColor: "gold",
            eyeColor: "yellow",
            hairColor: "n/a",
            filmConnection: {
              films: [
                { id: "ZmlsbXM6MQ==", title: "A New Hope" },
                { id: "ZmlsbXM6Mg==", title: "The Empire Strikes Back" },
                { id: "ZmlsbXM6Mw==", title: "Return of the Jedi" },
                { id: "ZmlsbXM6NA==", title: "The Phantom Menace" },
                { id: "ZmlsbXM6NQ==", title: "Attack of the Clones" },
              ],
            },
          },
          {
            id: "cGVvcGxlOjM=",
            name: "R2-D2",
            gender: "n/a",
            height: 96,
            mass: 32,
            birthYear: "33BBY",
            skinColor: "white, blue",
            eyeColor: "red",
            hairColor: "n/a",
            filmConnection: {
              films: [
                { id: "ZmlsbXM6MQ==", title: "A New Hope" },
                { id: "ZmlsbXM6Mg==", title: "The Empire Strikes Back" },
                { id: "ZmlsbXM6Mw==", title: "Return of the Jedi" },
                { id: "ZmlsbXM6Ng==", title: "Revenge of the Sith" },
              ],
            },
          },
          {
            id: "cGVvcGxlOjQ=",
            name: "Darth Vader",
            gender: "male",
            height: 202,
            mass: 136,
            birthYear: "41.9BBY",
            skinColor: "white",
            eyeColor: "yellow",
            hairColor: "none",
            filmConnection: {
              films: [
                { id: "ZmlsbXM6MQ==", title: "A New Hope" },
                { id: "ZmlsbXM6Mg==", title: "The Empire Strikes Back" },
                { id: "ZmlsbXM6Mw==", title: "Return of the Jedi" },
                { id: "ZmlsbXM6Ng==", title: "Revenge of the Sith" },
              ],
            },
          },
          {
            id: "cGVvcGxlOjU=",
            name: "Leia Organa",
            gender: "female",
            height: 150,
            mass: 49,
            birthYear: "19BBY",
            skinColor: "light",
            eyeColor: "brown",
            hairColor: "brown",
            filmConnection: {
              films: [
                { id: "ZmlsbXM6MQ==", title: "A New Hope" },
                { id: "ZmlsbXM6Mg==", title: "The Empire Strikes Back" },
                { id: "ZmlsbXM6Mw==", title: "Return of the Jedi" },
                { id: "ZmlsbXM6Ng==", title: "Revenge of the Sith" },
              ],
            },
          },
        ],
      },
    },
  };

  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
  });
  const globalRef = global; // : NodeJS.Global & typeof globalThis
  globalRef.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

  const intersectionObserverMock = () => ({
    observe: () => null,
  });
  window.IntersectionObserver = jest
    .fn()
    .mockImplementation(intersectionObserverMock);

  await act(async () => {
    render(<Theme><Dashboard /></Theme>);
  });

  const item1 = screen.getByText("Luke Skywalker");
  expect(item1).toBeInTheDocument();
  const item2 = screen.getByText("C-3PO");
  expect(item2).toBeInTheDocument();
  expect(screen.queryByText("C-30")).not.toBeInTheDocument();
});
