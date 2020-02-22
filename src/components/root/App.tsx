import React, { ChangeEvent, useContext, useState } from "react";
import "./App.css";
import DataTable, { Column } from "../table/DataTable";
import CreateColumns from "../create-columns/CreateColumns";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect
} from "react-router-dom";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import SearchIcon from "@material-ui/icons/Search";
import { useStyles } from "./style";
import TableList from "../table-list/TableList";
import CreateRecord from "../create-record/CreateRecord";
import { firestore, app, initializeApp, auth } from "firebase";
import { Button, Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

export interface DataCategory {
  id: string;
  name: string;
  columns: Array<Column>;
  rows: Array<RowData>;
}

export interface RowData {
  [key: string]: string;
}

// export interface RowData extends RowInnerData {
//   uuid: string;
// }
initializeApp({
  apiKey: "AIzaSyDtemDBWVc0C9wzOk1j8kPpGxnHq_FBuac",
  authDomain: "pharm-1993f.firebaseapp.com",
  databaseURL: "https://pharm-1993f.firebaseio.com",
  projectId: "pharm-1993f",
  storageBucket: "pharm-1993f.appspot.com",
  messagingSenderId: "306853161109",
  appId: "1:306853161109:web:ed06674ceec7c3933f539c"
});

const App = () => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [usernameInput, setUsernameInput] = React.useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [categories, setCategories] = useState<Array<DataCategory>>([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>();
  const [loginError, setLoginError] = useState<string>("");

  const onUpdateCategoryRow = (category: DataCategory, newRow: RowData) => {
    const categoryIndex = categories.findIndex(x => x.id === category.id);
    const newCategoryRows = [...categories[categoryIndex].rows, newRow];
    const newCategory = Object.assign({}, categories[categoryIndex], {
      rows: newCategoryRows
    });
    setCategories(
      categories.map((oldCategory, i) =>
        i === categoryIndex ? newCategory : oldCategory
      )
    );
  };
  const onUpdateCategoryRows = (
    category: DataCategory,
    newRows: Array<RowData>
  ) => {
    const categoryIndex = categories.findIndex(x => x.id === category.id);
    const newCategory = Object.assign({}, categories[categoryIndex], {
      rows: newRows
    });
    setCategories(
      categories.map((oldCategory, i) =>
        i === categoryIndex ? newCategory : oldCategory
      )
    );
  };
  const onAddCategoryRow = (category: DataCategory, newRow: RowData) => {
    const newCategory = Object.assign({}, category, {
      rows: [...category.rows, newRow]
    });
    setCategories(
      categories.map(oldCategory =>
        oldCategory.id === category.id ? newCategory : oldCategory
      )
    );
  };
  const onUpdateCategoryColumns = (
    category: DataCategory,
    newColumns: Array<Column>
  ) => {
    const categoryIndex = categories.findIndex(x => x.id === category.id);
    const newCategory = Object.assign({}, categories[categoryIndex], {
      columns: newColumns
    });
    setCategories(
      categories.map((oldCategory, i) =>
        i === categoryIndex ? newCategory : oldCategory
      )
    );
  };
  const onUpdateCategoryColumn = (
    category: DataCategory,
    newColumn: Column
  ) => {
    const categoryIndex = categories.findIndex(x => x.id === category.id);
    const newCategoryColumns = [
      ...categories[categoryIndex].columns,
      newColumn
    ];
    const newCategory = Object.assign({}, categories[categoryIndex], {
      columns: newColumn
    });
    setCategories(
      categories.map((oldCategory, i) =>
        i === categoryIndex ? newCategory : oldCategory
      )
    );
  };
  const onDeleteCategoryRow = (category: DataCategory, rowId: string) => {
    const categoryIndex = categories.findIndex(x => x.id === category.id);
    const newCategoryRows = categories[categoryIndex].rows.filter(
      row => rowId !== row.id
    );
    const newCategory = Object.assign({}, categories[categoryIndex], {
      rows: newCategoryRows
    });
    setCategories(
      categories.map((oldCategory, i) =>
        i === categoryIndex ? newCategory : oldCategory
      )
    );
  };
  const onDeleteCategoryColumn = (
    category: DataCategory,
    columnName: string
  ) => {
    const categoryIndex = categories.findIndex(x => x.id === category.id);
    const newCategoryColumns = categories[categoryIndex].columns.filter(
      column => columnName !== column.name
    );
    const newCategory = Object.assign({}, categories[categoryIndex], {
      columns: newCategoryColumns
    });
    setCategories(
      categories.map((oldCategory, i) =>
        i === categoryIndex ? newCategory : oldCategory
      )
    );
  };

  const onDeleteCategory = (category: DataCategory) => {
    const c = categories.filter(x => x.id !== category.id);
    console.log(c);
    setCategories(c);
  };
  const onSelectCategory = (category: DataCategory) => {
    const r = categories.findIndex(x => x.id === category.id);
    console.log(r);
    setSelectedCategoryIndex(r);
  };
  const onEditCategory = (category: DataCategory) => {
    onSelectCategory(category);
    history.push("/columns");
  };
  const onAddCategory = (category: DataCategory) => {
    setCategories([...categories, category]);
    setSelectedCategoryIndex(categories.length);
  };
  const [user, setUser] = useState();
  const login = () => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regex.test(usernameInput)) {
      console.log("login");
      const uiConfig = {
        signInOptions: [
          {
            provider: auth.EmailAuthProvider.PROVIDER_ID,
            signInMethod: auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
            requireDisplayName: false
          }
        ]
      };
    } else {
      setLoginError("Μη έγκυρο e-mail");
    }
  };
  const onUsernameChanged = (
    v: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setLoginError("");
    setUsernameInput(v.target.value);
  };
  return (
    <div className="App">
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Φαρμακείο Πέτρος Γκίνης
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <Typography variant="h6" style={{ flex: 1, marginLeft: "1em" }}>
            Πλοήγηση
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Κατηγορίες"} />
          </ListItem>
          <ListItem button component={Link} to="/login">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Σύνδεση"} />
          </ListItem>
          <ListItem button component={Link} to="/columns">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Στήλες"} />
          </ListItem>
          <ListItem button component={Link} to="/rows">
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary={"Δεδομένα"} />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <PrivateRoute
            path="/columns"
            render={() => {
              if (
                selectedCategoryIndex !== undefined &&
                categories.length > 0
              ) {
                return (
                  <CreateColumns
                    initialColumns={categories[selectedCategoryIndex].columns}
                    onColumnsChanged={columns =>
                      onUpdateCategoryColumns(
                        categories[selectedCategoryIndex],
                        columns
                      )
                    }
                  />
                );
              } else {
                return <Redirect to="/category-list" />;
              }
            }}
          />
          <PrivateRoute
            path="/rows"
            render={() => {
              if (
                selectedCategoryIndex !== undefined &&
                selectedCategoryIndex !== null &&
                categories.length > 0 &&
                categories[selectedCategoryIndex].columns.length > 0
              ) {
                return (
                  <>
                    <CreateRecord
                      columns={categories[selectedCategoryIndex].columns}
                      save={rows => {
                        onAddCategoryRow(
                          categories[selectedCategoryIndex],
                          rows
                        );
                      }}
                    />
                    <div className="table">
                      <DataTable
                        rows={categories[selectedCategoryIndex].rows}
                        columns={categories[selectedCategoryIndex].columns}
                        onDelete={(uuid: string) =>
                          onDeleteCategoryRow(
                            categories[selectedCategoryIndex],
                            uuid
                          )
                        }
                      />
                    </div>
                  </>
                );
              } else {
                return <Redirect to="/category-list" />;
              }
            }}
          />
          <PrivateRoute path="/category-list">
            <TableList
              categories={categories}
              onDelete={onDeleteCategory}
              onEdit={onEditCategory}
              onSelect={onSelectCategory}
              onAdd={onAddCategory}
            />
          </PrivateRoute>
          <Route path="/">
            <div className="login">
              {/*<div>*/}
              <Typography variant="h5" style={{ marginBottom: 80 }}>
                Συνδεθείτε στην εφαρμογή με τη διεύθυνση email σας
              </Typography>
              <TextField
                type="email"
                inputProps={{
                  autocomplete: "email"
                }}
                style={{ marginBottom: 40, width: 300 }}
                value={usernameInput}
                onChange={onUsernameChanged}
                error={!!loginError}
                helperText={loginError}
                label="e-mail"
                variant="filled"
              />
              <Button onClick={login} variant="contained" color="primary">
                ΣΥΝΔΕΣΗ
              </Button>
              {/*</div>*/}
            </div>
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  accessToken: string;
}

export const CurrentUserContext = React.createContext<UserData | null>(null);

const PrivateRoute = ({ children, ...rest }: any) => {
  const user = useContext<UserData | null>(CurrentUserContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

const RoutedApp = () => (
  <Router>
    <App />
  </Router>
);

export default RoutedApp;
