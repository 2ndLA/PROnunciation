import React from 'react';
import styled from 'styled-components';
import words from '../data';
import Word from './Word';
import device from '../config';

const Wrapper = styled.div`
  background: papayawhip;
  @media ${device.laptop} {  
    margin: 0 auto;
    max-width: 800px;
  }
  @media ${device.mobileL} {  
    padding: 3em;
  }
`;

const List = () => {
  const wordComponent = words.map(word => <Word {...word} key={word.spell} />);
  return (
    <Wrapper>
      {wordComponent}
    </Wrapper>
  );
};
export default List;
