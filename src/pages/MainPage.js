import React from 'react';
import styled from 'styled-components';
import { device, size } from '../config';
import { WordTable } from '../components';

const Wrapper = styled.div`
  font-family: "Lato", Helvetica, sans-serif;
  text-align: left;
  padding: 1em 0;
  /* padding: 1em 2em; */
  margin: 48px 0;
  @media ${device.mobileM} {
    padding: 1em 2em;
  }
  @media ${device.mobileL} {  
    margin-left: auto;
    margin-right: auto;
    margin-top: 64px;
    max-width: ${size.tablet};
    padding: 1em 2em;
  }
`;

const MainPage = props => (
  <Wrapper>
    <div className="word-table">
      <WordTable dictionary={props.dictionary} />
    </div>
  </Wrapper>
);

export default MainPage;
