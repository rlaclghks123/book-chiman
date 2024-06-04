import styled, { keyframes } from 'styled-components';
import { ReactComponent as SpinnerSvg } from '../../assets/svgs/spinner.svg';

function Loading() {
  return (
    <Wrapper>
      <Spinner>
        <SpinnerSvg />
      </Spinner>
    </Wrapper>
  );
}

export default Loading;

const Wrapper = styled.div`
  margin: 0 auto;
  margin-top: 50px;
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
