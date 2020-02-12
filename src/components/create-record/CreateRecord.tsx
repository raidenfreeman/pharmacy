import React, { useRef, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { Column } from "../table/DataTable";
import { RowData } from "../root/App";

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
  const onSave = () => {
    if (Object.keys(s).length !== columns.length) {
      return;
    }
    save(s);
    re.current && re.current.focus();
    set({});
  };
  return (
    <Paper style={{ margin: 5, padding: 10 }}>
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
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<SaveIcon />}
            onClick={onSave}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CreateRecord;
