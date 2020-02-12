import React from "react";
import { render } from "@testing-library/react";
import DataTable from "./DataTable";
import JsBarcode from "jsbarcode";
import Barcode from "../barcode/Barcode";

const columns = [
  {
    name: "name",
    label: "Name",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "expirationDate",
    label: "Expiration Date",
    options: {
      filter: true,
      sort: false
    }
  }
];
test("renders a record", () => {
  const rows = [
    {
      uuid: "uuid1",
      name: "record1",
      expiration: new Date("01-01-2019").toLocaleString()
    }
  ];

  const { getByText } = render(<DataTable columns={columns} rows={data} />);
  const record = getByText(/record1/i);
  expect(record).toBeInTheDocument();
});

test("renders multiple lines", () => {
  const rows = [
    {
      uuid: "uuid1",
      name: "record1",
      expiration: new Date("01-01-2019").toLocaleString()
    },
    {
      uuid: "uuid2",
      name: "record2",
      expiration: new Date("01-01-2019").toLocaleString()
    },
    {
      uuid: "uuid3",
      name: "record4",
      expiration: new Date("01-01-2019").toLocaleString()
    },
    {
      uuid: "uuid4",
      name: "record4",
      expiration: new Date("01-01-2019").toLocaleString()
    },
    {
      uuid: "uuid5",
      name: "record5",
      expiration: new Date("01-01-2019").toLocaleString()
    }
  ];
  const { getAllByText } = render(<DataTable columns={columns} rows={data} />);
  const { length } = getAllByText(/record/i);
  expect(length).toBe(5);
});

test("renders a barcode", () => {
  // const spy = jest.fn().mockImplementation(v => <div>{v}</div>);
  // jest.mock("../barcode/Barcode", () => (v: any) => <div>{v}</div>);
  jest.mock("../barcode/Barcode", () => jest.fn().mockImplementation(v => <div>{v}</div>));

  // (Barcode as jest.MockedFunction<any>).mockImplementation(spy);
  const barcodeColumns = [
    {
      name: "barcode",
      label: "Barcode",
      options: {
        filter: true,
        sort: true
      },
      barcode: true
    }
  ];
  const rows = [
    {
      uuid: "uuid1",
      barcode: "1234"
    }
  ];

  const { getAllByAltText } = render(
    <DataTable columns={barcodeColumns} rows={data} />
  );
  const record = getAllByAltText(/1234/i);
  expect(record.length).toBe(1); //.toBeInTheDocument();
});
