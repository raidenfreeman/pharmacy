import React from "react";
import JsBarcode from "jsbarcode";
import { render } from "@testing-library/react";
import Barcode from "./Barcode";

jest.mock("jsbarcode");
test("renders a barcode", () => {
  const spy = jest.fn();
  (JsBarcode as jest.MockedFunction<any>).mockImplementation(spy);
  render(<Barcode value={"55555"} />);
  expect(spy).toHaveBeenCalledWith(expect.anything(), "55555", undefined);
});
test("renders with an invalid barcode", () => {
  // const spy = jest.fn();
  // (JsBarcode as jest.MockedFunction<any>).mockImplementation(spy);
  const { getByTestId } = render(
    <Barcode value={"abc"} options={{ format: "pharmacode" }} />
  );
  expect(getByTestId("gg")).toBeTruthy();
  // expect(spy).toHaveBeenCalledWith(expect.anything(), "55555", undefined);
});
