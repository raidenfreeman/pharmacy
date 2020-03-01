import React, { FormEvent, useRef, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Fab, Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import SaveIcon from "@material-ui/icons/Save";
import { Column } from "../table/DataTable";
import { RowData } from "../root/App";
import { v4 as uuid } from "uuid";
function CreateRecord({
  columns,
  save
}: {
  columns: Column[];
  save: (values: RowData) => void;
}) {
  const [s, set] = useState<RowData>({});
  const re = useRef<HTMLInputElement>(null);

  const onChangeGenerator = (key: string) => (v: any) =>
    set({ ...s, [key]: v.target.value });
  const onSave = (e: FormEvent<any>) => {
    e.preventDefault();
    console.log('hi');
    const numberOfValuesWithData = Object.values(s).filter(x => x).length;
    if (numberOfValuesWithData !== columns.length) {
      return;
    }
    save({ ...s, id: uuid() });
    re.current && re.current.focus();
    set({});
  };
  return (
    <Paper style={{ margin: 5, padding: 10 }}>
        <form onSubmit={onSave}>
      <Grid container spacing={3}>
          {columns.map((c, i) => (
            <Grid key={c.name} item xs>
              <TextField
                inputRef={i === 0 ? re : null}
                value={s[c.name] || ""}
                onChange={onChangeGenerator(c.name)}
                label={c.label}
                variant="outlined"
              />
            </Grid>
          ))}
          <Grid item xs>
            <Fab color="primary" type="submit" size="small" onClick={onSave}>
              <SaveIcon />
            </Fab>
          </Grid>
      </Grid>
        </form>
    </Paper>
  );
}

export default CreateRecord;
