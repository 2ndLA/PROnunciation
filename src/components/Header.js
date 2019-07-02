import React, { Component } from 'react';
import clsx from 'clsx';
import {
  AppBar,
  colors,
  Grid,
  IconButton,
  List,
  ListItem,
  SwipeableDrawer,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { fade } from '@material-ui/core/styles';

import Menu from './Menu';
import SearchBar from './SearchBar';
import { total } from '../data';

const logo = require('../assets/pron.png');

const styles = theme => ({
  appBar: {
    position: 'fixed',
    boxShadow: `0 2px 8px ${theme.palette.grey['300']};`,
    backgroundColor: 'white',
  },
  itemsLayout: {
    minHeight: '56px',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-evenly',
    },
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    '-webkitTapHighlightColor': 'transparent',
  },
  logoImg: {
    display: 'inline',
    verticalAlign: 'middle',
    paddingBottom: '0.2em',
    marginRight: 10,
    width: '24px',
    [theme.breakpoints.down('xs')]: {
      width: '20px',
    },
  },
  org: {
    display: 'inline-block',
    borderLeft: `1px solid ${theme.palette.grey.A100}`,
    marginLeft: 24,
    paddingLeft: 22,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  appName: {
    fontWeight: 'bold',
    display: 'inline-block',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
    padding: theme.spacing(0.25, 1, 0, 1),
  },
  pronLabel: {
    color: 'white',
    backgroundColor: colors.cyan[800],
    borderRadius: '3px',
  },
  nounce: {
    color: colors.teal[50],
  },
  campLabel: {
    color: colors.deepOrange['300'],
    fontSize: '15px',
    border: `1px solid ${colors.deepOrange['200']}`,
    borderRadius: '3px',
    backgroundColor: colors.deepOrange['50'],
  },
  iconContainer: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  iconButton: {
    float: 'right',
  },
  tabContainer: {
    marginLeft: 'auto',
    right: 0,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  tabItem: {
    padding: theme.spacing(0, 2),
    minHeight: '40px',
    minWidth: 'auto',
    '&:hover': {
      backgroundColor: fade(colors.cyan[800], 0.1),
      borderRadius: '40px',
      color: colors.cyan[800],
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  listItem: {
    textTransform: 'uppercase',
    fontSize: '0.8rem',
    minHeight: '4em',
    color: theme.palette.grey['600'],
  },
});

const MenuLink = (props, ref) => (
  <a href={props.url} target={props.target} className={props.className}>
    {props.img && (
      <img
        src={props.img}
        alt={props.name}
        style={{
          height: '20px',
          paddingRight: '5px',
        }}
      />
    ) }
    {props.name}
  </a>
);

class Header extends Component {
  state = {
    menuDrawer: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  mobileMenuOpen = (event) => {
    this.setState({ menuDrawer: true });
  }

  mobileMenuClose = (event) => {
    this.setState({ menuDrawer: false });
  }

  render() {
    const { classes } = this.props;
    return (
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Grid container alignItems="baseline">
            <Grid item xs={12} className={classes.itemsLayout}>
              <Typography
                variant="h6"
                color="inherit"
                noWrap
              >
                <a href="." className={classes.link}>
                  <img className={classes.logoImg} src={logo} alt="logo" />
                  <span
                    className={clsx(classes.appName, classes.pronLabel)}
                  >
                    <span>PRO</span>
                    <span className={classes.nounce}>nunciation</span>
                  </span>
                </a>
              </Typography>
              <div className={classes.org}>
                <Typography
                  variant="h6"
                  noWrap
                  style={{ textTransform: 'uppercase' }}
                >
                  <a href={Menu[0].url} className={classes.link} target="_about">
                    <img className={classes.logoImg} src={Menu[0].img} alt="campfire" />
                    <span className={clsx(classes.appName, classes.campLabel)}>Campfire</span>
                  </a>
                </Typography>
              </div>
              <SearchBar
                placeholder={`Search in ${total} words...`}
                onSearch={this.props.onSearch}
                onReset={this.props.onReset}
              />
              <div className={classes.iconContainer}>
                <IconButton onClick={this.mobileMenuOpen} className={classes.iconButton} color="inherit" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
              </div>
              <div className={classes.tabContainer}>
                <SwipeableDrawer anchor="right" open={this.state.menuDrawer} onClose={this.mobileMenuClose} onOpen={this.mobileMenuOpen}>
                  <List>
                    {Menu.map((item, index) => (
                      <ListItem
                        component={React.forwardRef(MenuLink)}
                        url={item.url}
                        name={item.name}
                        target="_blank"
                        img={item.img}
                        classes={{ root: classes.listItem }}
                        button
                        key={index}
                      />
                    ))}
                  </List>
                </SwipeableDrawer>
                <Tabs
                  value={false}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={this.handleChange}
                  className={classes.itemsLayout}
                >
                  {Menu.map((item, index) => {
                    if (index !== 0) {
                      return (
                        <Tab
                          component={React.forwardRef(MenuLink)}
                          url={item.url}
                          name={item.name}
                          target="_blank"
                          img={item.img}
                          classes={{ root: classes.tabItem }}
                          key={index}
                        />
                      );
                    }
                    return null;
                  })}
                </Tabs>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
