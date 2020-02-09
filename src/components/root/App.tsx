import React, { useState } from "react";
import "./App.css";
import { v4 as uuid } from "uuid";
import DataTable, { Column } from "../table/DataTable";
import CreateRecord from "../create-record/CreateRecord";
import CreateTable from "../create-table/CreateTable";

const App = () => {
  const [columns, setColumns] = useState<Array<Column>>([
    {
      name: "name",
      label: "Name"
    },
    {
      name: "city",
      label: "City"
    },
    {
      name: "company",
      label: "Company"
    },
    {
      name: "barcode",
      label: "State",
      barcode: true
    }
  ]);
  const [data, setData] = useState<Array<{ [key: string]: string }>>([
    {
      uuid: uuid(),
      barcode: "231231",
      name: "Joe James",
      company: "Test Corp",
      city: "Yonkers",
      state: "NY"
    },
    {
      uuid: uuid(),
      barcode: "123213",
      name: "John Walsh",
      company: "Test Corp",
      city: "Hartford",
      state: "CT"
    },
    {
      uuid: uuid(),
      barcode: "123213",
      name: "Bob Herm",
      company: "Test Corp",
      city: "Tampa",
      state: "FL"
    },
    {
      uuid: uuid(),
      barcode: "123213",
      name: "James Houston",
      company: "Test Corp",
      city: "Dallas",
      state: "TX"
    }
  ]);

  return (
    <div className="App">
      <CreateTable
        onColumnsChanged={columns => setColumns(columns)}
      ></CreateTable>
      <CreateRecord
        columns={columns}
        save={v => setData([...data, { ...v, uuid: uuid() }])}
      />
      <div className="table">
        <DataTable
          data={data}
          columns={columns}
          onDelete={(uuid: string) => {
            const t = data.filter(x => x["uuid"] !== uuid);
            setData(t);
          }}
        />
      </div>
    </div>
  );
};

export default App;
