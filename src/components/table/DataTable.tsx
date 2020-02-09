import React from "react";

import MUIDataTable, {
  MUIDataTableColumn,
  MUIDataTableOptions
} from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import Barcode from "../barcode/Barcode";

export type Column = MUIDataTableColumn & { barcode?: boolean };

const override = {
  MUIDataTableBodyRow: {
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: "#737373",
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

function DataTable({
  columns,
  data,
  onDelete
}: {
  columns: Column[];
  data: Array<{ [key: string]: string }>;
  onDelete: (uuid: string) => void;
}) {
  const options: MUIDataTableOptions = {
    filterType: "checkbox",
    pagination: false,
    responsive: "scrollFullHeight",
    rowHover: false,
    onRowsSelect: (rows: any[]) => {
      if (rows.length === 1) {
        onDelete(data[rows[0].dataIndex]["uuid"]);
      }
    },
    filter: false
  };
  const customBodyRender = (value: string) => (
    <Barcode
      value={value}
      options={{
        width: 3,
        height: 40,
        displayValue: true
      }}
    ></Barcode>
  );

  const renderedColumns = columns.map(column => {
    if (column["barcode"]) {
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
