import styled from 'styled-components';

function ErrorPage() {
  return (
    <Wrapper>
      <Title>잘못된 접근입니다. 홈페이지로 이동해주세요</Title>
    </Wrapper>
  );
}

export default ErrorPage;

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
  color: white;
`;
