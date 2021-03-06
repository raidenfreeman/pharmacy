import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { DataCategory } from "../root/App";
import TableCard from "./TableCard";
import CreateCategory from "../create-category/CreateCategory";

function TableList({
  selectedCategoryIndex,
  categories,
  onDelete,
  onEdit,
  onSelect,
  onAdd
}: {
  selectedCategoryIndex?: number;
  categories: DataCategory[];
  onDelete: (category: DataCategory) => void;
  onEdit: (category: DataCategory) => void;
  onSelect: (category: DataCategory) => void;
  onAdd: (category: DataCategory) => void;
}) {
  return (
    <>
      {!categories ||
        (categories.length === 0 && (
          <Typography style={{ padding: 10, textAlign: "center" }} variant="h5">
            Δημιουργήστε μια κατηγορία δεδομένων
          </Typography>
        ))}
      <Grid container spacing={3}>
        {categories &&
          categories.length > 0 &&
          categories.map((category, index) => (
            <Grid key={category.id} item xs>
              <TableCard
                isSelected={index === selectedCategoryIndex}
                category={category}
                onEdit={() => onEdit(category)}
                onSelect={() => onSelect(category)}
                onDelete={() => onDelete(category)}
              />
            </Grid>
          ))}
        <Grid item xs>
          <CreateCategory onCreateCategory={onAdd} />
        </Grid>
      </Grid>
    </>
  );
}

export default TableList;
