/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import styled from 'styled-components';

import Player from './Player';
import device from '../config';

const classNames = require('classname');

const WordTableStyle = styled.div`
  font-size: 14px;
  text-align: left;
  color: #606060;

  .table {
    width: 100%;
    border-spacing: 0px;
    background: #ffffff;
    border-collapse: collapse;
  }

  .row {
    border-bottom: 2px solid #f5f5f5;
  }

  .row-odd {
    background: #f6f8fa;
  }
  
  .leading-row {
    border-top: 3px solid #cbd8e4;
    background: #eef3fb;
    font-weight: bolder;
    color: #6890b5;
  }

  .common-row td {
    padding: 15px 25px;
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

  @media ${device.tablet} {
    .cell-optional{
      display: table-cell;
    }

    .cell-optional a{
      display: block;
      text-decoration-line: none;
    }
  }
`;

const WordRow = props => (
  <tr className={classNames('row',
    { 'leading-row': props.index === 0 },
    { 'common-row': props.index !== 0 },
    { 'row-odd': props.index % 2 !== 0 })}
  >
    <td className="cell">
      {props.spell}
    </td>
    <td className="cell">
      {props.symbol}
    </td>
    <td className="cell" align="center">
      {props.audio === '' ? null : (<Player {...props} />)}
    </td>
    <td className="cell cell-optional">
      {props.references.map((ref, index) => (
        <a
          href={ref.url}
          target="_blank"
          rel="noopener noreferrer"
          key={index}
        >
          {ref.desc}
        </a>
      ))}
    </td>
  </tr>
);

const WordTable = (props) => {
  const headers = ['Spelling', 'Phonetic Symbol', 'Pronunciation', 'Reference'];

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
          className={classNames('cell', 'center', { 'cell-optional': cell === 'Reference' })}
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
