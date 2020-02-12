import React from "react";

import MUIDataTable, {
  MUIDataTableColumn,
  MUIDataTableOptions
} from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import Barcode from "../barcode/Barcode";
import {RowData} from "../root/App";

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
  rows,
  onDelete
}: {
  columns: Column[];
  rows: Array<RowData>;
  onDelete: (uuid: string) => void;
}) {
  const options: MUIDataTableOptions = {
    filterType: "checkbox",
    pagination: false,
    responsive: "scrollFullHeight",
    rowHover: false,
    onRowsSelect: (rows: any[]) => {
      if (rows.length === 1) {
        onDelete(rows[rows[0].dataIndex]["uuid"]);
      }
    },
    filter: false
  };
  const customBodyRender = (value: string) => <Barcode value={value} />;

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
        data={rows}
        columns={renderedColumns}
        options={options}
      />
    </MuiThemeProvider>
  );
}

export default DataTable;
