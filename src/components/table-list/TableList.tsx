import React from "react";
import { Grid } from "@material-ui/core";
import { DataCategory } from "../root/App";
import TableCard from "./TableCard";
import CreateCategory from "../create-category/CreateCategory";

function TableList({
  categories,
  onDelete,
  onEdit,
  onSelect,
  onAdd
}: {
  categories: DataCategory[];
  onDelete: (category: DataCategory) => void;
  onEdit: (category: DataCategory) => void;
  onSelect: (category: DataCategory) => void;
  onAdd: (category: DataCategory) => void;
}) {
  return (
    <Grid container spacing={3}>
      {categories &&
        categories.length > 0 &&
        categories.map(category => (
          <Grid key={category.id} item xs>
            <TableCard
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
  );
}

export default TableList;
