import clsx from 'clsx';
import React, { Component } from 'react';
import { colors, withStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import HelpIcon from '@material-ui/icons/HelpOutline';

const styles = (theme) => {
  const helpIconHeight = theme.spacing(2.2);
  const arrowHeight = 5;
  const borderColor = fade(colors.blueGrey[200], 0.5);
  const backgroundColor = fade(colors.blueGrey[50], 1);
  return {
    helpIcon: {
      height: helpIconHeight,
      width: helpIconHeight,
      color: fade(colors.cyan[900], 0.7),
      marginBottom: -theme.spacing(0.5),
      '&:hover': {
        cursor: 'pointer',
        color: fade(colors.cyan[900], 0.5),
      },
    },
    popContainer: {
      position: 'absolute',
      margin: '0 5px',
    },
    popper: {
      position: 'absolute',
      transform: `translate(calc(-50% + ${helpIconHeight / 2}px), 
        calc(-100% - ${helpIconHeight}px - ${arrowHeight}px))`,
      backgroundColor,
      color: fade(colors.cyan[900], 1),
      padding: theme.spacing(1, 2),
      fontSize: theme.spacing(1.4),
      whiteSpace: 'nowrap',
      border: `solid 1px ${borderColor}`,
      borderRadius: '5px',
      boxShadow: `0 3px 5px ${theme.palette.grey['300']};`,
    },
    arrow: {
      position: 'absolute',
      display: 'block',
      left: `calc(50% - ${arrowHeight}px)`,
      bottom: -theme.spacing(1) - arrowHeight - 1,
    },
    arrowI: {
      display: 'inline-block',
      width: 0,
      height: 0,
      borderColor,
    },
    arrowEm: {
      margin: `-1px 0 0 -${arrowHeight * 2}px`,
      borderColor: backgroundColor,
      display: 'inline-block',
      width: 0,
      height: 0,
    },
    arrowComm: {
      borderWidth: `${arrowHeight}px`,
      borderStyle: 'solid',
      overflow: 'hidden',
      fontSize: 0,
      lineHeight: 0,
      verticalAlign: 'top',
      borderBottomColor: 'transparent',
      borderRightColor: 'transparent',
      borderLeftColor: 'transparent',
    },
  };
};

class SearchBar extends Component {
  constructor() {
    super();
    this.state = { show: false };
  }

  handleClick = () => {
    this.setState((preState) => ({ show: !preState.show }));
  };

  render() {
    const { classes } = this.props;
    return (
      <span className={classes.popContainer}>
        <HelpIcon className={classes.helpIcon} onClick={this.handleClick} />
        {this.state.show && (
          <div className={classes.popper}>
            {this.props.exp}
            <span className={classes.arrow}>
              <i className={clsx(classes.arrowI, classes.arrowComm)} />
              <em className={clsx(classes.arrowEm, classes.arrowComm)} />
            </span>
          </div>
        )}
      </span>
    );
  }
}

export default withStyles(styles)(SearchBar);
