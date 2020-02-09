import React from "react";

import MUIDataTable, {
  MUIDataTableColumnDef,
  MUIDataTableOptions
} from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import Barcode from "../barcode/Barcode";

const override = {
  MUIDataTableBodyRow: {
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: "#203030",
        color: "white"
      }
    }
  },
  MUIDataTableBodyCell: {
    root: {
      color: "inherit"
    }
  },
  MUIDataTableSelectCell: {
    fixedHeaderCommon: {
      backgroundColor: "transparent"
    }
  }
} as any;

const getMuiTheme = () =>
  createMuiTheme({
    overrides: override
  });

const options: MUIDataTableOptions = {
  filterType: "checkbox",
  pagination: false,
  responsive: "scrollFullHeight"
};

function DataTable({
  columns,
  data
}: {
  columns: MUIDataTableColumnDef[];
  data: Array<object | number[] | string[]>;
}) {
  const customBodyRender = (value: string) => (
    <Barcode
      value={value}
      options={{
        format: "pharmacode",
        width: 3,
        height: 40,
        displayValue: true
      }}
    ></Barcode>
  );

  const renderedColumns = columns.map(column => {
    if (column.hasOwnProperty("barcode") && typeof column !== "string") {
      return { ...column, options: { ...column.options, customBodyRender } };
    }
    return column;
  });
  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        title={"Employee List"}
        data={data}
        columns={renderedColumns}
        options={options}
      />
    </MuiThemeProvider>
  );
}

export default DataTable;
