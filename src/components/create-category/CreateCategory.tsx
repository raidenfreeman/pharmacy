import React, { ChangeEvent, FormEvent, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { DataCategory } from "../root/App";
import { v4 as uuid } from "uuid";
import { Prompt } from "react-router";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  }
});

function CreateCategory({
  onCreateCategory
}: {
  onCreateCategory: (category: DataCategory) => void;
}) {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [isBlocking, setIsBlocking] = useState(false);
  const onSave = (e: FormEvent<any>) => {
    e.preventDefault();
    if (name && name !== "") {
      onCreateCategory({ id: uuid(), columns: [], rows: [], name });
      setName("");
    }
    setIsBlocking(false);
  };
  const onTextChanged = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const text = e.target.value;
    setName(text);
    setIsBlocking(text !== "");
  };
  return (
    <>
      <Prompt
        when={isBlocking}
        message={location =>
          `Δεν έχετε αποθηκεύσει τις αλλαγές σας. Θέλετε να φύγετε;`
        }
      />
      <form onSubmit={onSave}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardContent>
              <TextField
                value={name}
                onChange={onTextChanged}
                label={"Όνομα Κατηγορίας"}
                variant="outlined"
              />
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={onSave}
              variant="contained"
              endIcon={<SaveIcon />}
            >
              Αποθήκευση
            </Button>
          </CardActions>
        </Card>
      </form>
    </>
  );
}

export default CreateCategory;
