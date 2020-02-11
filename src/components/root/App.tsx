import React, { useState } from "react";
import "./App.css";
import { v4 as uuid } from "uuid";
import DataTable, { Column } from "../table/DataTable";
import CreateRecord from "../create-record/CreateRecord";
import CreateTable from "../create-table/CreateTable";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import clsx from "clsx";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme
} from "@material-ui/core/styles";
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
import MailIcon from "@material-ui/icons/Mail";
import {useStyles} from "./style";

const App = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [columns, setColumns] = useState<Array<Column>>([
    {
      name: "name",
      label: "Name"
    },
    {
      name: "city",
      label: "City"
    },
    {
      name: "company",
      label: "Company"
    },
    {
      name: "barcode",
      label: "State",
      barcode: true
    }
  ]);
  const [data, setData] = useState<Array<{ [key: string]: string }>>([
    {
      uuid: uuid(),
      barcode: "231231",
      name: "Joe James",
      company: "Test Corp",
      city: "Yonkers",
      state: "NY"
    },
    {
      uuid: uuid(),
      barcode: "123213",
      name: "John Walsh",
      company: "Test Corp",
      city: "Hartford",
      state: "CT"
    },
    {
      uuid: uuid(),
      barcode: "123213",
      name: "Bob Herm",
      company: "Test Corp",
      city: "Tampa",
      state: "FL"
    },
    {
      uuid: uuid(),
      barcode: "123213",
      name: "James Houston",
      company: "Test Corp",
      city: "Dallas",
      state: "TX"
    }
  ]);

  return (
    <Router>
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
            <ListItem button component={Link} to="/columns">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Στήλες"} />
            </ListItem>
            <ListItem button component={Link} to="/data">
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={"Δεδομένα"} />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path="/columns">
              <CreateTable onColumnsChanged={columns => setColumns(columns)} />
            </Route>
            <Route path="/data">
              <CreateRecord
                columns={columns}
                save={v => setData([...data, { ...v, uuid: uuid() }])}
              />
              <div className="table">
                <DataTable
                  data={data}
                  columns={columns}
                  onDelete={(uuid: string) => {
                    const t = data.filter(x => x["uuid"] !== uuid);
                    setData(t);
                  }}
                />
              </div>
            </Route>
            <Route path="/">hi</Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
