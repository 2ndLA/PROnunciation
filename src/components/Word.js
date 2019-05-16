import React from 'react';
import styled from 'styled-components';
import device from '../config';

const WordStyle = styled.div`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
  padding: 8px 24px;

  .word-row {
    display: flex;
    justify-content: space-between;
  }
  .word-cell{
    min-width: 48px;
  }
  .word-reference{
      display: none;
  } 
  @media ${device.tablet} {  
    .word-reference{
      display: inline-block;
    } 
  }
`;

const Word = props => (
  <WordStyle>
    <div className="word-row">
      <span className="word-cell">
        {props.spell}
      </span>
      <span className="word-cell">
        {props.sound}
      </span>
      <span className="word-cell">
        {props.symbol}
      </span>
      <span className="word-cell word-reference">
        {props.reference}
      </span>
    </div>
  </WordStyle>
);
export default Word;
