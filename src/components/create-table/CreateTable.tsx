import React, { useState } from "react";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import Paper from "@material-ui/core/Paper";
import { FormControlLabel, Grid, Switch } from "@material-ui/core";
import { v4 as uuid } from "uuid";
import { Column } from "../table/DataTable";
import TextField from "@material-ui/core/TextField";
function CreateTable({
  onColumnsChanged
}: {
  onColumnsChanged: (columns: any) => void;
}) {
  const [columns, setColumns] = useState<Array<Column>>([]);
  const addColumn = () => {
    setColumns([...columns, { name: uuid(), label: "" }]);
  };
  const onLabelChange = (name: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setColumns(
      columns.map(x => (x.name === name ? { ...x, label: e.target.value } : x))
    );
  };
  const onToggleChange = (name: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setColumns(
      columns.map(x => (x.name === name ? { ...x, barcode: e.target.checked } : x))
    );
  };
  const save = () => onColumnsChanged(columns);
  return (
    <Paper style={{ margin: 5, padding: 10 }}>
      <Grid direction={"column"} container spacing={3}>
        {columns.map((c, i) => (
          <Grid container spacing={3} key={c.name} item xs>
            <Grid item xs>
              <TextField
                value={c.label}
                onChange={onLabelChange(c.name)}
                // ref={input => (d[c.name] = input)}
                label={"Name"}
                variant="outlined"
              />
            </Grid>
            <Grid item xs>
              <FormControlLabel
                control={
                  <Switch
                    checked={c.barcode || false}
                    onChange={onToggleChange(c.name)}
                    color="primary"
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                }
                label="Barcode"
              />
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <Fab color="primary" onClick={addColumn} aria-label="add">
            <AddIcon />
          </Fab>
        </Grid>
        <Grid item xs>
          <Fab color="primary" onClick={save} aria-label="save">
            <SaveIcon />
          </Fab>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CreateTable;
