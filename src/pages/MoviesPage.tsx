import styled from 'styled-components';

import SearchContainer from '../components/Search/SearchContainer';

function MoviesPage() {
  return (
    <Wrapper>
      <SearchContainer />
    </Wrapper>
  );
}

export default MoviesPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: black;
  padding: 2rem 10rem 0 10rem;
  box-sizing: border-box;
`;
