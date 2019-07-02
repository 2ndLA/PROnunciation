import React, { Component } from 'react';
import {
  InputBase,
  withStyles,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Cancel from '@material-ui/icons/Cancel';
import { fade } from '@material-ui/core/styles';

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.05),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.1),
    },
    width: '100%',
    marginLeft: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0, 2),
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetIcon: {
    width: theme.spacing(4),
    padding: theme.spacing(0, 0.5),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    top: 0,
    opacity: 0.2,
    '&:hover': {
      opacity: 0.4,
      cursor: 'pointer',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 6),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 180,
      '&:focus': {
        width: 240,
      },
    },
  },
});


class SearchBar extends Component {
  state = { searchText: '' };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder={this.props.placeholder}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onChange={(event) => {
            this.setState({ searchText: event.target.value });
            this.props.onSearch(event);
          }}
          value={this.state.searchText}
        />
        {this.state.searchText && (
          <span
            onMouseDown={() => {
              this.props.onReset(); this.setState({ searchText: '' });
            }}
            className={classes.resetIcon}
          >
            <Cancel />
          </span>
        )}
      </div>

    );
  }
}

export default withStyles(styles)(SearchBar);
