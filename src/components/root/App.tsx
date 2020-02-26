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

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url:
    process.env.NODE_ENV === "production"
      ? "https://pg-pharmacy.web.app/"
      : "http://localhost:3000/",
  // This must be true.
  handleCodeInApp: true
};

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
const db = firestore();

const App = () => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [usernameInput, setUsernameInput] = React.useState("");
  const [hasEmailBeenSent, setHasEmailBeenSent] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState<UserData | null>(null);
  function sendToFirestore(dataCategories: DataCategory[]) {
    if (currentUser) {
      db.collection("categories")
        .doc(currentUser.uid)
        .set({ userCategories: dataCategories });
    }
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [categories, setCategories] = useState<Array<DataCategory>>([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>();
  const [loginError, setLoginError] = useState<string>("");

  const onAddCategoryRow = (category: DataCategory, newRow: RowData) => {
    const newCategory = Object.assign({}, category, {
      rows: [...category.rows, newRow]
    });
    const newCategories = categories.map(oldCategory =>
      oldCategory.id === category.id ? newCategory : oldCategory
    );
    setCategories(newCategories);
    sendToFirestore(newCategories);
  };
  const onUpdateCategoryColumns = (
    category: DataCategory,
    newColumns: Array<Column>
  ) => {
    const categoryIndex = categories.findIndex(x => x.id === category.id);
    const newCategory = Object.assign({}, categories[categoryIndex], {
      columns: newColumns
    });
    const newCategories = categories.map((oldCategory, i) =>
      i === categoryIndex ? newCategory : oldCategory
    );
    setCategories(newCategories);
    sendToFirestore(newCategories);
  };
  const onDeleteCategoryRow = (category: DataCategory, rowId: string) => {
    const categoryIndex = categories.findIndex(x => x.id === category.id);
    const newCategoryRows = categories[categoryIndex].rows.filter(
      row => rowId !== row.id
    );
    const newCategory = Object.assign({}, categories[categoryIndex], {
      rows: newCategoryRows
    });
    const newCategories = categories.map((oldCategory, i) =>
      i === categoryIndex ? newCategory : oldCategory
    );
    setCategories(newCategories);
    sendToFirestore(newCategories);
  };

  const onDeleteCategory = (category: DataCategory) => {
    const c = categories.filter(x => x.id !== category.id);
    console.log(c);
    sendToFirestore(c);
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
    const newCategories = [...categories, category];
    setCategories(newCategories);
    sendToFirestore(newCategories);
    setSelectedCategoryIndex(categories.length);
  };
  const login = () => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regex.test(usernameInput)) {
      auth()
        .sendSignInLinkToEmail(usernameInput, actionCodeSettings)
        .then(function() {
          // The link was successfully sent. Inform the user.
          // Save the email locally so you don't need to ask the user for it again
          // if they open the link on the same device.
          setHasEmailBeenSent(true);
          window.localStorage.setItem("emailForSignIn", usernameInput);
        })
        .catch(function(error) {
          console.log(error);
          setLoginError("Κάτι πήγε στραβά :(");
          // Some error occurred, you can inspect the code: error.code
        });
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
  const onStart = () => {
    // Confirm the link is a sign-in with email link.
    setRunOnce(true);
    auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        setCurrentUser(user as any);

        db.collection("categories")
          .doc(user.uid)
          .get()
          .then(doc => {
            console.log("setting");
            if (doc.exists) {
              setCategories((doc.data() as any).userCategories);
            }
          });
      }
    });
    if (auth().isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt("Παρακαλώ εισάγετε το e-mail εγγραφής σας");
      }
      if (email) {
        // The client SDK will parse the code from the link for you.
        auth()
          .signInWithEmailLink(email, window.location.href)
          .then(function(result: any) {
            const { user } = result;
            console.log(result);
            // Clear email from storage.
            if (user) {
              window.localStorage.removeItem("emailForSignIn");
              console.log(user);
              setCurrentUser(user);
            }
            // You can access the new user via result.user
            // Additional user info profile not available via:
            // result.additionalUserInfo.profile == null
            // You can check if the user is new or existing:
            // result.additionalUserInfo.isNewUser
          })
          .catch(function(error) {
            console.log("signin error");
            console.log(error);
            // Some error occurred, you can inspect the code: error.code
            // Common errors could be invalid email and invalid or expired OTPs.
          });
      }
    }
  };
  const [runOnce, setRunOnce] = useState(false);
  if (!runOnce) {
    onStart();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar>
            {currentUser && (
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
            )}
            <Typography variant="h6" noWrap>
              Φαρμακείο Πέτρος Γκίνης
            </Typography>
          </Toolbar>
        </AppBar>
        {currentUser && (
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
              <ListItem button component={Link} to="/category-list">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Κατηγορίες"} />
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
        )}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <PrivateRoute path="/columns">
              {selectedCategoryIndex !== undefined && categories.length > 0 ? (
                <CreateColumns
                  initialColumns={categories[selectedCategoryIndex].columns}
                  onColumnsChanged={columns =>
                    onUpdateCategoryColumns(
                      categories[selectedCategoryIndex],
                      columns
                    )
                  }
                />
              ) : (
                <Redirect to="/category-list" />
              )}
            </PrivateRoute>
            <PrivateRoute path="/rows">
              {selectedCategoryIndex !== undefined &&
              selectedCategoryIndex !== null &&
              categories.length > 0 &&
              categories[selectedCategoryIndex].columns.length > 0 ? (
                <>
                  <CreateRecord
                    columns={categories[selectedCategoryIndex].columns}
                    save={rows => {
                      onAddCategoryRow(categories[selectedCategoryIndex], rows);
                    }}
                  />
                  <div className="table">
                    <DataTable
                      title={categories[selectedCategoryIndex].name}
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
              ) : (
                <Redirect to="/category-list" />
              )}
            </PrivateRoute>
            <PrivateRoute path="/category-list">
              <TableList
                selectedCategoryIndex={selectedCategoryIndex}
                categories={categories}
                onDelete={onDeleteCategory}
                onEdit={onEditCategory}
                onSelect={onSelectCategory}
                onAdd={onAddCategory}
              />
            </PrivateRoute>
            <Route
              path="/"
              render={() => {
                if (!currentUser) {
                  return (
                    <div className="login">
                      {hasEmailBeenSent ? (
                        <Typography variant="h5" style={{ marginBottom: 80 }}>
                          Ακολουθήστε το σύνδεσμο στο email σας για να
                          συνδεθείτε στην εφαρμογή. Μπορεί να έχει σταλεί στα
                          Ανεπιθύμητα.
                        </Typography>
                      ) : (
                        <>
                          <Typography variant="h5" style={{ marginBottom: 80 }}>
                            Συνδεθείτε στην εφαρμογή με τη διεύθυνση email σας
                          </Typography>
                          <TextField
                            type="email"
                            inputProps={{
                              autoComplete: "email"
                            }}
                            style={{ marginBottom: 40, width: 300 }}
                            value={usernameInput}
                            onChange={onUsernameChanged}
                            error={!!loginError}
                            helperText={loginError}
                            label="e-mail"
                            variant="filled"
                          />
                          <Button
                            onClick={login}
                            variant="contained"
                            color="primary"
                          >
                            ΣΥΝΔΕΣΗ
                          </Button>
                        </>
                      )}
                    </div>
                  );
                } else {
                  return <Redirect to="/category-list" />;
                }
              }}
            />
          </Switch>
        </main>
      </div>
    </CurrentUserContext.Provider>
  );
};

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
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
              pathname: "/",
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
