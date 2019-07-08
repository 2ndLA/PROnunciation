/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import styled from 'styled-components';
import { fade } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';

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
    background: ${fade(colors.blueGrey[900], 0.02)};
  }
  
  .leading-row {
    border-top: 3px solid ${fade(colors.cyan[900], 0.1)};
    background: ${fade(colors.blueGrey[900], 0.05)};;
    font-weight: bolder;
    color: ${fade(colors.blueGrey[800], 0.7)};
  }

  .common-row td {
    padding: 5px 25px;
  }

  .common-row td:first-child {
      padding-left: 30px;
  }

  @media ${device.mobileM} {
    .common-row td {
      /* padding: 5px 5px; */
    }
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

  .cell-optional{
    display: none;
  }

  .cell a {
    color: #6890b5;
  }
  .cell .cell-reference-link {
    opacity: 0.8;
    color: ${fade(colors.blueGrey[900], 0.7)};;
    margin: 5px 0;
    :hover {
      opacity: 1;
      text-shadow: ${fade(colors.cyan[700], 0.7)} 0 0 20px;
      text-decoration: underline;
    }
  }

  @media ${device.mobileL} {
    .cell-optional{
      display: table-cell;
    }

    .cell-optional a{
      display: block;
      text-decoration-line: none;
    }
  }
`;


const WordRow = (props) => {
  const phonetics = props.symbol.split('|');
  const symbol = phonetics[0];
  const explanation = phonetics[1];
  return (
    <tr className={classNames('row',
      { 'leading-row': props.index === 0 },
      { 'common-row': props.index !== 0 },
      { 'row-odd': props.index % 2 !== 0 })}
    >
      <td className="cell">
        {props.spell}
      </td>
      <td className="cell">
        {symbol}
        {explanation && <PopOver exp={explanation} />}
      </td>
      <td className="cell" align="center">
        {props.audio === '' ? null : (<Player {...props} />)}
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

  const renderTable = (data) => {
    const dataAttrs = Object.keys(data);
    if (dataAttrs.length === 0) { return []; }
    // Create a leading row that only contains a upper case letter
    const table = { ...data };
    const letter = dataAttrs[0][0].toUpperCase();
    table[letter] = {
      spell: letter,
      audio: '',
      symbol: '',
      references: [],
    };
    return Object.values(table).sort(
      (a, b) => (a.spell.toLowerCase() < b.spell.toLowerCase() ? -1 : 1),
    ).map(
      (row, index) => (<WordRow {...row} key={row.spell} index={index} />),
    );
  };

  const theadMarkup = (
    <tr className="row" key="heading">
      {headers.map(cell => (
        <th
          className={classNames('cell', 'center', { 'cell-optional': cell === 'References' })}
          key={cell}
        >
          {cell}
        </th>
      ))}
    </tr>
  );
  const tbodyMarkup = props.dictionary.map(renderTable);

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
