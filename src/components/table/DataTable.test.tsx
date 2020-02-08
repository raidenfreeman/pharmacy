import React from "react";
import { render } from "@testing-library/react";
import App from "../root/App";
import DataTable from "./DataTable";

// import { DataRecord } from "../interfaces/Record";

export enum RenderTypes {
  Text,
  Date,
  Barcode
}

interface DataColumn {
  id: string;
  description: string;
  renderAs: RenderTypes;
}

interface DataRecord<T> {
  [key: string]: T;
}

// interface DataRecords{
//   columns:[]
// }

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
  const data = [
    {
      uuid: "uuid1",
      name: "record1",
      expiration: new Date("01-01-2019").toLocaleString()
    }
  ];

  const { getByText } = render(<DataTable columns={columns} data={data} />);
  const record = getByText(/record1/i);
  expect(record).toBeInTheDocument();
});

test("renders multiple lines", () => {
  const data = [
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
  const { getAllByText } = render(<DataTable columns={columns} data={data} />);
  const { length } = getAllByText(/record/i);
  expect(length).toBe(5);
});

test("renders a barcode", () => {
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
  const data = [
    {
      uuid: "uuid1",
      barcode: "1234"
    }
  ];

  const { getAllByAltText } = render(
    <DataTable columns={barcodeColumns} data={data} />
  );
  const record = getAllByAltText(/1234/i);
  expect(record).toBeInTheDocument();
});
