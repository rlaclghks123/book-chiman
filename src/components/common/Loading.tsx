import styled, { keyframes } from 'styled-components';
import { ReactComponent as SpinnerSvg } from '../../assets/svgs/spinner.svg';

function Loading() {
  return (
    <Wrapper>
      <div>최대 10초정도 걸릴 수 있습니다</div>
      <Spinner>
        <SpinnerSvg />
      </Spinner>
    </Wrapper>
  );
}

export default Loading;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 0 auto;
  margin-top: 50px;
  gap: 20px;
`;

const spinEffect = keyframes`
  from {transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  animation: ${spinEffect} 1.5s linear infinite;

  svg {
    fill: white;
    width: 30px;
    height: 30px;
  }
`;
