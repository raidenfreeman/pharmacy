import React from "react";

import MUIDataTable, {
  MUIDataTableColumnDef,
  MUIDataTableOptions
} from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { v4 as uuid } from "uuid";
import JsBarcode from "jsbarcode";

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
  //
  // const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  // JsBarcode(svgNode, 'test', {
  //   xmlDocument: document,
  // });
  const customBodyRender = (value: string) => {
    let barcodeRef = React.createRef();
    // @ts-ignore
    new JsBarcode(barcodeRef, value, {
      format: "pharmacode",
      width: 4,
      height: 80
    });
    return <img ref="barcodeRef" />;
  };

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
