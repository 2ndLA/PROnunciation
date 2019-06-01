import React from 'react';
import styled from 'styled-components';
import device from '../config';

const classNames = require('classname');

const WordTableStyle = styled.div`
  font-size: 1em;
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
  .cell {
    border: none;
    padding: 12px;
    text-align: left;
    min-width: 80px;
  }
  @media ${device.tablet} {  
    .cell-optional{
      display: inline-block;
    } 
  }
`;

const WordRow = props => (
  <tr className={classNames('row',
    { 'leading-row': props.index === 0 },
    { 'row-odd': props.index % 2 !== 0 })}
  >
    <td className="cell">
      {props.spell}
    </td>
    <td className="cell">
      {props.symbol}
    </td>
    <td className="cell">
      {props.audio === '' ? null
        : (
          <audio controls>
            <source src={require(`../audio/${props.audio}`)} type="audio/mpeg" />
          您的浏览器不支持 audio 元素。
          </audio>
        )
      }
    </td>
    <td className="cell">
      {props.reference}
    </td>
  </tr>
);

const WordTable = (props) => {
  const headings = ['Spelling', 'Phonetic Symbol', 'Pronunciation', 'Reference'];
  const renderTable = (table) => {
    if (+table === 0) { return []; }
    const leadingRow = [{
      spell: table[0].spell[0].toUpperCase(),
      audio: '',
      symbol: '',
      reference: '',
    }];
    const titledTable = leadingRow.concat(table);
    return titledTable.map((row, index) => (<WordRow {...row} key={row.spell} index={index} />));
  };

  const theadMarkup = (
    <tr className="row" key="heading">
      {headings.map(cell => (
        <th
          className={classNames('cell')}
          key={cell}
        >
          {cell}
        </th>
      ))}
    </tr>
  );
  const tbodyMarkup = props.words.map(renderTable);

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
