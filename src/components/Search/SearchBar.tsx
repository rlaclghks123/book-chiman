import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { searchKeywordState } from '../../atoms/searchAtom';
import { ReactComponent as RefreshSvg } from '../../assets/svgs/refresh.svg';
import media from '../../styles/media';

function SearchBar() {
  const [curKeyword, setCurKeyword] = useState('');
  const setKeyword = useSetRecoilState(searchKeywordState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword(curKeyword);
  };

  const handleRefresh = () => {
    setKeyword('');
    setCurKeyword('');
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <SearchBarInput
          placeholder="영화 제목을 입력해주세요"
          onChange={(e) => setCurKeyword(e.target.value)}
          value={curKeyword}
        />
      </Form>

      <Button onClick={handleRefresh}>
        <RefreshSvg />
      </Button>
    </Wrapper>
  );
}

export default SearchBar;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  width: 50%;
  height: 100%;
`;

const Form = styled.form`
  width: 100%;
  height: 80%;

  display: flex;
  justify-content: center;
`;

const SearchBarInput = styled.input`
  width: 100%;
  height: 70%;
  border-radius: 10px;
  padding: 5px;
  border: none;

  &::placeholder {
    padding: 0px 5px;

    ${media.mobile`
    font-size:10px;
  `}
  }

  ${media.tablet`
    width:85%;
  `}

  ${media.mobile`
    width:70%;
  `}
`;

const Button = styled.button`
  position: absolute;
  right: 1.5rem;
  top: 15px;

  padding: 0px;
  border: none;
  width: 20px;
  height: 20px;

  background-color: inherit;

  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }

  svg {
    width: 100%;
    height: 100%;
    fill: black;
  }

  ${media.tablet`
    right:8%;
  `}

  ${media.mobile`
    top: 10px;
    right:-4%;
    width: 50%;
    height: 50%;
  `}
`;
