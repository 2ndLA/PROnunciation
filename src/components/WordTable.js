import React from 'react';
import styled from 'styled-components';
import device from '../config';

const classNames = require('classname');

const WordTableStyle = styled.div`
  font-size: 1em;
  text-align: left;
  color: #808080;
  .table {
    width: 100%;
    border-spacing: 0px;
    background: #ffffff;
    border-collapse: collapse;
  }
  .row {
    border-bottom: 2px solid #F5F5F5;
  }
  .row-even {
    background: #f4eded;
  }
  .cell {
    border: none;
    padding: 12px;
    text-align: left;
    min-width: 80px;
  }
  .cell-optional{
      display: none;
  } 
  @media ${device.tablet} {  
    .cell-optional{
      display: inline-block;
    } 
  }
`;

const WordRow = props => (
  <tr className={classNames('row', { 'row-even': props.index % 2 === 0 })}>
    <td className="cell">
      {props.spell}
    </td>
    <td className="cell">
      {props.symbol}
    </td>
    <td className="cell">
      {props.sound}
    </td>
    <td className="cell cell-optional">
      {props.reference}
    </td>
  </tr>
);

const WordTable = (props) => {
  const headings = ['Spell', 'Pronunciation', 'Audio', 'Reference'];
  const renderRow = (row, index) => <WordRow {...row} key={row.spell} index={index} />;

  const theadMarkup = (
    <tr className="row" key="heading">
      {headings.map(cell => (
        <th
          className={classNames('cell', { 'cell-optional': cell === 'Reference' })}
          key={cell}
        >
          {cell}
        </th>
      ))}
    </tr>
  );
  const tbodyMarkup = props.words.map(renderRow);

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
