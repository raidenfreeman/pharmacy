import React, { useState, Fragment } from "react";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import Paper from "@material-ui/core/Paper";
import {
  Divider,
  FormControlLabel,
  Grid,
  Switch,
  Typography
} from "@material-ui/core";
import { v4 as uuid } from "uuid";
import { Column } from "../table/DataTable";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
function CreateColumns({
  onColumnsChanged,
  initialColumns
}: {
  onColumnsChanged: (columns: Array<Column>) => void;
  initialColumns?: Array<Column>;
}) {
  const [columns, setColumns] = useState<Array<Column>>(initialColumns || []);
  const history = useHistory();
  const addColumn = () => {
    setColumns([...columns, { name: uuid(), label: "" }]);
  };
  const removeColumn = (name: String) => () => {
    setColumns(columns.filter(x => x.name !== name));
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
      columns.map(x =>
        x.name === name ? { ...x, barcode: e.target.checked } : x
      )
    );
  };
  const save = () => {
    onColumnsChanged(columns.filter(x => x.label !== ""));
    history.push("rows");
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Fab
          color="secondary"
          disabled={
            !columns || columns.filter(x => x.label !== "").length === 0
          }
          onClick={save}
          aria-label="save"
        >
          <SaveIcon />
        </Fab>
      </div>
      {!columns ||
        (columns.length === 0 && (
          <Typography style={{ padding: 10, textAlign: "center" }} variant="h5">
            Δημιουργήστε μια στήλη δεδομένων
          </Typography>
        ))}
      <Paper style={{ margin: 5, padding: 10 }}>
        {columns && columns.length > 0 && (
          <Grid
            style={{ padding: 10 }}
            direction={"column"}
            container
            spacing={3}
          >
            {columns.map((c, i) => (
              <Fragment key={c.name}>
                <Grid container spacing={3} item xs>
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
                  <Grid item xs={1}>
                    <Fab
                      color="primary"
                      onClick={removeColumn(c.name)}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </Fab>
                  </Grid>
                </Grid>
                <Divider />
              </Fragment>
            ))}
          </Grid>
        )}
        <div
          style={{ display: "flex", marginTop: 10, justifyContent: "center" }}
        >
          <Fab color="primary" onClick={addColumn} aria-label="add">
            <AddIcon />
          </Fab>
        </div>
      </Paper>
    </>
  );
}

export default CreateColumns;
