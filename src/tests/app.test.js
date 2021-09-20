import React from "react";
import { render, screen } from "@testing-library/react";
import App from "App";
import "./mocks/intersectionObserverMock";

test("renders app component", () => {
  render(<App />);
  const app = screen.queryByTestId('app-id')
  expect(app).toBeInTheDocument();
});