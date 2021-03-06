import React from "react";

import MUIDataTable, {
  MUIDataTableColumn,
  MUIDataTableOptions
} from "mui-datatables";
import { createMuiTheme, Grid, MuiThemeProvider } from "@material-ui/core";
import Barcode from "../barcode/Barcode";
import { RowData } from "../root/App";
import Typography from "@material-ui/core/Typography";

export type Column = MUIDataTableColumn & { barcode?: boolean; sum?: boolean };

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
  },
  MUIDataTableHeadCell: {
    root: {
      fontSize: "large",
      textDecoration: "underline"
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
  onDelete,
  title
}: {
  columns: Column[];
  rows: Array<RowData>;
  onDelete: (uuid: string) => void;
  title: string;
}) {
  const options: MUIDataTableOptions = {
    selectableRowsHeader: false,
    filterType: "checkbox",
    pagination: false,
    responsive: "scrollFullHeight",
    rowHover: false,
    onRowsSelect: (dataTableRows: any[]) => {
      if (dataTableRows.length === 1) {
        onDelete(rows[dataTableRows[0].dataIndex].id);
      }
    },
    filter: false,
    textLabels: {
      body: {
        noMatch: "Δεν βρέθηκαν στοιχεία",
        toolTip: "Ταξινόμηση",
      },
      pagination: {
        next: "Next Page",
        previous: "Previous Page",
        rowsPerPage: "Rows per page:",
        displayRows: "of",
      },
      toolbar: {
        search: "Αναζήτηση",
        downloadCsv: "Κατέβασμα CSV (για Excel)",
        print: "Εκτύπωση",
        viewColumns: "Προβολή Στηλών",
        filterTable: "Φίλτρα",
      },
      filter: {
        all: "Όλα",
        title: "ΦΙΛΤΡΑ",
        reset: "ΕΠΑΝΑΦΟΡΑ",
      },
      viewColumns: {
        title: "Εμφάνιση Στηλών",
        titleAria: "Εμφάνιση/Απόκρυψη Στηλών",
      },
      selectedRows: {
        text: "στήλη(-ες) επιλέχθηκαν",
        delete: "Διαγραφή",
        deleteAria: "Διαγραφή Επιλεγμένων Στηλών",
      },
    }
  };
  const customBodyRender = (value: string) => <Barcode value={value} />;

  const renderedColumns = columns.map(column => {
    if (column["barcode"]) {
      return { ...column, options: { ...column.options, customBodyRender } };
    }
    return column;
  });
  const columnsToSum = columns.filter(c => c.sum && c.name);

  const sums: Map<string, number> = new Map(columnsToSum.map(c => [c.name, 0]));
  rows.forEach(r => {
    columnsToSum.forEach(c => {
      sums.set(c.name, (sums.get(c.name) || 0) + +r[c.name]);
    });
  });

  //   rows
  // .map(r => Object.keys(r).map(k => +r[k]))
  // .reduce((acc, curr) => {
  //   namesToSum.forEach(name => {
  //     if (!acc[name]) {
  //       acc[name] = 0;
  //     }
  //     acc[name] += curr[name];
  //   });
  //   return acc;
  // }, {});
  return (
    <>
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={title}
          data={rows}
          columns={renderedColumns}
          options={options}
        />
      </MuiThemeProvider>
      <Typography style={{ marginTop: 15 }} variant="h5">
        Πλήθος Στοιχείων: {rows.length}
      </Typography>
      {rows.length > 0 && (
        <>
          <Typography style={{ marginTop: 10 }} variant="h5">
            Σύνολα:
          </Typography>
          <Grid style={{ marginLeft: 10 }} container spacing={3} item xs>
            {columnsToSum.map(column => (
              <Grid key={column.name} item xs>
                <Typography variant="h6">
                  {column.label}: {sums.get(column.name)}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
}

export default DataTable;
