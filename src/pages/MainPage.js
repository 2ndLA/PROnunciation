import React from 'react';
import styled from 'styled-components';
import { device, size } from '../config';
import { WordTable } from '../components';

const Wrapper = styled.div`
  font-family: "Lato", Helvetica, sans-serif;
  text-align: left;
  .search-input-reset {
    opacity: 0.6;
    :hover{
      cursor: pointer;
    }
  }
  padding: 1em 2em;
  margin: 48px 0;
  @media ${device.mobileL} {  
    margin-left: auto;
    margin-right: auto;
    margin-top: 64px;
    max-width: ${size.tablet};
  }
`;

const MainPage = props => (
  <Wrapper>
    <div className="search" />
    <div className="word-table">
      <WordTable dictionary={props.dictionary} />
    </div>
  </Wrapper>
);

export default MainPage;
