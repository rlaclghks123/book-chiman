import styled from 'styled-components';

function HomePage() {
  return (
    <Wrapper>
      <Title>안녕하세요. 프론트엔드 지원자 김치환입니다.</Title>
    </Wrapper>
  );
}

export default HomePage;

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
