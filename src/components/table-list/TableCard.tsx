import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem
} from "@material-ui/core";
import { Column } from "../table/DataTable";
import { DataCategory } from "../root/App";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  selected: {
    backgroundColor: "#ffa07a99"
  }
});

export default function TableCard({
  isSelected,
  category,
  onEdit,
  onSelect,
  onDelete
}: {
  isSelected: boolean;
  category: DataCategory;
  onEdit: () => void;
  onSelect: () => void;
  onDelete: () => void;
}) {
  console.log("card", isSelected);
  const styles = useStyles();
  const classes = styles.root + (isSelected ? " " + styles.selected : "");
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const { columns } = category;
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Card className={classes}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {category.name}
          </Typography>
          <List>
            {columns &&
              columns.length > 0 &&
              columns.map(column => (
                <ListItem key={column.name}>{column.label}</ListItem>
              ))}
            {(!columns || columns.length === 0) && (
              <Typography variant="h6">
                Αυτή η κατηγορία δεν έχει στήλες. Μπορείτε να προσθέσετε,
                πατώντας "Επεξεργασία"
              </Typography>
            )}
          </List>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={onEdit}
          variant="contained"
          endIcon={<EditIcon />}
        >
          Επεξεργασία
        </Button>
        {!isSelected && (
          <Button
            size="small"
            color="primary"
            onClick={onSelect}
            variant="contained"
            endIcon={<CheckIcon />}
          >
            Επιλογή
          </Button>
        )}
        <Button
          size="small"
          color="secondary"
          onClick={handleClickOpen}
          variant="contained"
          endIcon={<DeleteIcon />}
        >
          Διαγραφή
        </Button>
      </CardActions>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Διαγραφή κατηγορίας;"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography component={"span"} variant={"body2"}>
              Θέλετε σίγουρα να διαγράψετε αυτή την κατηγορία;
              <br />
              Δεν είναι δυνατό να την ανακτήσετε στο μέλλον.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDelete} color="default">
            Διαγραφή
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Άκυρο
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
