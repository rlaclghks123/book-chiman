import styled from 'styled-components';

function MoviesPage() {
  return (
    <Wrapper>
      <Title>무비페이지</Title>
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

  padding-top: 5rem;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 3rem;
`;
