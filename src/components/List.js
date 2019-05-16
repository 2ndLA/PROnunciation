import React from 'react';
import styled from 'styled-components';
import words from '../data';
import Word from './Word';

const Wrapper = styled.div`
  padding: 4em;
  background: papayawhip;
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
