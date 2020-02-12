import React from "react";
import { render } from "@testing-library/react";
import { RouterApp } from "./App";

test("renders learn react link", () => {
  const { getByText } = render(<RouterApp />);
  const linkElement = getByText(/hello world/i);
  expect(linkElement).toBeInTheDocument();
});
