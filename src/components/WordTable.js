/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import styled from 'styled-components';
import { alpha } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

import Player from './Player';
import PopOver from './PopOver';
import { device } from '../config';

const classNames = require('classname');

const WordTableStyle = styled.div`
  font-size: 14px;
  text-align: left;
  color: #606060;

  .table {
    width: 100%;
    border-spacing: 0px;
    background: white;
    border-collapse: collapse;
  }

  thead .row {
    color: ${colors.blueGrey[400]};
    text-transform: uppercase;
  }

  .row-odd {
    background: ${alpha(colors.blueGrey[900], 0.02)};
  }
  
  .leading-row {
    border-top: 3px solid ${alpha(colors.cyan[900], 0.1)};
    background: ${alpha(colors.blueGrey[900], 0.05)};;
    font-weight: bolder;
    color: ${alpha(colors.blueGrey[800], 0.7)};
  }

  .leading-row:hover {
    cursor: pointer;
  }

  .common-row td {
    padding: 5px 25px;
  }

  .common-row td:first-child {
      padding-left: 30px;
  }

  @media ${device.mobileL} {
    .common-row td {
      padding: 5px 5px;
    }
  }

  @media ${device.tablet} {
    .common-row td {
      padding: 5px 40px;
    }
    .common-row td:first-child {
      padding-left: 40px;
    }
  }

  .center {
    text-align: center;
    vertical-align: middle;
  }

  .cell {
    border: none;
    padding: 12px;
  }

  .cell-optional {
    display: none;
  }

  .cell a {
    color: #6890b5;
  }

  .cell .cell-reference-link {
    opacity: 0.8;
    color: ${alpha(colors.blueGrey[900], 0.7)};;
    margin: 5px 0;
    :hover {
      opacity: 1;
      text-shadow: ${alpha(colors.cyan[700], 0.7)} 0 0 20px;
      text-decoration: underline;
    }
  }

  @media ${device.mobileL} {
    .cell-optional {
      display: table-cell;
    }

    .cell-optional a {
      display: block;
      text-decoration-line: none;
    }

    .leading-row .toggle-icon {
      display: none;
    }
  }

  .sub-header-badge {
    border-radius: 30px;
    background-color: ${alpha(colors.cyan[900], 0.7)};
    display: inline-block;
    line-height: 25px;
    min-width: 26px;
    text-align: center;
    color: white;
    margin-left: 3px;
    padding-top: 1px;
  }

  .sub-header-badge > span {
    padding: 0 8px;
  }
`;

const SubHeaderRow = (props) => {
  const ToggleIcon = props.expand ? <ArrowDropDownIcon /> : <ArrowLeftIcon />;
  return (
    <tr
      className={classNames('row', 'leading-row')}
      onClick={() => props.onHeaderClick(props.letter)}
    >
      <td className="cell">
        <span className={classNames('sub-header-badge')}>
          <span>{props.letter}</span>
        </span>
      </td>
      <td className="cell" />
      <td className="cell" align="right">
        <span className="toggle-icon">{ToggleIcon}</span>
      </td>
      <td className="cell cell-optional" align="right">
        {ToggleIcon}
      </td>
    </tr>
  );
};

const WordRow = (props) => {
  const phonetics = props.symbol.split('|');
  const symbol = phonetics[0];
  const explanation = phonetics[1];
  return (
    <tr className={classNames(
      'row',
      'common-row',
      { 'row-odd': props.index % 2 !== 0 },
    )}
    >
      <td className="cell">
        {props.spell}
      </td>
      <td className="cell">
        {symbol}
        {explanation && <PopOver exp={explanation} />}
      </td>
      <td className="cell" align="center">
        {props.audio ? (<Player {...props} />) : null}
      </td>
      <td className="cell cell-optional">
        <ul style={{ margin: 0 }}>
          {props.references.map((ref, index) => (
            <li key={index}>
              <a
                href={ref.url}
                className="cell-reference-link"
                target="_blank"
                rel="noopener noreferrer"
                key={index}
              >
                {ref.desc}
              </a>
            </li>
          ))}
        </ul>
      </td>
    </tr>
  );
};

const WordTable = (props) => {
  const headers = ['Spelling', 'Symbol', 'Pronunciation', 'References'];

  const renderLetter = (data) => {
    const words = { ...data.words };
    let wordComponents = null;
    if (data.header.expand) {
      wordComponents = Object.entries(words).map(
        ([wordKey, word], index) => (
          <WordRow {...word} key={wordKey} audio={`${wordKey}.mp3`} index={index} />
        ),
      );
    }
    return (
      <React.Fragment key={data.header.letter}>
        <SubHeaderRow
          onHeaderClick={props.onHeaderClick}
          count={Object.keys(data.words).length}
          {...data.header}
        />
        {wordComponents}
      </React.Fragment>
    );
  };

  const theadMarkup = (
    <tr className="row" key="heading">
      {headers.map((cell) => (
        <th
          className={classNames('cell', 'center', { 'cell-optional': cell === 'References' })}
          key={cell}
        >
          {cell}
        </th>
      ))}
    </tr>
  );
  const tbodyMarkup = props.dictionary.map(renderLetter);

  return (
    <WordTableStyle>
      <table className="table">
        <thead>{theadMarkup}</thead>
        <tbody>{tbodyMarkup}</tbody>
      </table>
    </WordTableStyle>
  );
};
export default WordTable;
