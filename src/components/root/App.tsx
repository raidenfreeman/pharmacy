import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import "./App.css";
import DataTable from "../table/DataTable";

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
    name: "city",
    label: "City",
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: "company",
    label: "Company",
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: "barcode",
    label: "State",
    options: {
      filter: true,
      sort: false
    },
    barcode: true
  }
];

const App = () => {
  const [b, set] = useState(-123213);
  const data = [
    {
      barcode: b.toString(),
      name: "Joe James",
      company: "Test Corp",
      city: "Yonkers",
      state: "NY"
    },
    {
      barcode: "123213",
      name: "John Walsh",
      company: "Test Corp",
      city: "Hartford",
      state: "CT"
    },
    {
      barcode: "123213",
      name: "Bob Herm",
      company: "Test Corp",
      city: "Tampa",
      state: "FL"
    },
    {
      barcode: "123213",
      name: "James Houston",
      company: "Test Corp",
      city: "Dallas",
      state: "TX"
    }
  ];

  return (
    <div className="App">
      {/*{b}*/}
      {/*<Button*/}
      {/*  onClick={() => (b > 0 ? set(-b) : set(-b + 1))}*/}
      {/*  variant="contained"*/}
      {/*  color="primary"*/}
      {/*>*/}
      {/*  Hello World*/}
      {/*</Button>*/}
      <div className="table">
        <DataTable data={data} columns={columns} />
      </div>
    </div>
  );
};

export default App;
